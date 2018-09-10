import {ICamera, MoveDirection} from "./ICamera";
import { vec3, mat4 } from "gl-matrix";
import { limitAngle } from "../../Utils/LimitAngle";
import { wrapAngle } from "../../Utils/WrapAngle";
import { MessageType, Message } from "../Messaging/Message";

export class OrthoCamera implements ICamera {
	public componentName = "OrthoCamera";
	
	public position: vec3;

	public horizontalFov = 45;
	public aspectRatio: number;

	public speed = 1;
	public mulitplier = 1.0;
	public mouseSensitivity = 5;

	public up: vec3 = vec3.fromValues(0, 1, 0);

	public modelMatrix: mat4 = mat4.identity(mat4.create());

	public nearClip = 1;
	public farClip = 1000;

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
		console.log("--Initializing Ortho Camera--");
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
		throw new Error("Method not implemented.");
	}
	public getRight(): vec3 {
		throw new Error("Method not implemented.");
	}
	public getViewMatrix(): mat4 {
		throw new Error("Method not implemented.");
	}
	public getModelMatrix(): mat4 {
		throw new Error("Method not implemented.");
	}
	public getProjectionMatrix(): mat4 {
		throw new Error("Method not implemented.");
	}
	public updateAspectRatio(width: number, height: number): void {
		throw new Error("Method not implemented.");
	}
	public moveForward(): void {
		throw new Error("Method not implemented.");
	}
	public moveBackword(): void {
		throw new Error("Method not implemented.");
	}
	public moveRight(): void {
		throw new Error("Method not implemented.");
	}
	public moveLeft(): void {
		throw new Error("Method not implemented.");
	}
	public update(dX: number, dY: number, dTime: number): void {
		throw new Error("Method not implemented.");
	}
	public move(direction: MoveDirection) {
		throw new Error("Method not implemented.");
	}
	public onMessage(message: Message) {
		throw new Error("Method not implemented.");
	}
	
}