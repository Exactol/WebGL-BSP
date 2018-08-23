import {vec4, vec3} from "gl-matrix";

export class Vertex {
	public size = (3 + 3) * 4; // size of struct in bytes

	public position: vec3;
	public normal: vec3;

	constructor(_pos: vec3, _norm: vec3 = vec3.create()) {
		this.position = _pos;
		this.normal = _norm;
	}
}
// export class Vertex {
// 	public size = (3 + 4 + 4) * 4; // size of struct in bytes

// 	public position: vec3;
// 	public color: vec4;
// 	public normal: vec3;

// 	constructor(_pos: vec3, _col: vec4, _norm: vec3 = vec3.create()) {
// 		this.position = _pos;
// 		this.color = _col;
// 		this.normal = _norm;
// 	}
// }