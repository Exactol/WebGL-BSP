import { CreateShaderProgram } from "../Shaders/Shader";
import { UniformLocations } from "../Shaders/UniformLocations";
import { TextureDictionary } from "../Textures/TextureDictionary";
import { BSP } from "../../BSP/BSP";
import { ShaderSource } from "../Shaders/ShaderSource";

export class BSPResourceManager {
	private gl: WebGL2RenderingContext;
	private textureDictionary: TextureDictionary;
	private bsp: BSP;
	private shaderPrograms: WebGLProgram[] = [];

	constructor(gl: WebGL2RenderingContext, bsp: BSP) {
		this.gl = gl;
		this.textureDictionary = new TextureDictionary(this.gl);
		this.bsp = bsp;
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

	public getBSP() {
		return this.bsp;
	}

	// all shader programs are stored in an array. This function will return the index for the position of that program
	public createShaderProgram(): number {
		const program = this.gl.createProgram();
		if (program === null) {
			throw new Error("Failed to create shader program");
		}
		this.shaderPrograms.push(program);
		return this.shaderPrograms.length - 1;
	}

	public getUniformLocations(index: number): UniformLocations {
		return new UniformLocations(this.gl, this.shaderPrograms[index]);
	}

	public getShaderProgram(index: number) {
		return this.shaderPrograms[index];
	}

	public addShaders(index: number, shaders: ShaderSource[]) {
		shaders.forEach((shader) => {
			this.gl.attachShader(this.shaderPrograms[index], shader.compileShader(this.gl));
		});

		this.gl.linkProgram(this.shaderPrograms[index]);
		// check for errors
		if (!this.gl.getProgramParameter(this.shaderPrograms[index], this.gl.LINK_STATUS)) {
			console.log("Unable to initialize shader program: " + this.gl.getProgramInfoLog(this.shaderPrograms[index]));
			return null;
		}
	
	}
}