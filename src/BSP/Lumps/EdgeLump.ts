import { Lump } from "./Lump";
import { HeaderLump } from "./HeaderLump";
import { Edge } from "../Structs/Edge";
import { BinaryReader, FLOAT_SIZE, UINT_16_SIZE } from "../Utils/BinaryReader";
import { LumpType } from "./LumpType";

export class EdgeLump extends Lump {
	public edges: Edge[] = [];

	constructor(header: HeaderLump, lumpData) {
		super(LumpType.Edges, header, lumpData);
	}

	public read() {
		const reader = new BinaryReader(this.data);

		for (let i = 0; i < this.header.lumpLength; i += UINT_16_SIZE * 2) {
			this.edges.push(new Edge(reader.readUInt16(), reader.readUInt16()));
		}

		this.initialized = true;
	}

	public toString(): string {
		let retStr = super.toString();

		retStr += `\nEdges: [${this.edges.join(", ")}]`;

		return retStr;
	}
}