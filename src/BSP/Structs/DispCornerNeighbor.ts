import { DispSubNeighbor } from "./DispSubNeighbor";
import { DispNeighbor } from "./DispNeighbor";

const MAX_DISP_CORNER_NEIGHBORS = 4;

export class DispCornerNeighbors {
	public neighbors: [number, number, number, number]; // indices of neighbors
	public nNeighbors: number;

	constructor(neighbors: [number, number, number, number], nNeighbors: number) {
		this.neighbors = neighbors;
		this.nNeighbors = nNeighbors;
	}

	public toString() {
		return `neighbors: [${this.neighbors[0]},
		${this.neighbors[1]}, 
		${this.neighbors[2]}, 
		${this.neighbors[3]}]
		numNeighbors: ${this.nNeighbors}
	`;
	}
}