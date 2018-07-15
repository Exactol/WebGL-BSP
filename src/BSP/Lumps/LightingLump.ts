import { Lump } from "./Lump";
import { HeaderLump } from "./HeaderLump";
import { LumpType } from "./LumpType";
import { BinaryReader} from "../Utils/BinaryReader";
import { Leaf } from "../Structs/Leaf";
import { ColorRGBExp32 } from "../Structs/ColorRGBExp32";

export class LightingLump extends Lump {
	public lightmapSamples: ColorRGBExp32[] = [];

	constructor(header: HeaderLump, lumpData) {
		super(LumpType.Lighting, header, lumpData);
	}

	public read() {
		const reader = new BinaryReader(this.data);

		// each lightmap sample is 4 bytes long
		for (let i = 0; i < this.header.lumpLength; i += 4) {
			this.lightmapSamples.push(new ColorRGBExp32(
				reader.readUInt8(),
				reader.readUInt8(),
				reader.readUInt8(),
				reader.readInt8()
			));
		}

		this.initialized = true;
	}

	public toString(): string {
		let retStr = super.toString();
		retStr += `\n${LumpType[this.lumpType]}: \n${this.lightmapSamples.join("\n")}`;

		return retStr;
	}
}