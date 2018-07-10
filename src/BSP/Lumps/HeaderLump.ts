import { LumpEnum } from "../LumpEnums";

export class HeaderLump {
	lumpType: LumpEnum;
	fileOffset: number;
	fileLen: number;
	version: number;
	fourCC: Int8Array;

	constructor(lType: LumpEnum, data: Int8Array) {
		
	}
}