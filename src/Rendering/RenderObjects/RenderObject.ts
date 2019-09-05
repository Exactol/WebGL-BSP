import { Vertex } from "../../Structs/Vertex";
import { IRenderable, Visibility } from "./IRenderable";
import { POSITION_ATTRIB_LOCATION } from "../Shaders/LayoutLocations";
import { CameraState } from "../Camera/CameraState";
import { VertShader, FragShader, SimpleFragShader, SimpleVertShader } from "../Shaders/ShaderSource";
import { UniformLocations } from "../Shaders/UniformLocations";

export class RenderObject implements IRenderable {
	public visibility = Visibility.Visible;
	public VAO!: WebGLVertexArrayObject;
	public VBO!: WebGLBuffer;

	private verticeCount: number;
	private initialized = false;
	private renderType = WebGL2RenderingContext.POINTS;
	private program!: WebGLProgram | null;
	private uniformLocations!: UniformLocations;

	constructor(gl: WebGL2RenderingContext, vertices: Vertex[], renderType: number = WebGL2RenderingContext.POINTS) {
		this.verticeCount = vertices.length;
		this.renderType = renderType;

		// create buffers
		const _vbo = gl.createBuffer();
		const _vao = gl.createVertexArray();

		// check buffer creation was successful
		if (_vbo == null) {
			console.log("Failed to generate VBO");
			return;
		}

		if (_vao == null) {
			console.log("Failed to generate VAO");
			return;
		}

		this.VBO = _vbo;
		this.VAO = _vao;

		// bind buffers
		gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);

		// allocate buffer for all vertices and store them in it
		const vertexData = RenderObject.concatBuffers(vertices.map((a) => a.position));

		// buffer vertex data
		gl.bufferData(gl.ARRAY_BUFFER,
			vertexData, gl.STATIC_DRAW);

		// create vertex position VAO
		gl.bindVertexArray(this.VAO);
		gl.enableVertexAttribArray(POSITION_ATTRIB_LOCATION);
		gl.vertexAttribPointer(
			POSITION_ATTRIB_LOCATION, // attribute location
			3,					      // size of attribute (vec3)
			gl.FLOAT,				  // type of attribute is float
			false,					  // does not need to be normalized
			0,						  // 0 = move forward size * sizeof(type) each iteration to get the next position
			0						  // offset (start at beginnng of buffer)
		);

		this.program = gl.createProgram();
		if (this.program === null) {
			throw new Error("Failed to create shader program");
		}

		const vShader = SimpleVertShader.compileShader(gl);
		if (vShader) {
			gl.attachShader(this.program, vShader);
		}
		const fShader = SimpleFragShader.compileShader(gl);
		if (fShader) {
			gl.attachShader(this.program, fShader);
		}

		gl.linkProgram(this.program);
		// check for errors
		if (!gl.getProgramParameter(this.program, gl.LINK_STATUS)) {
			console.log("Unable to initialize shader program: " + gl.getProgramInfoLog(this.program));
			return;
		}

		this.uniformLocations = new UniformLocations(gl, this.program);
		this.initialized = true;
	}

	public draw(gl: WebGL2RenderingContext, cameraState: CameraState, renderTypeOverride?: number) {
		if (!this.initialized) {
			console.log("Cannot render object, not initialized");
			return;
		}
		if (this.visibility === Visibility.Hidden) {
			return;
		}

		gl.useProgram(this.program);

		// upload uniforms
		gl.uniformMatrix4fv(this.uniformLocations.uModelMatLocation,
			false,
			cameraState.modelMatrix);

		gl.uniformMatrix4fv(this.uniformLocations.uViewMatLocation,
			false,
			cameraState.viewMatrix);

		gl.uniformMatrix4fv(this.uniformLocations.uProjectionMatrixLocation,
			false,
			cameraState.projectionMatrix);

		gl.bindVertexArray(this.VAO);
		gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);

		if (renderTypeOverride) {
			gl.drawArrays(renderTypeOverride, 0, this.verticeCount);
		} else {
			gl.drawArrays(this.renderType, 0, this.verticeCount);
		}
	}

	// source: https://stackoverflow.com/a/14089496
	// tslint:disable-next-line:member-ordering
	private static concatBuffers(buffers: Float32Array[]): Float32Array {
		// create array of buffer lengths
		const length = buffers.map((a) => a.length );

		// add up lengths of all buffers
		const bufOut = new Float32Array(length.reduce((a, b) => a + b, 0));

		for (let i = 0; i < buffers.length; i++) {
			// calculate offset from start
			const offset = RenderObject.sum(length.slice(0, i));

			// insert data starting at offset position
			bufOut.set(buffers[i], offset);
		}

		return bufOut;
	}

	// tslint:disable-next-line:member-ordering
	private static sum(array: number[]): number {
		// tslint:disable-next-line:only-arrow-functions
		return array.reduce((a, b) => a + b, 0);
	}
}