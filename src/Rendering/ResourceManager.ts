import { Shader } from "./Shaders/Shader";
import { UniformLocations } from "./UniformLocations";

export class ResourceManager {
	private gl: WebGL2RenderingContext;

	constructor(gl: WebGL2RenderingContext) {
		this.gl = gl;
	}

	public getGLContext() {
		return this.gl;
	}
	public setGLContext(newContext: WebGL2RenderingContext) {
		this.gl = newContext;
	}
}