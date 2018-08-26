import { Face } from "../../BSP/Structs/Face";
import { BSP } from "../../BSP/BSP";
import { Vertex } from "../../Structs/Vertex";
import { LumpType } from "../../BSP/Lumps/LumpType";
import { TexInfoLump } from "../../BSP/Lumps/TexInfoLump";
import { SurfFlags } from "../../BSP/Structs/TexInfo";
import { PlaneLump } from "../../BSP/Lumps/PlaneLump";
import { VertexLump } from "../../BSP/Lumps/VertexLump";
import { TexDataLump } from "../../BSP/Lumps/TexDataLump";
import { vec4, vec3 } from "gl-matrix";
import { SurfEdgeLump } from "../../BSP/Lumps/SurfEdgeLump";
import { EdgeLump } from "../../BSP/Lumps/EdgeLump";
import { addRange } from "../../Utils/AddRange";

export class BSPFace {
	public hidden = false;
	public indices: number[] = [];
	public face: Face;
	public vertexes: Vertex[];

	constructor(face: Face, bsp: BSP) {
		this.face = face;
		this.vertexes = this.getVertices(bsp);
	}

	// calculates the indices for a triangle fan
	public calcTriFanIndices(startIndex: number, visibleOverride = false) {
		if (this.hidden && visibleOverride === false) {
			return [];
		}
		for (let i = 1; i < this.vertexes.length - 1; i++) {
			addRange(this.indices, 
				[startIndex, 
				startIndex + i, 
				startIndex + i + 1]);
		}
	}

	public getMesh(): number[] {
		return BSPFace.verticesToBuffer(this.vertexes);
	}

	private getVertices(bsp): Vertex[] {
		const texInfoLump = bsp.getLump(LumpType.TexInfo) as TexInfoLump;
		const texInfo = texInfoLump.texInfos[this.face.texInfo];
		// filter out transparent meshes temporarily
		if ( (texInfo.flags & SurfFlags.TRANS) === SurfFlags.TRANS) {
			this.hidden = true;
			// return [];
		}
		// filter out trigger brushes
		if ( (texInfo.flags & SurfFlags.TRIGGER) === SurfFlags.TRIGGER) {
			this.hidden = true;
			// return [];
		}
		// filter out sky brushes
		if ( (texInfo.flags & SurfFlags.SKY) === SurfFlags.SKY || 
				(texInfo.flags & SurfFlags.SKY2D) === SurfFlags.SKY2D) {
			this.hidden = true;
			// return [];
		}
		// filter out skip and hint brushes
		if ( (texInfo.flags & SurfFlags.SKIP) === SurfFlags.SKIP || 
				(texInfo.flags & SurfFlags.HINT) === SurfFlags.HINT) {
			this.hidden = true;
			// return [];
		}
		// filter out hitboxes
		if ( (texInfo.flags & SurfFlags.HITBOX) === SurfFlags.HITBOX) {
			this.hidden = true;
			// return [];
		}

		const normal = (bsp.getLump(LumpType.Planes) as PlaneLump).planes[this.face.planeNum].normal;
		const vertLump = (bsp.getLump(LumpType.Vertexes) as VertexLump);
		const texDataLump = bsp.getLump(LumpType.TexData) as TexDataLump;
		
		let color: vec4;
		// texData offset will be -1 for SKIP/CLIP/INVISIBLE textures
		if (texInfo.texData === -1) {
			color = vec4.fromValues(0, 1.0, 1.0, 1.0);
		} else {
			// reflectivity color gives a rough estimate of material color
			// credit to snake_biscuit for discovering this
			const reflectivityColor = texDataLump.texDatas[texInfo.texData].reflectivity;
			color = vec4.fromValues(reflectivityColor[0], reflectivityColor[1], reflectivityColor[2], 1.0);
		}
		
		const vertPositions: vec3[] = [];
		for (let i = this.face.firstEdge; i < this.face.firstEdge + this.face.numEdges; i++) {
			const edgeIndex = (bsp.getLump(LumpType.SurfEdges) as SurfEdgeLump).surfEdges[i];
			
			const reverseEdge = (edgeIndex < 0);

			// gets the vertex indexes and reverses them if they are negative;
			const vertIndices = (bsp.getLump(LumpType.Edges) as EdgeLump)
				.edges[Math.abs(edgeIndex)].getVertIndices(reverseEdge);

			vertPositions.push(vertLump.vertexes[vertIndices[0]]);
			vertPositions.push(vertLump.vertexes[vertIndices[1]]);
		}

		// remove duplicate vertex positions and convert them to Vertexes
		const vertices = Array.from(new Set(vertPositions)).map((vert) => {
			return new Vertex(vert, normal, color);
		});
		
		// combine all vertex information into one number array
		return vertices;
	}
	
	// combines all vertex data into one number array
	private static verticesToBuffer(verts: Vertex[]) {
		const out: number[] = [];
		verts.forEach((vert) => {
			addRange(out, vert.position);
			addRange(out, vert.normal);
			// addRange(out, vert.color);
		});
		return out;
	}
}