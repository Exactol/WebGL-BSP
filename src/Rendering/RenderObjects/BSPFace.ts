import { Face } from "../../BSP/Structs/Face";
import { BSP } from "../../BSP/BSP";
import { Vertex } from "../../Structs/Vertex";
import { LumpType } from "../../BSP/Lumps/LumpType";
import { TexInfoLump } from "../../BSP/Lumps/TexInfoLump";
import { PlaneLump } from "../../BSP/Lumps/PlaneLump";
import { VertexLump } from "../../BSP/Lumps/VertexLump";
import { TexDataLump } from "../../BSP/Lumps/TexDataLump";
import { vec4, vec3 } from "gl-matrix";
import { SurfEdgeLump } from "../../BSP/Lumps/SurfEdgeLump";
import { EdgeLump } from "../../BSP/Lumps/EdgeLump";
import { addRange } from "../../Utils/AddRange";
import { SurfFlags } from "../../BSP/Structs/Enums";
import { DispVertLump } from "../../BSP/Lumps/DispVertLump";
import { DispTrisLump } from "../../BSP/Lumps/DispTrisLump";
import { DispInfo } from "../../BSP/Structs/DispInfo";
import { DispInfoLump } from "../../BSP/Lumps/DispInfoLump";
import { Visibility } from "./IRenderable";

export class BSPFace {
	public visibility: Visibility = Visibility.Visible;
	public face: Face;
	public indices: number[] = [];
	public vertices: Vertex[];
	public dispInfo: DispInfo | null = null;

	constructor(face: Face, bsp: BSP) {
		this.face = face;
		this.vertices = this.getVertices(bsp);
	}

	public calcIndices(startIndex: number) {
		if (this.dispInfo != null) {
			this.calcDispIndices(startIndex);
		} else {
			this.calcFaceIndices(startIndex);
		}
	}

	// calculates the indices for a triangle fan
	private calcFaceIndices(startIndex: number) {
		for (let i = 1; i < this.vertices.length - 1; i++) {
			addRange(this.indices, 
				[startIndex, 
				startIndex + i, 
				startIndex + i + 1]);
		}
	}

	private calcDispIndices(startIndex: number) {
		if (this.dispInfo == null) {
			console.log("Disp info was null!");
			console.log(this);
			return [];
		}
		const rowSize = this.dispInfo.numRows();

		// skip last row, there are no verts above to create the pattern
		for (let lineNum = 0; lineNum < (rowSize - 1); lineNum++) {
			const lineOffset = lineNum * rowSize;
			// const nextRowOffset = (lineNum + 1) * rowSize;

			for (let blockNum = 0; blockNum < (2 ** (this.dispInfo.power - 1)); blockNum++) {
				// index offset depending on what block it's in
				const blockOffset = lineOffset + (2 * blockNum);

				// even rows create |/|\| pattern
				if (lineNum % 2 === 0) {
					// --------------------
					// create |/| section
					// --------------------
					this.indices.push((blockOffset) + startIndex);
					this.indices.push((blockOffset + rowSize) + startIndex);
					this.indices.push((blockOffset + rowSize + 1) + startIndex);
					
					this.indices.push((blockOffset) + startIndex);
					this.indices.push((blockOffset + rowSize + 1) + startIndex);
					this.indices.push((blockOffset + 1) + startIndex);

					// --------------------
					// create |\| section
					// --------------------
					this.indices.push((blockOffset + 1) + startIndex);
					this.indices.push((blockOffset + rowSize + 1) + startIndex);
					this.indices.push((blockOffset + 2) + startIndex);

					this.indices.push((blockOffset + 2) + startIndex);
					this.indices.push((blockOffset + rowSize + 1) + startIndex);
					this.indices.push((blockOffset + rowSize + 2) + startIndex);
				} else {
					// odd rows create |\|/| pattern
					
					// --------------------
					// create |\| section
					// --------------------
					this.indices.push((blockOffset + 1) + startIndex);
					this.indices.push((blockOffset) + startIndex);
					this.indices.push((blockOffset + rowSize) + startIndex);
					
					this.indices.push((blockOffset + 1) + startIndex);
					this.indices.push((blockOffset + rowSize) + startIndex);
					this.indices.push((blockOffset + rowSize + 1) + startIndex);

					// --------------------
					// create |/| section
					// --------------------
					this.indices.push((blockOffset + 1) + startIndex);
					this.indices.push((blockOffset + rowSize + 1) + startIndex);
					this.indices.push((blockOffset + rowSize + 2) + startIndex);

					this.indices.push((blockOffset + 1) + startIndex);
					this.indices.push((blockOffset + rowSize + 2) + startIndex);
					this.indices.push((blockOffset + 2) + startIndex);
				}
			}
		}
		// console.log(this.indices);
	}

