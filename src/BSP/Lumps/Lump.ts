import { HeaderLump } from "./HeaderLump";
import { LumpType } from "./LumpType";

export abstract class Lump {
	public lumpType: LumpType;
	public header: HeaderLump;
	public data: ArrayBuffer;
	public initialized = false;

	public lumpDependencies: LumpType[] = [];

	constructor(lType: LumpType, headerLump: HeaderLump, fileData: ArrayBuffer) {
		this.lumpType = lType;
		this.header = headerLump;
		this.data = fileData.slice(this.header.fileOffset, this.header.fileOffset + this.header.lumpLength);

		// if (this.header.fileOffset + this.header.lumpLength > fileData.byteLength) {
		// 	console.log("lump too large");
		// }
		// console.log(LumpType[this.lumpType]);
		// console.log(this.data);
		// console.log(`Offset: ${this.header.fileOffset}`);
		// console.log(`Length: ${this.header.lumpLength}\n`);
	}

	public read() {
		
	}

	public toString(): string {
		return `${LumpType[this.lumpType]}
		${this.header} 
		Lump:
			Data: ${this.data}
			Initialized: ${this.initialized}`;
	}
}