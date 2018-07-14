import { Lump } from "./Lump";
import { HeaderLump } from "./HeaderLump";
import { LumpType } from "./LumpType";
import { BinaryReader, UINT_16_SIZE} from "../Utils/BinaryReader";

export class LeafFaceLump extends Lump {
	public leafFaces: number[] = [];

	constructor(header: HeaderLump, lumpData) {
		super(LumpType.LeafFaces, header, lumpData);
	}

	public read() {
		const reader = new BinaryReader(this.data);

		for (let i = 0; i < this.header.lumpLength; i += UINT_16_SIZE) {
			this.leafFaces.push(reader.readUInt16());
		}

		this.initialized = true;
	}

	public toString(): string {
		let retStr = super.toString();
		retStr += `\n${LumpType[this.lumpType]}: [${this.leafFaces.join(", ")}]`;

		return retStr;
	}
}