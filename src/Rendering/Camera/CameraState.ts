import { vec3, mat4 } from "gl-matrix";

export class CameraState {
	public position: vec3;

	public modelMatrix: mat4;
	public projectionMatrix: mat4;
	public viewMatrix: mat4;

	constructor(pos: vec3, modelMat: mat4, projMat: mat4, viewMat: mat4) {
		this.position = pos;
		this.modelMatrix = modelMat;
		this.projectionMatrix = projMat;
		this.viewMatrix = viewMat;
	}
}