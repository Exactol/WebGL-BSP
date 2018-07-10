import { BinaryReader } from "../Utils/BinaryReader";
import { LumpEnum } from "./LumpEnums";

// https://developer.valvesoftware.com/wiki/Source_BSP_File_Format
export class BSP {
	public file: File;
	public fileData!: ArrayBuffer;
	public bspReader!: BinaryReader;

	public ident!: string;
	public version!: number;

	constructor(bsp: File) {
		console.log("--Reading " + bsp.name + "--");
		this.file = bsp;

		// read file contents into ArrayBuffer
		const reader = new FileReader();
		
		reader.onload = (e) => {
			if (e.target == null) {
				return;
			}
			this.fileData = e.target.result;
			
			this.readBSP();
		};

		reader.readAsArrayBuffer(bsp);
	}

	public readBSP() {
		this.bspReader = new BinaryReader(this.fileData);
		this.readHeader();
	}

	public readHeader() {
		console.log("--Header--");

		// read ident
		this.ident = "";
		for (let i = 0; i < 4; i++) {
			this.ident += this.bspReader.readChar();
		}
		console.log("Ident: " + this.ident);

		// read version
		this.version = this.bspReader.readInt32();
		console.log("Version: " + this.version);

		// read header lumps
	}

	public readLump(lump: LumpEnum) {

	}
}