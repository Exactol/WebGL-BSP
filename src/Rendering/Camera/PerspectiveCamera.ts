import { vec3, mat4, glMatrix } from "gl-matrix";
import { wrapAngle } from "../../Utils/WrapAngle";
import { limitAngle } from "../../Utils/LimitAngle";
import { GLRenderer } from "../GLRenderer";
import {ICamera} from "./ICamera";
import { toRadian } from "gl-matrix/src/gl-matrix/common";

export class PerspectiveCamera implements ICamera {
	public position: vec3;

	public horizontalFov = 45;
	public aspectRatio: number;

	public speed = 10;
	public mulitplier = 1.0;
	public mouseSensitivity = 5;

	public up: vec3 = vec3.fromValues(0, 1, 0);
	public modelMatrix: mat4 = mat4.identity(mat4.create());

	public nearClip = 1;
	public farClip = 10000;

	private _horizontalAngle!: number;
	public get horizontalAngle(): number {
		return this._horizontalAngle;
	}
	public set horizontalAngle(value: number) {
		this._horizontalAngle = wrapAngle(value);
	}

	private _verticalAngle!: number;
	public get verticalAngle(): number {
		return this._verticalAngle;
	}
	public set verticalAngle(value: number) {
		this._verticalAngle = limitAngle(value, -89, 89);
	}
	
	constructor(width: number, height: number) {
		console.log("--Initializing Perspective Camera--");
		console.log("	Canvas Width: " + width);
		console.log("	Canvas Height: " + height);

		if (height === 0) {
			console.log("Error, height cannot be 0");
			this.aspectRatio = 0;
		} else {
			this.aspectRatio = width / height;
		}

		console.log("	Aspect Ratio: " + this.aspectRatio);

		// start camera at world center
		this.position = vec3.fromValues(0, 0, 0);

		this.horizontalAngle = 0;
		this.verticalAngle = 0;

		// compensate for fact that source uses Z as up axis, while openGL uses Y.
		mat4.rotateX(this.modelMatrix, this.modelMatrix, glMatrix.toRadian(-90));

		// calculate projection matrix
		this.getProjectionMatrix();
	}
	
	public getFront(): vec3 {
		const front = vec3.create();
		
		// x
		front[0] = Math.cos(glMatrix.toRadian(this.verticalAngle)) * Math.cos(glMatrix.toRadian(this.horizontalAngle));
		// y
		front[1] = Math.sin(glMatrix.toRadian(this.verticalAngle));
		// z
		front[2] = Math.cos(glMatrix.toRadian(this.verticalAngle)) * Math.sin(glMatrix.toRadian(this.horizontalAngle));
		
		vec3.normalize(front, front);

		return front;
	}

	public getRight(): vec3 {
		const front = this.getFront();
		const right = vec3.create();

		vec3.cross(right, front, this.up);

		vec3.normalize(right, right);

		return right;

	}

	public getProjectionMatrix(): mat4 {
		const projectionMatrix = mat4.create();

		mat4.perspective(projectionMatrix, 
			glMatrix.toRadian(this.horizontalFov),
			this.aspectRatio, this.nearClip, this.farClip);

	 	// tslint:disable-next-line:align
	 	return projectionMatrix;
	}

	public getViewMatrix(): mat4 {
		const positionPlusFront: vec3 = vec3.create();
		vec3.add(positionPlusFront, this.position, this.getFront());

		const viewMatrix = mat4.create();
		mat4.lookAt(viewMatrix, this.position, positionPlusFront, this.up);

		return viewMatrix;
	}

	public getModelMatrix(): mat4 {
		return this.modelMatrix;
	}

	public updateAspectRatio(width: number, height: number) {
		if (height === 0) {
			console.log("Error, height cannot be 0");
			return;
		}
		
		this.aspectRatio = width / height;
	}

	public moveForward() {
		// get front matrix
		const front = this.getFront();

		// x
		this.position[0] += (this.speed * this.mulitplier * front[0]);

		// y
		this.position[1] += (this.speed * this.mulitplier * front[1]);

		// z
		this.position[2] += (this.speed * this.mulitplier * front[2]);
	}

	public moveBackword() {
		// get front matrix
		const front = this.getFront();

		// x
		this.position[0] -= (this.speed * this.mulitplier * front[0]);

		// y
		this.position[1] -= (this.speed * this.mulitplier * front[1]);

		// z
		this.position[2] -= (this.speed * this.mulitplier * front[2]);
	}

	public moveRight() {
		//
		const right = this.getRight();

		// x
		this.position[0] += (this.speed * this.mulitplier * right[0]);

		// y
		this.position[1] += (this.speed * this.mulitplier * right[1]);

		// z
		this.position[2] += (this.speed * this.mulitplier * right[2]);		
	}

	public moveLeft() {
		//
		const right = this.getRight();

		// x
		this.position[0] -= (this.speed * this.mulitplier * right[0]);

		// y
		this.position[1] -= (this.speed * this.mulitplier * right[1]);

		// z
		this.position[2] -= (this.speed * this.mulitplier * right[2]);
	}

	public update(dX: number, dY: number, dTime: number) {
		this.horizontalAngle += dX * dTime * this.mouseSensitivity;
		// todo investigate jerkiness in vertical angle
		this.verticalAngle += -dY * dTime * this.mouseSensitivity;
		// console.log("vAngle: " + this.verticalAngle);
		// console.log("hAngle: " + this.horizontalAngle);
	}
}