import { Lump } from "./Lump";
import { HeaderLump } from "./HeaderLump";
import { BinaryReader, FLOAT_SIZE, UINT_16_SIZE } from "../Utils/BinaryReader";
import { LumpType } from "./LumpType";
import { DispVert } from "../Structs/DispVert";
import { vec3 } from "gl-matrix";

export class DispVertLump extends Lump {
	public dispVerts: DispVert[] = [];

	constructor(header: HeaderLump, lumpData) {
		super(LumpType.DispVerts, header, lumpData);
	}

	public read() {
		const reader = new BinaryReader(this.data);

		for (let i = 0; i < this.header.lumpLength; i += FLOAT_SIZE * 5) {
			this.dispVerts.push(new DispVert(
				vec3.fromValues(reader.readFloat(), reader.readFloat(), reader.readFloat()),
				reader.readFloat(),
				reader.readFloat()
			));
		}

		this.initialized = true;
	}

	public toString(): string {
		let retStr = super.toString();

		retStr += `\n${LumpType[this.lumpType]}: ${this.dispVerts.join("\n")}`;

		return retStr;
	}
}