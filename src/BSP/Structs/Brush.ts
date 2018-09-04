import { BrushContent } from "./Enums";

export class Brush {
	public firstSide: number;
	public numSides: number;
	public contents: BrushContent;

	constructor(firstSide: number, numSides: number, contents: BrushContent) {
		this.firstSide = firstSide;
		this.numSides = numSides;
		this.contents = contents;
	}

	public toString() {
		return `FirstSide: ${this.firstSide}
		NumSides: ${this.numSides}
		Contents: ${BrushContent[this.contents]}`; // todo investigate brush contents showing up as undefined
	}
}

