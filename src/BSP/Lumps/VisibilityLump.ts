import { Lump } from "./Lump";
import { LumpHeader } from "./LumpHeader";
import { Edge } from "../Structs/Edge";
import { BinaryReader, FLOAT_SIZE } from "../Utils/BinaryReader";
import { LumpType } from "./LumpType";
import { vec3 } from "gl-matrix";

export class VisibilityLump extends Lump {
	public numClusters!: number;
	public byteOffsets!: number[][];

	constructor(header: LumpHeader, lumpData) {
		super(LumpType.Visibility, header, lumpData);
	}

	public read() {
		// TODO: will need to do something about this
		if (this.header.lumpLength === 0) {
			console.log("Visibility lump empty");
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