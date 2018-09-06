import { Lump } from "./Lump";
import { LumpHeader } from "./LumpHeader";
import { LumpType } from "./LumpType";
import { BinaryReader} from "../Utils/BinaryReader";
import { Face } from "../Structs/Face";

export class FaceLump extends Lump {
	public faces: Face[] = [];

	constructor(header: LumpHeader, lumpData) {
		super(LumpType.Faces, header, lumpData);
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