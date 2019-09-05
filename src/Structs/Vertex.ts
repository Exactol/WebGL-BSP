import {vec2, vec4, vec3} from "gl-matrix";

export const TRUE = 1;
export const FALSE = 0;

export class Vertex {
	// public size = (3 + 4 + 4) * 4; // size of struct in bytes

	public position: vec3;
	public normal: vec3;
	public fallbackColor: vec4;
	public textureLoaded: number;
	public texCoord: vec2;
	public texIndex: number;

	constructor(_pos: vec3, _norm: vec3 = vec3.create(), fallbackColor = vec4.create(),
			textureLoaded = FALSE, texCoord: vec2 = vec2.fromValues(0, 1), texIndex = 255) {
		this.position = _pos;
		this.normal = _norm;
		this.fallbackColor = fallbackColor;
		this.textureLoaded = textureLoaded;
		this.texCoord = texCoord;
		this.texIndex = texIndex;
	}
}