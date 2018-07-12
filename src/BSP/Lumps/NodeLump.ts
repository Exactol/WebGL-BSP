import { Lump } from "./Lump";
import { HeaderLump } from "./HeaderLump";
import { LumpType } from "./LumpType";
import { BinaryReader} from "../Utils/BinaryReader";
import { Node } from "../Structs/Node";

export class NodeLump extends Lump {
	public nodes: Node[] = [];

	constructor(header: HeaderLump, lumpData) {
		super(LumpType.Brushes, header, lumpData);
	}

	public read() {
		const reader = new BinaryReader(this.data);

		// each node is 32 bytes long
		for (let i = 0; i < this.header.lumpLength; i += 32) {
			this.nodes.push(new Node(
				reader.readInt32(),
				[reader.readInt32(), reader.readInt32()],
				[reader.readInt16(), reader.readInt16(), reader.readInt16()],
				[reader.readInt16(), reader.readInt16(), reader.readInt16()],
				reader.readUInt16(),
				reader.readUInt16(),
				reader.readInt16(),
				reader.readInt16()
			));
		}

		this.initialized = true;
	}

	public toString(): string {
		let retStr = super.toString();
		retStr += `\n${LumpType[this.lumpType]}: \n${this.nodes.join("\n")}`;

		return retStr;
	}
}