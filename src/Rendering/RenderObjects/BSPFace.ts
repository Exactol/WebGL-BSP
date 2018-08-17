import { Face } from "../../BSP/Structs/Face";
import { LumpType } from "../../BSP/Lumps/LumpType";
import { BSP } from "../../BSP/BSP";
import { IRenderable } from "./IRenderable";
import { POSITION_ATTRIB_LOCATION, NORMAL_ATTRIB_LOCATION } from "./UniformLocs";
import { addRange } from "../../Utils/AddRange";
import { PlaneLump } from "../../BSP/Lumps/PlaneLump";
import { VertexLump } from "../../BSP/Lumps/VertexLump";
import { SurfEdgeLump } from "../../BSP/Lumps/SurfEdgeLump";
import { EdgeLump } from "../../BSP/Lumps/EdgeLump";

export class BSPFace implements IRenderable {
	public hidden = false;
	public face: Face;
	public VAO!: WebGLVertexArrayObject;
	public VBO!: WebGLBuffer;
	public EAO!: WebGLBuffer; // index buffer
	private initialized = false;
	private renderMode = WebGL2RenderingContext.POINTS;
	private verticeCount;

	constructor(gl: WebGL2RenderingContext, face: Face, bsp: BSP) {
		this.face = face;

		// create mesh from face
		const mesh: number[] = this.faceToMesh(face, bsp);
		// this.verticeCount = face.numEdges * 2;// 
		this.verticeCount = mesh.length / 6;

		// create buffers
		const _vbo = gl.createBuffer();
		const _eao = gl.createBuffer();
		const _vao = gl.createVertexArray();

		// check buffer creation was successful
		if (_vbo == null) {
			console.log("Failed to generate VBO");
			return;
		}

		if (_eao == null) {
			console.log("Failed to generate EAO");
			return;
		}

		if (_vao == null) {
			console.log("Failed to generate VAO");
			return;
		}

		this.VBO = _vbo;
		this.VAO = _vao;
		this.EAO = _eao;

		// bind buffers
		gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);

		// buffer vertex data
		gl.bufferData(gl.ARRAY_BUFFER,
			new Float32Array(mesh), gl.STATIC_DRAW);

		// create vertex position VAO
		gl.bindVertexArray(this.VAO);
		gl.vertexAttribPointer(
			POSITION_ATTRIB_LOCATION, // attribute location
			3,					      // size of attribute (vec3)
			gl.FLOAT,				  // type of attribute is float
			false,					  // does not need to be normalized
			24,						  // 0 = move forward size * sizeof(type) each iteration to get the next position
			0						  // offset (start at beginnng of buffer)
		);
		gl.enableVertexAttribArray(POSITION_ATTRIB_LOCATION);

		// create normal VAO
		// gl.bindVertexArray(this.VAO);
		gl.vertexAttribPointer(
			NORMAL_ATTRIB_LOCATION,   // attribute location
			3,					      // size of attribute (vec3)
			gl.FLOAT,				  // type of attribute is float
			true,					  // does need to be normalized
			24,						  // 0 = move forward size * sizeof(type) each iteration to get the next position
			12						  // offset (start at beginnng of buffer)
		);
		gl.enableVertexAttribArray(NORMAL_ATTRIB_LOCATION);

		this.initialized = true;
	}

	public draw(gl: WebGL2RenderingContext, renderModeOverride?: number) {
		if (this.hidden) {
			return;
		}
		gl.bindVertexArray(this.VAO);

		if (renderModeOverride == null) {
			gl.drawArrays(this.renderMode, 0, this.verticeCount);
		} else {
			gl.drawArrays(renderModeOverride, 0, this.verticeCount);
		}
	}

	private faceToMesh(face: Face, bsp: BSP) {
		const normal = (bsp.getLump(LumpType.Planes) as PlaneLump).planes[face.planeNum].normal;
		const vertLump = (bsp.getLump(LumpType.Vertexes) as VertexLump);

		const mesh: number[] = [];

		for (let i = face.firstEdge; i < face.firstEdge + face.numEdges; i++) {
			const edgeIndex = (bsp.getLump(LumpType.SurfEdges) as SurfEdgeLump).surfEdges[i];
			
			const reverseEdge = (edgeIndex < 0);

			const vertIndices = (bsp.getLump(LumpType.Edges) as EdgeLump)
				.edges[Math.abs(edgeIndex)].getVertIndices(reverseEdge);

			addRange(mesh, vertLump.vertexes[vertIndices[0]]);
			addRange(mesh, normal);
			addRange(mesh, vertLump.vertexes[vertIndices[1]]);
			addRange(mesh, normal);
			// console.log("Vert 1: " + vertLump.vertexes[vertIndices[0]]);
			// console.log("Vert 2: " + vertLump.vertexes[vertIndices[1]]);
			// console.log("Normal: " + normal);
		}
		return mesh;
	}
}