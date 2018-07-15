import { Lump } from "./Lump";
import { HeaderLump } from "./HeaderLump";
import { LumpType } from "./LumpType";
import { BinaryReader, INT_32_SIZE, UINT_16_SIZE} from "../Utils/BinaryReader";
import { Face } from "../Structs/Face";
import { GameLumpStruct } from "../Structs/GameLumpStruct";

export class GameLump extends Lump {
	public lumpCount: number = 0;
	public lumps: GameLumpStruct[] = [];

	constructor(header: HeaderLump, lumpData) {
		super(LumpType.Game, header, lumpData);
	}

	public read() {
		const reader = new BinaryReader(this.data);

		this.lumpCount = reader.readInt32();

		// each face is 56 bytes long
		for (let i = 0; i < this.lumpCount; i++) {
			this.lumps.push(new GameLumpStruct(
				reader.readInt32(),
				reader.readUInt16(),
				reader.readUInt16(),
				reader.readInt32(),
				reader.readInt32()
			));
		}

		this.initialized = true;
	}

	public toString(): string {
		let retStr = super.toString();
		retStr += `\nLump Count: ${this.lumpCount}
		${LumpType[this.lumpType]}: \n${this.lumps.join("\n")}`;

		return retStr;
	}
}