import { Lump } from "./Lump";
import { Plane } from "../Structs/Plane";
import { LumpHeader } from "./LumpHeader";
import { LumpType } from "./LumpType";
import { BinaryReader, FLOAT_SIZE, INT_32_SIZE } from "../Utils/BinaryReader";
import { vec3 } from "gl-matrix";
import { Face } from "../Structs/Face";
import { Brush } from "../Structs/Brush";

export class BrushLump extends Lump {
	public brushes: Brush[] = [];

	constructor(header: LumpHeader, lumpData) {
		super(LumpType.Brushes, header, lumpData);
	}

	public read() {
		const reader = new BinaryReader(this.data);

		// each face is 12 bytes long
		for (let i = 0; i < this.header.lumpLength; i += INT_32_SIZE * 3) {
			this.brushes.push(new Brush(
				reader.readInt32(),
				reader.readInt32(),
				reader.readInt32()
			));
		}

		this.initialized = true;
	}

	public toString(): string {
		let retStr = super.toString();
		retStr += `\n${LumpType[this.lumpType]}: \n${this.brushes.join("\n")}`;

		return retStr;
	}
}