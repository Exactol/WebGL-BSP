import {vec4} from "gl-matrix";

export class Vertex {
	public size = (4 + 4 + 4) * 4; // size of struct in bytes

	public position: vec4;
	public color: vec4;
	public normal: vec4;

	constructor(_pos: vec4, _col: vec4, _norm: vec4 = vec4.create()) {
		this.position = _pos;
		this.color = _col;
		this.normal = _norm;
	}
}