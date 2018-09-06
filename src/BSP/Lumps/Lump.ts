import { LumpHeader } from "./LumpHeader";
import { LumpType } from "./LumpType";
import { BinaryReader, INT_32_SIZE } from "../Utils/BinaryReader";

// little-endian "LZMA"
const LZMA_ID = 1095588428;

export abstract class Lump {
	public lumpType: LumpType;
	public header: LumpHeader;
	public data: ArrayBuffer;
	public initialized = false;

	public lumpDependencies: LumpType[] = [];

	constructor(lType: LumpType, headerLump: LumpHeader, fileData: ArrayBuffer) {
		this.lumpType = lType;
		this.header = headerLump;
		this.data = fileData.slice(this.header.fileOffset, this.header.fileOffset + this.header.lumpLength);

		let potentiallyCompressed = false;
		// tslint:disable-next-line:prefer-for-of
		for (let i = 0; i < this.header.fourCC.length; i++) {
			const num = this.header.fourCC[i];
			if (num !== 0) {
				potentiallyCompressed = true;
				break;
			}
		}

		if (potentiallyCompressed) {
			this.decompressLump();
		}
	}

	public read() {
		
	}

	private decompressLump() {
		const reader = new BinaryReader(this.data);

		const ident = reader.readInt32();

		// all lzma compressed lumps start with LZMA
		if (ident !== LZMA_ID) {
			return;
		}

		const actualSize = reader.readInt32();
		const lzmaSize = reader.readInt32();
		const properties: number[] = [];
		for (let i = 0; i < 5; i++) {
			properties.push(reader.readUInt8());
		}

		throw Error("Decompressing lumps is not implemented.");
	}

	public toString(): string {
		return `${LumpType[this.lumpType]}
		${this.header} 
		Lump:
			Data: ${this.data}
			Initialized: ${this.initialized}`;
	}
}