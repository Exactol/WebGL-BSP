import { Shader } from "./Shaders/Shader";
import { UniformLocations } from "./Shaders/UniformLocations";
import { TextureDictionary } from "./Textures/TextureDictionary";

export class ResourceManager {
	private gl: WebGL2RenderingContext;
	private textureDictionary: TextureDictionary;

	constructor(gl: WebGL2RenderingContext) {
		this.gl = gl;
		this.textureDictionary = new TextureDictionary(this.gl);
	}

	public getGLContext() {
		return this.gl;
	}
	public setGLContext(newContext: WebGL2RenderingContext) {
		this.gl = newContext;
	}

	public getTextureDictionary() {
		return this.textureDictionary;
	}
}