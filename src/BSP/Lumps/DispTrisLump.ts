import { Lump } from "./Lump";
import { HeaderLump } from "./HeaderLump";
import { BinaryReader, FLOAT_SIZE, UINT_16_SIZE } from "../Utils/BinaryReader";
import { LumpType } from "./LumpType";
import { DispVert } from "../Structs/DispVert";
import { vec3 } from "gl-matrix";
import { DispTags } from "../Structs/Enums";

export class DispTrisLump extends Lump {
	public dispTris: DispTags[] = [];

	constructor(header: HeaderLump, lumpData) {
		super(LumpType.DispTris, header, lumpData);
	}

	public read() {
		const reader = new BinaryReader(this.data);

		for (let i = 0; i < this.header.lumpLength; i += UINT_16_SIZE) {
			this.dispTris.push(reader.readUInt16());
		}

		this.initialized = true;
	}

	public toString(): string {
		let retStr = super.toString();

		retStr += `\n${LumpType[this.lumpType]}: [${this.dispTris.join(", ")}]`;

		return retStr;
	}
}