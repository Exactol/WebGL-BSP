import { Lump } from "./Lump";
import { HeaderLump } from "./HeaderLump";
import { LumpType } from "./LumpType";
import { BinaryReader, SeekOrigin } from "../Utils/BinaryReader";
import { DispInfo } from "../Structs/DispInfo";
import { vec3 } from "gl-matrix";
import { DispNeighbor } from "../Structs/DispNeighbor";
import { DispSubNeighbor } from "../Structs/DispSubNeighbor";
import { DispCornerNeighbors } from "../Structs/DispCornerNeighbor";

export class DispInfoLump extends Lump {
	public dispInfos: DispInfo[] = [];

	constructor(header: HeaderLump, lumpData) {
		super(LumpType.DispInfo, header, lumpData);
	}

	public read() {
		const reader = new BinaryReader(this.data);
		const DISPINFO_SIZE = 176;

		// each dispInfo is 176 bytes long
		for (let i = 0; i < this.header.lumpLength; i += DISPINFO_SIZE) {
			const startPos = vec3.fromValues(reader.readFloat(), reader.readFloat(), reader.readFloat());
			const dispVertStart = reader.readInt32();
			const dispTriStart = reader.readInt32();
			const power = reader.readInt32();
			const minTess = reader.readInt32();
			const smoothingAngle = reader.readFloat();
			const contents = reader.readInt32();
			const mapFace = reader.readUInt16();
			const lightmapAlphaStart = reader.readInt32();
			const lightmapSamplePositionStart = reader.readInt32();
			
			const edgeNeighbors: DispNeighbor[] = [];
			for (let j = 0; j < 4; j++) {
				const subNeighbors: DispSubNeighbor[] = [];

				for (let l = 0; l < 2; l++) {
					const iNeighbor = reader.readUInt16();
					const neighborOrientation = reader.readUInt8();
					const span = reader.readUInt8();
					reader.seek(1, SeekOrigin.Current);

					const neighborSpan = reader.readUInt8();
					subNeighbors.push(new DispSubNeighbor(
						iNeighbor,
						neighborOrientation,
						span,
						neighborSpan
					));		
				}
				edgeNeighbors.push(new DispNeighbor(subNeighbors));
			}

			const cornerNeighbors: DispCornerNeighbors[] = [];
			for (let k = 0; k < 4; k++) {
				cornerNeighbors.push(new DispCornerNeighbors(
					[reader.readUInt16(), reader.readUInt16(), reader.readUInt16(), reader.readUInt16()],
					reader.readUInt8()
				));
			}

			reader.seek(6, SeekOrigin.Current);
			const allowedVerts: number[] = [];
			for (let z = 0; z < 10; z++) {
				allowedVerts.push(reader.readUInt32());
			}

			this.dispInfos.push(new DispInfo(
				startPos,
				dispVertStart,
				dispTriStart,
				power,
				minTess,
				smoothingAngle,
				contents,
				mapFace,
				lightmapAlphaStart,
				lightmapSamplePositionStart,
				edgeNeighbors,
				cornerNeighbors,
				allowedVerts
			));
		}
		this.initialized = true;
	}

	public toString(): string {
		let retStr = super.toString();
		retStr += `\n${LumpType[this.lumpType]}: \n${this.dispInfos.join("\n")}`;

		return retStr;
	}
}