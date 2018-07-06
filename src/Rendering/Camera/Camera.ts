import { vec3, mat4 } from "gl-matrix";
import { wrapAngle } from "../../Utils/WrapAngle";
import { limitAngle } from "../../Utils/LimitAngle";

import toRadian = require("gl-matrix/src/gl-matrix/common");
import normalize = require("gl-matrix/src/gl-matrix/vec3");

export class Camera {
	public position: vec3;

	public horizontalFov = 45;
	public aspectRatio: number;

	public originalSpeed = 50;
	public speed = 50;
	public mouseSensitivity = 5;

	public front: vec3;
	public up: vec3 = vec3.fromValues(0, 1, 0);
	
	public projectionMatrix: mat4;
	public viewMatrix: mat4;
	public modelMatrix: mat4 = mat4.identity(new mat4(0));

	private nearClip = 10;
	private farClip = 1000;

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
	
	constructor(height: number, width: number) {
		if (height === 0) {
			console.log("Error, height cannot be 0");
			this.aspectRatio = 0;
		} else {
			this.aspectRatio = width / height;
		}

		this.position = vec3.create();

		this.horizontalAngle = 0;
		this.verticalAngle = 0;

		
		// calculate front vector
		this.front = vec3.create();
		this.GetFront();

		// calculate projection matrix
		this.projectionMatrix = mat4.create();
		this.viewMatrix = mat4.create();
		this.GetProjectionMatrix();
	}

	public GetFront(): vec3 {
		// x
		this.front[0] = Math.sin(toRadian(this.verticalAngle)) * Math.cos(toRadian(this.horizontalAngle));
		// y
		this.front[1] = Math.sin(toRadian(this.verticalAngle));
		// z
		this.front[2] = Math.cos(toRadian(this.verticalAngle)) * Math.sin(toRadian(this.horizontalAngle));
		normalize(this.front, this.front);
		return this.front;
	}

	public GetProjectionMatrix(): mat4 {
		mat4.perspective(this.projectionMatrix, 
			this.horizontalFov * (Math.PI / 180 ),
			this.aspectRatio, this.nearClip, this.farClip);

	 	// tslint:disable-next-line:align
	 	return this.projectionMatrix;
	}

	public GetViewMatrix(): mat4 {
		const positionPlusFront: vec3 = vec3.create();
		vec3.add(positionPlusFront, this.position, this.front);

		mat4.lookAt(this.viewMatrix, this.position, positionPlusFront, this.up);

		return this.viewMatrix;
	}

	public GetModelMatrix(): mat4 {
		return this.modelMatrix;
	}
}