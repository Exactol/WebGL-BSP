export class Cubemap {
	public origin: [number, number, number];
	public size: number;

	constructor(origin: [number, number, number], size: number) {
		this.origin = origin;
		this.size = size;
	}

	public toString() {
		return `Origin: [${this.origin}]
		Size: ${this.size}`;
	}
}