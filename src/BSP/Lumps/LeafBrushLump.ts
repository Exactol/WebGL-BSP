import { Lump } from "./Lump";
import { LumpHeader } from "./LumpHeader";
import { LumpType } from "./LumpType";
import { BinaryReader, INT_16_SIZE, UINT_16_SIZE} from "../Utils/BinaryReader";

export class LeafBrushLump extends Lump {
	public leafBrushes: number[] = [];

	constructor(header: LumpHeader, lumpData) {
		super(LumpType.LeafBrushes, header, lumpData);
	}

	public read() {
		const reader = new BinaryReader(this.data);

		for (let i = 0; i < this.header.lumpLength; i += UINT_16_SIZE) {
			this.leafBrushes.push(reader.readUInt16());
		}

		this.initialized = true;
	}

	public toString(): string {
		let retStr = super.toString();
		retStr += `\n${LumpType[this.lumpType]}: [${this.leafBrushes.join(", ")}]`;

		return retStr;
	}
}