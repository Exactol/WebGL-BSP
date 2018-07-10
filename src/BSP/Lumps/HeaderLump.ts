import { LumpEnum } from "../LumpEnums";
import { BinaryReader } from "../../Utils/BinaryReader";

export class HeaderLump {
	public lumpType: LumpEnum;

	public fileOffset: number; // offset into file (bytes)
	public lumpLength: number; // length of lump (bytes)
	public version: number; // lump format version
	public fourCC: Int8Array; // lump ident code

	constructor(lType: LumpEnum, data: Int8Array) {
		this.lumpType = lType;

		// create a new reader at the offset of the lump location
		const reader = new BinaryReader(data.buffer, data.byteOffset);

		this.fileOffset = reader.readInt32();
		this.lumpLength = reader.readInt32();
		this.version = reader.readInt32();

		// get 4 byte ident code
		this.fourCC = data.slice(data.length - 4, data.length);
	}

	public toString() {
		console.log("Lump: " + LumpEnum[this.lumpType]);
		console.log("	Offset: " + this.fileOffset);
		console.log("	Lump Length: " + this.lumpLength);
		console.log("	Version: " + this.version);
		console.log("	FourCC: " + this.fourCC);
	}
}