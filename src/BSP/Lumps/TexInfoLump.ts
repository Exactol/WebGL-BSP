import { Lump } from "./Lump";
import { LumpHeader } from "./LumpHeader";
import { LumpType } from "./LumpType";
import { BinaryReader, INT_16_SIZE} from "../Utils/BinaryReader";
import { TexInfo } from "../Structs/TexInfo";

export class TexInfoLump extends Lump {
	public texInfos: TexInfo[] = [];

	constructor(header: LumpHeader, lumpData) {
		super(LumpType.TexInfo, header, lumpData);
	}

	public read() {
		const reader = new BinaryReader(this.data);

		// each texInfo is 72 bytes long
		for (let i = 0; i < this.header.lumpLength; i += 72) {
			this.texInfos.push(new TexInfo(
				[[reader.readFloat(), reader.readFloat(), reader.readFloat(), reader.readFloat()], 
					[reader.readFloat(), reader.readFloat(), reader.readFloat(), reader.readFloat()]],
				[[reader.readFloat(), reader.readFloat(), reader.readFloat(), reader.readFloat()], 
					[reader.readFloat(), reader.readFloat(), reader.readFloat(), reader.readFloat()]],
				reader.readInt32(),
				reader.readInt32()
			));
		}

		this.initialized = true;
	}

	public toString(): string {
		let retStr = super.toString();
		retStr += `\n${LumpType[this.lumpType]}: ${this.texInfos.join("\n")}`;

		return retStr;
	}
}