import { Lump } from "./Lump";
import { LumpHeader } from "./LumpHeader";
import { Edge } from "../Structs/Edge";
import { BinaryReader, FLOAT_SIZE } from "../Utils/BinaryReader";
import { LumpType } from "./LumpType";
import { vec3 } from "gl-matrix";
import { addRange } from "../../Utils/AddRange";

export class VisibilityLump extends Lump {
	public numClusters!: number;
	public byteOffsets!: number[][];

	constructor(header: LumpHeader, lumpData: ArrayBuffer) {
		super(LumpType.Visibility, header, lumpData);
	}

	public read() {
		// TODO: will need to do something about this
		if (this.header.lumpLength === 0) {
			console.log("Visibility lump empty");
			this.initialized = true;
			return;
		}

		const reader = new BinaryReader(this.data);


		this.numClusters = reader.readInt32();
		this.byteOffsets = new Array(this.numClusters);

		for (let i = 0; i < this.numClusters; i++) {
			this.byteOffsets[i] = [];
			this.byteOffsets[i].push(reader.readInt32()); // pvs offset
			this.byteOffsets[i].push(reader.readInt32()); // pas offset
		}

		this.initialized = true;
	}

	public decompressPVS(cluster: number | null): number[] {
		// http://www.flipcode.com/archives/Quake_2_BSP_File_Format.shtml

		// if not in cluster, render all clusters
		if (!cluster || cluster === -1) {
			return Array<number>(this.numClusters).fill(1);
		}

		if (this.header.lumpLength === 0) {
			return [];
		}

		// 1st element is pvs offset from start of lump, second is pas offset from start of lump
		const offset = this.byteOffsets[cluster][0];
		const reader = new BinaryReader(this.data, offset);

		// initialize pvs with empty data
		const pvs: number[] = Array<number>(this.numClusters).fill(0);

		// https://developer.valvesoftware.com/wiki/Source_BSP_File_Format#Visibility
		for (let i = 0; i < this.numClusters;) {
			const byte = reader.readInt8();

			// if value is 0, set next 8 clusters * next bit clusters to not visible (0)
			if (byte === 0) {
				const nextBit = reader.readInt8();
				i += 8 * nextBit;
			} else {
				for (let bit = 1; bit <= 8; bit *= 2) {
					if (byte & bit) {
						pvs[i] = 1;
					}
					i++;
				}
			}
		}

		return pvs;
	}

	public toString(): string {
		if (!this.initialized) {
			return `\n${LumpType[this.lumpType]}: UNINITIALIZED`;
		}
		let retStr = super.toString();

		retStr += `\n${LumpType[this.lumpType]}:
		Num Clusters: ${this.numClusters}
		byteOffsets: [${this.byteOffsets.join(", ")}]`;

		return retStr;
	}
}