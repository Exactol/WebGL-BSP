import { Lump } from "./Lump";
import { LumpHeader } from "./LumpHeader";
import { LumpType } from "./LumpType";
import { BinaryReader} from "../Utils/BinaryReader";
import { Face } from "../Structs/Face";
import { Cubemap } from "../Structs/Cubemap";

export class CubemapLump extends Lump {
	public cubemaps: Cubemap[] = [];

	constructor(header: LumpHeader, lumpData) {
		super(LumpType.Cubemaps, header, lumpData);
	}

	public read() {
		const reader = new BinaryReader(this.data);

		// each cubemap is 16 bytes long
		for (let i = 0; i < this.header.lumpLength; i += 16) {
			this.cubemaps.push(new Cubemap(
				[reader.readInt32(), reader.readInt32(), reader.readInt32()],
				reader.readInt32()
			));
		}

		this.initialized = true;
	}

	public toString(): string {
		let retStr = super.toString();
		retStr += `\n${LumpType[this.lumpType]}: \n${this.cubemaps.join("\n")}`;

		return retStr;
	}
}