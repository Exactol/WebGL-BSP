import { vec3, mat4 } from "gl-matrix";

export interface ICamera {
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

	moveForward(): void;
	moveBackword(): void;
	moveRight(): void;
	moveLeft(): void;
	
	update(dX: number, dY: number, dTime: number): void;
}