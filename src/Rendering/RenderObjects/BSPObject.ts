import { RenderObject } from "./RenderObject";
import { Face } from "../../BSP/Structs/Face";
import { BSP } from "../../BSP/BSP";
import { IRenderable } from "./IRenderable";
import { LumpType } from "../../BSP/Lumps/LumpType";
import { VertexLump } from "../../BSP/Lumps/VertexLump";
import { POSITION_ATTRIB_LOCATION, NORMAL_ATTRIB_LOCATION } from "./UniformLocs";
import { FaceLump } from "../../BSP/Lumps/FaceLump";
import { ModelLump } from "../../BSP/Lumps/ModelLump";
import { EdgeLump } from "../../BSP/Lumps/EdgeLump";
import { SurfEdgeLump } from "../../BSP/Lumps/SurfEdgeLump";
import { vec3 } from "gl-matrix";
import { PlaneLump } from "../../BSP/Lumps/PlaneLump";
import { Edge } from "../../BSP/Structs/Edge";
import { addRange } from "../../Utils/AddRange";
import { BSPFace } from "./BSPFace";
import { zip } from "../../Utils/ZipArray";
import { Vertex } from "../../Structs/Vertex";

export class BSPRenderObject implements IRenderable {
	public hidden = false;
	public VAO!: WebGLVertexArrayObject;
	public VBO!: WebGLBuffer;
	public EAO!: WebGLBuffer; // index buffer
	private modelCount!: number;
	private initialized = false;
	private renderMode = WebGL2RenderingContext.POINTS;
	private bsp: BSP;
	private verticeCount;

	// private BSPfaces: BSPFace[] = [];
	private vertices: number[];

	constructor(gl: WebGL2RenderingContext, bsp: BSP) {
		this.bsp = bsp;
		const faceLump = bsp.getLump(LumpType.Faces) as FaceLump;

		this.vertices = [];
		faceLump.faces.forEach((face) => {
			addRange(this.vertices, this.faceToMesh(face));
		});
		this.verticeCount = this.vertices.length / 6;
			
		// create buffers
		const _vbo = gl.createBuffer();
		const _vao = gl.createVertexArray();
		const _eao = gl.createBuffer();

		// check buffer creation was successful
		if (_vbo == null) {
			console.log("Failed to generate VBO");
			return;
		}
		
		if (_vao == null) {
			console.log("Failed to generate VAO");
			return;
		}
		
		if (_eao == null) {
			console.log("Failed to generate EAO");
			return;
		}
		this.VBO = _vbo;
		this.VAO = _vao;
		this.EAO = _eao;

		// bind buffers
		gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);

		// buffer vertex data
		gl.bufferData(gl.ARRAY_BUFFER,
			new Float32Array(this.vertices), gl.STATIC_DRAW);

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
	
		console.log("BSP Loaded");
	}

	public draw(gl: WebGL2RenderingContext, renderModeOverride?: number) {
		if (!this.initialized) {
			console.log("Cannot render object, not initialized");
			return;
		}
		if (this.hidden) {
			return;
		}

		gl.bindVertexArray(this.VAO);

		if (renderModeOverride == null) {
			gl.drawArrays(this.renderMode, 0, this.verticeCount);
		} else {
			gl.drawArrays(renderModeOverride, 0, this.verticeCount);
		}
		
		// this.faces.forEach((face) => {
		// 	face.draw(gl, renderModeOverride);
		// });
	}

	private faceToMesh(face: Face) {
		const normal = (this.bsp.getLump(LumpType.Planes) as PlaneLump).planes[face.planeNum].normal;
		const vertLump = (this.bsp.getLump(LumpType.Vertexes) as VertexLump);

		const vertPositions: vec3[] = [];

		for (let i = face.firstEdge; i < face.firstEdge + face.numEdges; i++) {
			const edgeIndex = (this.bsp.getLump(LumpType.SurfEdges) as SurfEdgeLump).surfEdges[i];
			
			const reverseEdge = (edgeIndex < 0);

			// gets the vertex indexes and reverses them if they are negative;
			const vertIndices = (this.bsp.getLump(LumpType.Edges) as EdgeLump)
				.edges[Math.abs(edgeIndex)].getVertIndices(reverseEdge);

			// remove duplicate vertices from edge
			// if (i === face.firstEdge) {
				vertPositions.push(vertLump.vertexes[vertIndices[0]]);
				vertPositions.push(vertLump.vertexes[vertIndices[1]]);
				// vertPositions.push(new Vertex(vertLump.vertexes[vertIndices[1]], normal));
			// 	// addRange(vertLoop, vertLump.vertexes[vertIndices[0]]);
			// 	// addRange(vertLoop, vertLump.vertexes[vertIndices[1]]);
			// } else {
			// 	vertLoop.push(new Vertex(vertLump.vertexes[vertIndices[1]], normal));
			// // 	// addRange(vertLoop, vertLump.vertexes[vertIndices[1]]);
			// }
		}

		// remove duplicate vertice positions and convert them to Vertexes
		const vertices = Array.from(new Set(vertPositions)).map((vert) => {
			return new Vertex(vert, normal);
		});

		const mesh: number[] = [];
		addRange(mesh, this.loopToTriFan(vertices));
		// console.log("mesh: " + mesh);
		
		return mesh;
	}

	// a modified loop to triangle fan from snake_biscuit's bsp tool
	// manually triangulates a face's vertex loop
	private loopToTriFan(verts: Vertex[]): number[] {
		const out_vert = verts.slice(0, 2);
		const vertexes = verts.slice(2);
		vertexes.forEach((vert) => {
			addRange(out_vert, [out_vert[0], out_vert[out_vert.length - 1], vert]);
		});
		out_vert.push(out_vert[0]);

		const out: number[] = [];
		out_vert.forEach((vert) => {
			addRange(out, vert.position);
			addRange(out, vert.normal);
		});
		return out;
	}
}