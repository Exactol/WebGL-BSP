import { Lump } from "./Lump";
import { LumpHeader } from "./LumpHeader";
import { LumpType } from "./LumpType";
import { BinaryReader, UINT_16_SIZE} from "../Utils/BinaryReader";
import { LeafAmbientIndex } from "../Structs/LeafAmbientIndex";

// version 20+. todo limit reading depending on version
export class LeafAmbientIndexLump extends Lump {
	public leafAmbientIndex: LeafAmbientIndex[] = [];

	constructor(header: LumpHeader, lumpData) {
		super(LumpType.LeafAmbientIndex, header, lumpData);
	}

	public read() {
		const reader = new BinaryReader(this.data);

		// each leafAmbientLightIndex is 4 bytes long
		for (let i = 0; i < this.header.lumpLength; i += UINT_16_SIZE * 2) {
			this.leafAmbientIndex.push( new LeafAmbientIndex(
				reader.readUInt16(),
				reader.readUInt16()
			));
		}

		this.initialized = true;
	}

	public toString(): string {
		let retStr = super.toString();
		retStr += `\n${LumpType[this.lumpType]}: \n${this.leafAmbientIndex.join("\n\n")}`;

		return retStr;
	}
}