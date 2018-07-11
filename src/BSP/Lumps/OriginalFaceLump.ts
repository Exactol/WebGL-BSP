import { Lump } from "./Lump";
import { Plane } from "../Structs/Plane";
import { HeaderLump } from "./HeaderLump";
import { LumpType } from "./LumpType";
import { BinaryReader, FLOAT_SIZE, INT_32_SIZE } from "../Utils/BinaryReader";
import { vec3 } from "gl-matrix";
import { Face } from "../Structs/Face";

export class OriginalFaceLump extends Lump {
	// identical to the face lump, so the Face class can be reused
	public faces: Face[] = [];

	constructor(header: HeaderLump, lumpData) {
		super(LumpType.OriginalFaces, header, lumpData);
	}

	public read() {
		const reader = new BinaryReader(this.data);

		// each face is 56 bytes long
		for (let i = 0; i < this.header.lumpLength; i += 56) {
			this.faces.push(new Face(
				reader.readInt16(),
				reader.readInt8(),
				reader.readInt8(),
				reader.readInt32(),
				reader.readInt16(),
				reader.readInt16(),
				reader.readInt16(),
				reader.readInt16(),
				reader.readBytes(4),
				reader.readInt32(),
				reader.readFloat(),
				[reader.readInt32(), reader.readInt32()],
				[reader.readInt32(), reader.readInt32()],
				reader.readInt32(),
				reader.readUInt16(),
				reader.readUInt16(),
				reader.readUInt32(),
			));
		}

		this.initialized = true;
	}

	public toString(): string {
		let retStr = super.toString();
		retStr += `\n${LumpType[this.lumpType]}: \n${this.faces.join("\n")}`;

		return retStr;
	}
}