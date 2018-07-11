export class Edge {
	public vertexIndices: number[];

	constructor(vertex1: number, vertex2: number) {
		this.vertexIndices = [vertex1, vertex2];
	}

	// return flipped edge
	public reverse() {
		return new Edge(this.vertexIndices[1], this.vertexIndices[0]);
	}

	public toString() {
		return `[${this.vertexIndices[0]}, ${this.vertexIndices[1]}]`;
	}
}