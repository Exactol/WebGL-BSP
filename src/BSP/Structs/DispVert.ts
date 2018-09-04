import { vec3 } from "gl-matrix";

export class DispVert {
	public vec: vec3;
	public dist: number;
	public alpha: number;

	constructor(vec: vec3, dist: number, alpha: number) {
		this.vec = vec;
		this.dist = dist;
		this.alpha = alpha;
	}

	public toString() {
		return `vec: ${this.vec}
dist: ${this.dist}
alpha: ${this.alpha}
		`;
	}
}