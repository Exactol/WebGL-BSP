import { DispSubNeighbor } from "./DispSubNeighbor";

export class DispNeighbor {
	public subNeighbors: DispSubNeighbor[];

	constructor(subNeighbors: DispSubNeighbor[]) {
		this.subNeighbors = subNeighbors;
	}

	public toString() {
		return `[
	${this.subNeighbors[0]}, 
	${this.subNeighbors[1]}
	]`;
	}	
}