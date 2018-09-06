import { Lump } from "./Lump";
import { Plane } from "../Structs/Plane";
import { LumpHeader } from "./LumpHeader";
import { LumpType } from "./LumpType";
import { BinaryReader, FLOAT_SIZE, INT_32_SIZE, INT_16_SIZE, UINT_16_SIZE } from "../Utils/BinaryReader";
import { vec3 } from "gl-matrix";
import { Face } from "../Structs/Face";
import { Brush } from "../Structs/Brush";
import { BrushSide } from "../Structs/BrushSide";

export class BrushSideLump extends Lump {
	public brushes: BrushSide[] = [];

	constructor(header: LumpHeader, lumpData) {
		super(LumpType.BrushSides, header, lumpData);
	}

	public read() {
		const reader = new BinaryReader(this.data);

		// each face is 12 bytes long
		for (let i = 0; i < this.header.lumpLength; i += INT_16_SIZE * 3 + UINT_16_SIZE) {
			this.brushes.push(new BrushSide(
				reader.readUInt16(),
				reader.readInt16(),
				reader.readInt16(),
				reader.readInt16()
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