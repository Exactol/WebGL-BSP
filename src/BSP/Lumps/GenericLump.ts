import { Lump } from "./Lump";
import { LumpHeader } from "./LumpHeader";
import { LumpType } from "./LumpType";

export class GenericLump extends Lump {
	constructor(headerLump: LumpHeader, lumpData: ArrayBuffer) {
		super(LumpType.Generic, headerLump, lumpData);
	}
}