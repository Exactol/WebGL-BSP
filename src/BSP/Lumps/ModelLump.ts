import { Lump } from "./Lump";
import { LumpHeader } from "./LumpHeader";
import { LumpType } from "./LumpType";
import { BinaryReader} from "../Utils/BinaryReader";
import { Leaf } from "../Structs/Leaf";
import { Model } from "../Structs/Model";
import { vec3 } from "gl-matrix";

export class ModelLump extends Lump {
	public models: Model[] = [];

	constructor(header: LumpHeader, lumpData) {
		super(LumpType.Models, header, lumpData);
	}

	public read() {
		const reader = new BinaryReader(this.data);

		// each model is 48 bytes long
		for (let i = 0; i < this.header.lumpLength; i += 48) {
			this.models.push(new Model(
				vec3.fromValues(reader.readFloat(), reader.readFloat(), reader.readFloat()),
				vec3.fromValues(reader.readFloat(), reader.readFloat(), reader.readFloat()),
				vec3.fromValues(reader.readFloat(), reader.readFloat(), reader.readFloat()),
				reader.readInt32(),
				reader.readInt32(),
				reader.readInt32()
			));
		}

		this.initialized = true;
	}

	public toString(): string {
		let retStr = super.toString();
		retStr += `\n${LumpType[this.lumpType]}: \n${this.models.join("\n")}`;

		return retStr;
	}
}