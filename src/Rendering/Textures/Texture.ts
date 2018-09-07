import { vec4 } from "gl-matrix";

export class Texture {
	public name?: string;
	public id: number;
	public image?: HTMLImageElement;
	public placeholderColor: vec4;

	constructor(gl: WebGL2RenderingContext, placeholderColor: vec4, id: number, name?: string) {
		this.placeholderColor = placeholderColor;
		this.id = id;

		this.image = new Image();
		this.image.onload = () => {
		};

		if (name != null) {
			this.name = name;
			// TODO: construct url from name
			this.image.src = name;
		}

	}
}