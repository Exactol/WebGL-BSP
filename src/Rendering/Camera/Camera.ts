import { vec3, mat4, glMatrix } from "gl-matrix";
import { wrapAngle } from "../../Utils/WrapAngle";
import { limitAngle } from "../../Utils/LimitAngle";


// todo make into interface
export class Camera {
	public position: vec3;

	public horizontalFov = 45;
	public aspectRatio: number;

	public originalSpeed = 5;
	public speed = 5;
	public mouseSensitivity = 5;

	public up: vec3 = vec3.fromValues(0, 1, 0);

	public modelMatrix: mat4 = mat4.identity(mat4.create());

	private nearClip = 0.1;
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
		console.log("--Initializing Camera--");
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
			this.horizontalFov * (Math.PI / 180 ),
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

	public updateHorizontalFov(width: number, height: number) {
		if (height === 0) {
			console.log("Error, height cannot be 0");
			return;
		}
		
		this.horizontalFov = width / height;
	}

	public moveForward() {
		// get front matrix
		const front = this.getFront();

		// x
		this.position[0] += (this.speed * front[0]);

		// y
		this.position[1] += (this.speed * front[1]);

		// z
		this.position[2] += (this.speed * front[2]);
	}

	public moveBackword() {
		// get front matrix
		const front = this.getFront();

		// x
		this.position[0] -= (this.speed * front[0]);

		// y
		this.position[1] -= (this.speed * front[1]);

		// z
		this.position[2] -= (this.speed * front[2]);
	}

	public moveRight() {
		//
		const right = this.getRight();

		// x
		this.position[0] += (this.speed * right[0] * 0.01);

		// y
		this.position[1] += (this.speed * right[1] * 0.01);

		// z
		this.position[2] += (this.speed * right[2] * 0.01);		
	}

	public moveLeft() {
		//
		const right = this.getRight();

		// x
		this.position[0] -= (this.speed * right[0] * 0.01);

		// y
		this.position[1] -= (this.speed * right[1] * 0.01);

		// z
		this.position[2] -= (this.speed * right[2] * 0.01);
	}
}