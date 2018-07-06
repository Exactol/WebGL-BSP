import {vec4, vec3} from "gl-matrix";

export class Vertex {
	public size = (3 + 4 + 3) * 4; // size of struct in bytes

	public position: vec3;
	public color: vec4;
	public normal: vec3;

	constructor(_pos: vec3, _col: vec4, _norm: vec3 = new vec3(0)) {
		this.position = _pos;
		this.color = _col;
		this.normal = _norm;
	}
}