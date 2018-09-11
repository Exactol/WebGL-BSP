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
		// version 20 leaf is 32 bytes long
		// TODO: per version lump parsing
		for (let i = 0; i < this.header.lumpLength; i += 32) {
			const contents = reader.readInt32();
			const cluster = reader.readInt16();
	
			// todo ivestigate if this is the right way
			const bitfield = reader.readInt16();
			const area = bitfield & 0xFF80 >> 7;
			const flags = bitfield & 0x007F;
	
			const mins: [number, number, number] = [reader.readInt16(), reader.readInt16(), reader.readInt16()];
			const maxs: [number, number, number] = [reader.readInt16(), reader.readInt16(), reader.readInt16()];
			
			const firstLeafFace = reader.readUInt16();
			const numLeafFaces = reader.readUInt16();
			
			const firstLeafBrush = reader.readUInt16();
			const numLeafBrushes = reader.readUInt16();
			
			const leafWaterDataID = reader.readInt16();

			// padding? TODO: investigate why there are 2 missing bytes
			reader.readInt16();
			
			this.leaves.push(new Leaf(
				contents,
				cluster,
				area,
				flags,
				mins,
				maxs,
				firstLeafFace,
				numLeafFaces,
				firstLeafBrush,
				numLeafBrushes,
				leafWaterDataID,
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