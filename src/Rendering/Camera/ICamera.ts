import { vec3, mat4 } from "gl-matrix";
import { IEngineComponent } from "../IEngineComponent";

export interface ICamera extends IEngineComponent {
	position: vec3;

	horizontalFov: number;
	aspectRatio: number;

	speed: number;
	mulitplier: number;
	mouseSensitivity: number;

	up: vec3;

	modelMatrix: mat4;

	nearClip: number;
	farClip: number;

	horizontalAngle: number;
	verticalAngle: number;

	getFront(): vec3;
	getRight(): vec3;

	getViewMatrix(): mat4;
	getModelMatrix(): mat4;
	getProjectionMatrix(): mat4;
	
	updateAspectRatio(width: number, height: number): void;

	move(direction: MoveDirection);
	
	update(dX: number, dY: number, dTime: number): void;
}

export enum MoveDirection {
	forward,
	backward,
	left,
	right,
}