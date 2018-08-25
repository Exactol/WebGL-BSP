import { Lump } from "./Lump";
import { HeaderLump } from "./HeaderLump";
import { LumpType } from "./LumpType";
import { BinaryReader, FLOAT_SIZE, INT_32_SIZE} from "../Utils/BinaryReader";
import { TexInfo } from "../Structs/TexInfo";
import { TexData } from "../Structs/TexData";
import { vec3 } from "gl-matrix";

export class TexDataLump extends Lump {
	public texDatas: TexData[] = [];

	constructor(header: HeaderLump, lumpData) {
		super(LumpType.TexData, header, lumpData);
	}

	public read() {
		const reader = new BinaryReader(this.data);

		// each texData is 32 bytes long
		for (let i = 0; i < this.header.lumpLength; i += FLOAT_SIZE * 3 + INT_32_SIZE * 5) {
			this.texDatas.push(new TexData(
				vec3.fromValues(reader.readFloat(), reader.readFloat(), reader.readFloat()),
				reader.readInt32(),
				reader.readInt32(),
				reader.readInt32(),
				reader.readInt32(),
				reader.readInt32()
			));
		}

		this.initialized = true;
	}

	public toString(): string {
		let retStr = super.toString();
		retStr += `\n${LumpType[this.lumpType]}: ${this.texDatas.join("\n")}`;

		return retStr;
	}
}