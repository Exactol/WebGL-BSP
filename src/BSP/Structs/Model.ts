import { vec3 } from "gl-matrix";

export class Model {
	public mins: vec3;
	public maxs: vec3;
	public origin: vec3;
	public headNode: number;
	public firstNode: number;
	public numFaces: number;

	public constructor(mins: vec3, maxs: vec3, origin: vec3, headNode: number, firstNode: number, numFaces: number) {
		this.mins = mins;
		this.maxs = maxs;
		this.origin = origin;
		this.headNode = headNode;
		this.firstNode = firstNode;
		this.numFaces = numFaces;
	} 

	public toString() {
		return `Mins: ${this.mins}
		Maxs: ${this.maxs} 
		Origin: ${this.origin} 
		HeadNode: ${this.headNode} 
		FirstNode: ${this.firstNode} 
		NumFaces: ${this.numFaces} 
		`;
	}
}