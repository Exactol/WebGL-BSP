import { Lump } from "./Lump";
import { LumpHeader } from "./LumpHeader";
import { LumpType } from "./LumpType";
import { BinaryReader, INT_16_SIZE, INT_32_SIZE} from "../Utils/BinaryReader";
import { TexInfo } from "../Structs/TexInfo";

export class TexDataStringTableLump extends Lump {
	public texDataTable: number[] = [];

	constructor(header: LumpHeader, lumpData) {
		super(LumpType.TexDataStringTable, header, lumpData);
	}

	public read() {
		const reader = new BinaryReader(this.data);

		for (let i = 0; i < this.header.lumpLength; i += INT_32_SIZE) {
			this.texDataTable.push(reader.readInt32());
		}

		this.initialized = true;
	}

	public toString(): string {
		let retStr = super.toString();
		retStr += `\n${LumpType[this.lumpType]}: [${this.texDataTable.join(", ")}]`;

		return retStr;
	}
}