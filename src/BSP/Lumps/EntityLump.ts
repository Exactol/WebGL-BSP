import { Lump } from "./Lump";
import { Plane } from "../Structs/Plane";
import { LumpHeader } from "./LumpHeader";
import { LumpType } from "./LumpType";
import { BinaryReader, FLOAT_SIZE, INT_32_SIZE } from "../Utils/BinaryReader";
import { vec3 } from "gl-matrix";
import { Face } from "../Structs/Face";

export class EntityLump extends Lump {
	public textBuffer: string = "";

	constructor(header: LumpHeader, lumpData) {
		super(LumpType.Entities, header, lumpData);
	}

	public read() {
		const reader = new BinaryReader(this.data);

		let tmpStr = reader.readString(false);

		while (tmpStr != null) {
			this.textBuffer += tmpStr;
			tmpStr = reader.readString(false);
		}

		this.initialized = true;
	}

	public toString(): string {
		let retStr = super.toString();
		retStr += `\nTextBuffer: \n${this.textBuffer}`;

		return retStr;
	}
}