import { Lump } from "./Lump";
import { Plane } from "../Structs/Plane";
import { LumpHeader } from "./LumpHeader";
import { LumpType } from "./LumpType";
import { BinaryReader, FLOAT_SIZE, INT_32_SIZE } from "../Utils/BinaryReader";
import { vec3 } from "gl-matrix";

export class SurfEdgeLump extends Lump {
	public surfEdges: number[] = [];

	constructor(header: LumpHeader, lumpData) {
		super(LumpType.SurfEdges, header, lumpData);
	}

	public read() {
		const reader = new BinaryReader(this.data);

		// each surfedge is 4 bytes long
		for (let i = 0; i < this.header.lumpLength; i += INT_32_SIZE) {
			this.surfEdges.push(reader.readInt32());
		}

		this.initialized = true;
	}

	public toString(): string {
		let retStr = super.toString();
		retStr += `\n${LumpType[this.lumpType]}: [${this.surfEdges.join(", ")}]`;

		return retStr;
	}
}