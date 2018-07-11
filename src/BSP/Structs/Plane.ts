import { vec3 } from "gl-matrix";

export class Plane {
	public normal: vec3; // normal vector
	public dist: number; // distance from origin
	public type: number; // plane axis identifier

	constructor(norm: vec3, distance: number, planeType: number) {
		this.normal = norm;
		this.dist = distance;
		this.type = planeType;
	}

	public toString() {
		return `Normal: ${this.normal}
		Distance From Origin: ${this.dist}
		Type: ${this.type}
		`;
	}
}