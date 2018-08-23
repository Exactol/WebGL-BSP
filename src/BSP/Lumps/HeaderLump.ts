import { LumpType } from "./LumpType";
import { BinaryReader } from "../Utils/BinaryReader";

export class HeaderLump {
	public fileOffset: number; // offset into file (bytes)
	public lumpLength: number; // length of lump (bytes)
	public version: number; // lump format version
	public fourCC: Uint8Array; // lump ident code

	constructor(lType: LumpType, lumpData: Uint8Array) {
		// create a new reader at the offset of the lump location
		const reader = new BinaryReader(lumpData.buffer, lumpData.byteOffset);

		this.fileOffset = reader.readInt32();
		this.lumpLength = reader.readInt32();
		this.version = reader.readInt32();

		// get 4 byte ident code
		this.fourCC = lumpData.slice(lumpData.length - 4, lumpData.length);
	}

	public toString() {
		return `Offset: ${this.fileOffset}
			Length: ${this.lumpLength} 
			Version: ${this.version}
			FourCC: ${this.fourCC}`;
	}
}