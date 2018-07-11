import { Lump } from "./Lump";
import { HeaderLump } from "./HeaderLump";
import { LumpType } from "./LumpType";

export class GenericLump extends Lump {
	constructor(headerLump: HeaderLump, lumpData: ArrayBuffer) {
		super(LumpType.Generic, headerLump, lumpData);
	}
}