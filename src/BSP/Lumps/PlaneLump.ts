import { Lump } from "./Lump";
import { Plane } from "../Structs/Plane";
import { HeaderLump } from "./HeaderLump";
import { LumpType } from "./LumpType";
import { BinaryReader, FLOAT_SIZE, INT_32_SIZE } from "../Utils/BinaryReader";
import { vec3 } from "gl-matrix";

export class PlaneLump extends Lump {
	public planes: Plane[] = [];

	constructor(header: HeaderLump, lumpData) {
		super(LumpType.Planes, header, lumpData);
	}

	public read() {
		const reader = new BinaryReader(this.data);

		// each plane is 20 bytes long
		for (let i = 0; i < this.header.lumpLength; i += FLOAT_SIZE * 4 + INT_32_SIZE) {
			this.planes.push( 
				new Plane(
					vec3.fromValues(reader.readFloat(), reader.readFloat(), reader.readFloat()),
					reader.readFloat(),
					reader.readInt32()
			));
		}

		this.initialized = true;
	}

	public toString(): string {
		let retStr = super.toString();
		retStr += `\nPlanes: \n${this.planes.join("\n")}`;

		return retStr;
	}
}