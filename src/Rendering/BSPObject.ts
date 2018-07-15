import { RenderObject } from "./RenderObject";
import { Face } from "../BSP/Structs/Face";
import { BSP } from "../BSP/BSP";
import { IRenderable } from "./IRenderable";
import { LumpType } from "../BSP/Lumps/LumpType";
import { VertexLump } from "../BSP/Lumps/VertexLump";
import { POSITION_ATTRIB_LOCATION } from "./UniformLocs";

export class BSPObject implements IRenderable {
	public VAO!: WebGLVertexArrayObject;
	public VBO!: WebGLBuffer;

	private verticeCount: number;
	private initialized = false;
	private renderType = WebGL2RenderingContext.POINTS;

	constructor(gl: WebGL2RenderingContext, bsp: BSP) {
		const vertLump = bsp.getLump(LumpType.Vertexes) as VertexLump;
		this.verticeCount = vertLump.vertexes.length;

		// combine all vert data into one buffer
		const vertData = BSPObject.concatBuffers(vertLump.vertexes.map((v) => v));

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

		// buffer vertex data
		gl.bufferData(gl.ARRAY_BUFFER,
			vertData, gl.STATIC_DRAW);

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

		this.initialized = true;		
	}

	public Render(gl: WebGL2RenderingContext, renderTypeOverride?: number) {
		if (!this.initialized) {
			console.log("Cannot render object, not initialized");
			return;
		}

		gl.bindVertexArray(this.VAO);

		if (renderTypeOverride != null) {
			gl.drawArrays(renderTypeOverride, 0, this.verticeCount);
		} else {
			gl.drawArrays(this.renderType, 0, this.verticeCount);
		}
	}

	// source: https://stackoverflow.com/a/14089496
	private static concatBuffers(buffers: Float32Array[]): Float32Array {
		// create array of buffer lengths
		const length = buffers.map((a) => a.length );

		// add up lengths of all buffers
		const bufOut = new Float32Array(length.reduce((a, b) => a + b, 0));

		for (let i = 0; i < buffers.length; i++) {
			// calculate offset from start
			const offset = BSPObject.sum(length.slice(0, i));

			// insert data starting at offset position
			bufOut.set(buffers[i], offset);
		}

		return bufOut;
	}

	private static sum(array: number[]): number {
		return array.reduce((a, b) => a + b, 0);
	}
}