	public getMesh(): number[] {
		return BSPFace.verticesToBuffer(this.vertices);
	}

	private getVertices(bsp): Vertex[] {
		const texInfoLump = bsp.readLump(LumpType.TexInfo) as TexInfoLump;
		const texDataLump = bsp.readLump(LumpType.TexData) as TexDataLump;

		const texInfo = texInfoLump.texInfos[this.face.texInfo];
		// filter out transparent meshes temporarily
		if ( (texInfo.flags & SurfFlags.TRANS) === SurfFlags.TRANS) {
			this.visibility = Visibility.Hidden;
		}
		// filter out trigger brushes
		if ( (texInfo.flags & SurfFlags.TRIGGER) === SurfFlags.TRIGGER) {
			this.visibility = Visibility.Hidden;
		}
		// filter out sky brushes
		if ( (texInfo.flags & SurfFlags.SKY) === SurfFlags.SKY || 
				(texInfo.flags & SurfFlags.SKY2D) === SurfFlags.SKY2D) {
			this.visibility = Visibility.Hidden;
		}
		// filter out skip and hint brushes
		if ( (texInfo.flags & SurfFlags.SKIP) === SurfFlags.SKIP || 
				(texInfo.flags & SurfFlags.HINT) === SurfFlags.HINT) {
			this.visibility = Visibility.Hidden;
		}
		// filter out hitboxes
		if ( (texInfo.flags & SurfFlags.HITBOX) === SurfFlags.HITBOX) {
			this.visibility = Visibility.Hidden;
		}
		
		let baseColor: vec4;
		// texData offset will be -1 for SKIP/CLIP/INVISIBLE textures
		if (texInfo.texData === -1) {
			baseColor = vec4.fromValues(0, 1.0, 1.0, 1.0);
		} else {
			// reflectivity color gives a rough estimate of material color
			// credit to snake_biscuit for discovering this
			const reflectivityColor = texDataLump.texDatas[texInfo.texData].reflectivity;
			baseColor = vec4.fromValues(reflectivityColor[0], reflectivityColor[1], reflectivityColor[2], 1.0);
		}

		// if face is not displacement, it's dispInfo will be -1;
		if (this.face.dispInfo === -1) {
			return this.getFaceVertexes(bsp, baseColor);
		} else {
			return this.getDispVertexes(bsp, baseColor);
		}
	}
	
