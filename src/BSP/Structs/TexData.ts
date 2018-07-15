import { vec3 } from "gl-matrix";

export class TexData {
	public reflectivity: vec3;
	public nameDataStringTableID: number;
	public width: number;
	public height: number;
	public viewWidth: number;
	public viewHeight: number;

	constructor(reflectivity: vec3, nameDataStringTableID: number, width: number, height: number, 
			viewWidth: number, viewHeight: number) {
		this.reflectivity = reflectivity;
		this.nameDataStringTableID = nameDataStringTableID;
		this.width = width;
		this.height = height;
		this.viewWidth = viewWidth;
		this.viewHeight = viewHeight;
	}

	public toString() {
		return `Reflectivity: [${this.reflectivity}]
		NameDataStringTableID: ${this.nameDataStringTableID}
		Width: ${this.width}
		Height: ${this.height}
		ViewWidth: ${this.viewWidth}
		ViewHeight: ${this.viewHeight}`;
	}
}