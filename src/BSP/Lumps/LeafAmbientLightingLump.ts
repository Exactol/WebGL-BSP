import { Lump } from "./Lump";
import { HeaderLump } from "./HeaderLump";
import { LumpType } from "./LumpType";
import { BinaryReader} from "../Utils/BinaryReader";
import { Leaf } from "../Structs/Leaf";
import { ColorRGBExp32 } from "../Structs/ColorRGBExp32";
import { LeafAmbientLighting } from "../Structs/LeafAmbientLighting";
import { CompressedLightCube } from "../Structs/CompressedLightCube";

// version 20+. todo limit reading depending on version
export class LeafAmbientLightingLump extends Lump {
	public leafAmbientLighting: LeafAmbientLighting[] = [];

	constructor(header: HeaderLump, lumpData) {
		super(LumpType.LeafAmbientLighting, header, lumpData);
	}

	public read() {
		const reader = new BinaryReader(this.data);

		// each leafAmbientLight is 28 bytes long
		for (let i = 0; i < this.header.lumpLength; i += 28) {
			this.leafAmbientLighting.push( new LeafAmbientLighting (
				new CompressedLightCube([
					new ColorRGBExp32(reader.readUInt8(), reader.readUInt8(), reader.readUInt8(), reader.readInt8()),
					new ColorRGBExp32(reader.readUInt8(), reader.readUInt8(), reader.readUInt8(), reader.readInt8()),
					new ColorRGBExp32(reader.readUInt8(), reader.readUInt8(), reader.readUInt8(), reader.readInt8()),
					new ColorRGBExp32(reader.readUInt8(), reader.readUInt8(), reader.readUInt8(), reader.readInt8()),
					new ColorRGBExp32(reader.readUInt8(), reader.readUInt8(), reader.readUInt8(), reader.readInt8()),
					new ColorRGBExp32(reader.readUInt8(), reader.readUInt8(), reader.readUInt8(), reader.readInt8()),
				]),
				reader.readUInt8(),
				reader.readUInt8(),
				reader.readUInt8(),
				reader.readUInt8(),
			));
		}

		this.initialized = true;
	}

	public toString(): string {
		let retStr = super.toString();
		retStr += `\n${LumpType[this.lumpType]}: \n${this.leafAmbientLighting.join("\n")}`;

		return retStr;
	}
}