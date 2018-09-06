import { Lump } from "./Lump";
import { LumpHeader } from "./LumpHeader";
import { LumpType } from "./LumpType";
import { BinaryReader} from "../Utils/BinaryReader";
import { Leaf } from "../Structs/Leaf";

export class LeafLump extends Lump {
	public leaves: Leaf[] = [];

	constructor(header: LumpHeader, lumpData) {
		super(LumpType.Leafs, header, lumpData);
	}

	public read() {
		const reader = new BinaryReader(this.data);

		// each leaf is 56 bytes long
		for (let i = 0; i < this.header.lumpLength; i += 56) {
			this.leaves.push(new Leaf(
				reader.readInt32(),
				reader.readInt16(),
				reader.readInt16() & 0xFF80 >> 7, // todo ivestigate if this is the right way
				reader.readInt16() & 0x007F,
				[reader.readInt16(), reader.readInt16(), reader.readInt16()],
				[reader.readInt16(), reader.readInt16(), reader.readInt16()],
				reader.readUInt16(),
				reader.readUInt16(),
				reader.readUInt16(),
				reader.readUInt16(),
				reader.readInt16(),
			));
		}

		this.initialized = true;
	}

	public toString(): string {
		let retStr = super.toString();
		retStr += `\n${LumpType[this.lumpType]}: \n${this.leaves.join("\n")}`;

		return retStr;
	}
}