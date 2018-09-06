import { Lump } from "./Lump";
import { LumpHeader } from "./LumpHeader";
import { Edge } from "../Structs/Edge";
import { BinaryReader, FLOAT_SIZE, UINT_16_SIZE } from "../Utils/BinaryReader";
import { LumpType } from "./LumpType";

export class EdgeLump extends Lump {
	public edges: Edge[] = [];

	constructor(header: LumpHeader, lumpData) {
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

		retStr += `\n${LumpType[this.lumpType]}: [${this.edges.join(", ")}]`;

		return retStr;
	}
}