	private getDispVertexes(bsp: BSP, baseColor: vec4): Vertex[] {
		const dispVertsLump = bsp.readLump(LumpType.DispVerts) as DispVertLump;
		const dispTrisLump = bsp.readLump(LumpType.DispTris) as DispTrisLump;
		const dispInfoLump = bsp.readLump(LumpType.DispInfo) as DispInfoLump;

		this.dispInfo = dispInfoLump.dispInfos[this.face.dispInfo];
		const rowSize = this.dispInfo.numRows();

		// get the vertices of the face
		let faceVerts = this.getFaceVertexes(bsp, baseColor, true);

		// "rotate" the vertices so that the first vertex matches the dispInfo start position 
		for (let j = 0; j < faceVerts.length; j++) {
			const vert = faceVerts[j];
			
			if (vec3.equals(vert.position, this.dispInfo.startPosition)) {
				// shift the verts so the start position is the first vertex
				const verts = faceVerts.slice(j);
				const lastVerts = faceVerts.slice(0, j);
				addRange(verts, lastVerts);
				
				faceVerts = verts;
				break;
			}
		}
		
		// ------ Disp Reading ----------
		
		// create a scaffold to generate vertices
		
		// generate 2 columns from linear interpolation between the 4 corner vertices
		// V2				V3
		// ^				^
		// C1				C2
		// ^				^
		// C1				C2
		// ^				^
		// C1				C2
		// ^				^
		// V1				V4
		
		// after interpolating between matching vertices in each column
		// x -> x -> x -> x -> x
		// x -> x -> x -> x -> x
		// x -> x -> x -> x -> x
		// x -> x -> x -> x -> x
		// x -> x -> x -> x -> x
		
		
		// displacements must have 4 vertexes
		if (faceVerts.length !== 4) {
			console.log("Invalid displacement");
			return [];
		}
		const dispVerts: Vertex[] = [];

		const edgeCol1: Vertex[] = [];
		const edgeCol2: Vertex[] = [];
		const vert1 = faceVerts[0];
		const vert2 = faceVerts[1];
		const vert3 = faceVerts[2];
		const vert4 = faceVerts[3];
		
		// linearly interpolate vertices for first row
		for (let i = 0; i < rowSize; i++) {
			const vertPos = vec3.create();
			vec3.lerp(vertPos, vert1.position, vert2.position, i / (rowSize - 1));
			edgeCol1.push(new Vertex(vertPos, vert1.normal, vec4.fromValues(1.0, 0, 0, 1)));
		}

		// linearly interpolate vertices for second row
		for (let i = 0; i < rowSize; i++) {
			const vertPos = vec3.create();
			// interpolate in opposite direction, otherwise vertices are placed in wrong order
			vec3.lerp(vertPos, vert4.position, vert3.position, i / (rowSize - 1));
			edgeCol2.push(new Vertex(vertPos, vert1.normal, vec4.fromValues(1.0, 0, 0, 1)));
		}

		for (let i = 0; i < edgeCol1.length; i++) {
			const helperVert1: Vertex = edgeCol1[i];
			const helperVert2: Vertex = edgeCol2[i];
			
			// linearly interpolate vertices
			for (let j = 0; j < rowSize; j++) {
				const vertPos = vec3.create();
				vec3.lerp(vertPos, helperVert1.position, helperVert2.position, j / (rowSize - 1));
				dispVerts.push(new Vertex(vertPos, vert1.normal, vert1.color)); // vec4.fromValues(1.0, 0, 0, 1)));
			}
		}

		// apply vertex offsets
		for (let i = 0; i < this.dispInfo.numVerts(); i++) {
			const vert = dispVertsLump.dispVerts[i + this.dispInfo.dispVertStart];
			vec3.scaleAndAdd(dispVerts[i].position, dispVerts[i].position, vert.vec, vert.dist);
		}
		return dispVerts;
		// return BSPFace.divideFace(faceVerts, rowSize);
	}

	private getFaceVertexes(bsp: BSP, baseColor: vec4, uniqueVertexes = true): Vertex[] {
		const normal = (bsp.readLump(LumpType.Planes) as PlaneLump).planes[this.face.planeNum].normal;
		const vertLump = bsp.readLump(LumpType.Vertexes) as VertexLump;

		const vertPositions: vec3[] = [];
		for (let i = this.face.firstEdge; i < this.face.firstEdge + this.face.numEdges; i++) {
			const edgeIndex = (bsp.readLump(LumpType.SurfEdges) as SurfEdgeLump).surfEdges[i];
			
			const reverseEdge = (edgeIndex < 0);

			// gets the vertex indexes and reverses them if they are negative;
			const vertIndices = (bsp.readLump(LumpType.Edges) as EdgeLump)
				.edges[Math.abs(edgeIndex)].getVertIndices(reverseEdge);

			vertPositions.push(vertLump.vertexes[vertIndices[0]]);
			vertPositions.push(vertLump.vertexes[vertIndices[1]]);
		}

		let vertexes: Vertex[] = [];
		if (uniqueVertexes) {
			// remove duplicate vertex positions and convert them to Vertexes
			vertexes = Array.from(new Set(vertPositions)).map((vert) => {
				return new Vertex(vert, normal, baseColor);
			});	
		} else {
			vertexes = vertPositions.map((vert) => {
				return new Vertex(vert, normal, baseColor);
			});
		}

		return vertexes;
	}

	// combines all vertex data into one number array
	private static verticesToBuffer(verts: Vertex[]) {
		const out: number[] = [];
		verts.forEach((vert) => {
			addRange(out, vert.position);
			addRange(out, vert.normal);
			addRange(out, vert.color);
		});
		return out;
	}
}

