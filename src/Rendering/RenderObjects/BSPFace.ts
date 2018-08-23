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