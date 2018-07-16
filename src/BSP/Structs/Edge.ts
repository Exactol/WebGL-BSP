export class Edge {
	public vertexIndices: number[];

	constructor(vertex1: number, vertex2: number) {
		this.vertexIndices = [vertex1, vertex2];
	}

	// return flipped edge
	public reverse() {
		return new Edge(this.vertexIndices[1], this.vertexIndices[0]);
	}

	public getVertIndices(reverse = false) {
		if (reverse) {
			const reversedEdge = this.reverse();
			return this.reverse().vertexIndices;
		}

		return this.vertexIndices;
	}

	public toString() {
		return `[${this.vertexIndices[0]}, ${this.vertexIndices[1]}]`;
	}
}