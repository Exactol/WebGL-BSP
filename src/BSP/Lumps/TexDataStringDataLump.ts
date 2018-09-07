import { Lump } from "./Lump";
import { LumpHeader } from "./LumpHeader";
import { LumpType } from "./LumpType";
import { BinaryReader, INT_16_SIZE, INT_32_SIZE, CHAR_SIZE} from "../Utils/BinaryReader";
import { TexInfo } from "../Structs/TexInfo";

export class TexDataStringDataLump extends Lump {
	public stringData: string[] = [];

	constructor(header: LumpHeader, lumpData) {
		super(LumpType.TexDataStringData, header, lumpData);
	}

	public read() {
		const reader = new BinaryReader(this.data);
		let tmpStr = reader.readString(false);

		while (tmpStr != null) {
			this.stringData.push(tmpStr);
			tmpStr = reader.readString(false);
		}

		this.initialized = true;
	}

	public toString(): string {
		let retStr = super.toString();
		retStr += `\n${LumpType[this.lumpType]}: [${this.stringData.join(", ")}]`;

		return retStr;
	}

	public readStringAtOffset(offset: number){
		const reader = new BinaryReader(this.data, offset);
		return reader.readString();
	}	

	private readStrings(reader: BinaryReader) {
		let retStr = "";
		let nextChar = reader.readChar();
		while (nextChar !== "\0" && reader.position + CHAR_SIZE <= reader.length) {
			retStr += nextChar;
			nextChar = reader.readChar();
		}
	}
}