import { DispOrientation, DispSpan } from "./Enums";

export class DispSubNeighbor {
	public iNeighbor: number; // index into ddispinfos
	public neighborOrientation: DispOrientation;
	public span: DispSpan;
	public neighborSpan: DispSpan;

	constructor(iNeighbor: number, neighborOrientation: DispOrientation, span: DispSpan, neighborSpan: DispSpan) {
		this.iNeighbor = iNeighbor;
		this.neighborOrientation = neighborOrientation;
		this.span = span;
		this.neighborSpan = neighborSpan;
	}

	public toString() {
		return `iNeighbor: ${this.iNeighbor}
	neighborOrientation: ${this.neighborOrientation}
	span: ${this.span}
	neighborSpan: ${this.neighborSpan}
		`;
	}

	// public isValid(): boolean {
	// 	return this.iNeighbor !== 0xFFFF; 
	// }
}