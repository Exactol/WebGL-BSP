import { Lump } from "./Lump";
import { HeaderLump } from "./HeaderLump";
import { Edge } from "../Structs/Edge";
import { BinaryReader, FLOAT_SIZE } from "../Utils/BinaryReader";
import { LumpType } from "./LumpType";
import { vec3 } from "gl-matrix";

export class VertexLump extends Lump {
	public vertexes!: vec3[];

	constructor(header: HeaderLump, lumpData) {
		super(LumpType.Vertexes, header, lumpData);
	}

	public read() {
		const reader = new BinaryReader(this.data);
		this.vertexes = [];

		// each vertex is 3 floats, 12 bytes total
		for (let i = 0; i < this.header.lumpLength; i += FLOAT_SIZE * 3) {
			this.vertexes.push(vec3.fromValues(reader.readFloat(), reader.readFloat(), reader.readFloat()));
		}
		
		this.initialized = true;
	}

	public toString(): string {
		let retStr = super.toString();

		if (this.initialized) {
			retStr += `\nVertexes: [(${this.vertexes.join("), (")}]`;
		} else {
			retStr += "\Vertexes: []";
		}

		return retStr;
	}
}