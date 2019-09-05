import { IBSPTree } from "./IBSPTree";
import { Leaf } from "../../../../BSP/Structs/Leaf";
import { BSP } from "../../../../BSP/BSP";
import { Visibility } from "../../IRenderable";
import { BSPResourceManager } from "../../BSPResourceManager";
import { Vertex } from "../../../../Structs/Vertex";
import { BSPFace } from "../BSPFace";
import { addRange } from "../../../../Utils/AddRange";
import { LumpType } from "../../../../BSP/Lumps/LumpType";
import { FaceLump } from "../../../../BSP/Lumps/FaceLump";
import { LeafFaceLump } from "../../../../BSP/Lumps/LeafFaceLump";
import {
	POSITION_ATTRIB_LOCATION, NORMAL_ATTRIB_LOCATION, FALLBACK_COLOR_ATTRIB_LOCATION,
	TEXTURE_LOADED_ATTRIB_LOCATION, TEXCOORD_ATTRIB_LOCATION, TEXINDEX_ATTRIB_LOCATION
} from "../../../Shaders/LayoutLocations";
import { CameraState } from "../../../Camera/CameraState";
import { VertShader, FragShader } from "../../../Shaders/ShaderSource";
import { mat4, vec3, vec4 } from "gl-matrix";
import { VisibilityLump } from "../../../../BSP/Lumps/VisibilityLump";
import { LeafLump } from "../../../../BSP/Lumps/LeafLump";
import { arrayToVec3 } from "../../../../Utils/vec3Utils";

export class BSPLeaf implements IBSPTree {
	public isNode = false;
	public visibility = Visibility.Visible;
	public leaf: Leaf;

	public resourceManager: BSPResourceManager;
	private shaderIndex: number = 0;

	private indexCount: number = 0;
	private indices: number[] = [];
	private vertices: Vertex[] = [];
	private faces: BSPFace[] = [];

	public VAO!: WebGLVertexArrayObject;
	public VBO!: WebGLBuffer;
	public EAO!: WebGLBuffer; // index buffer
	private renderMode = WebGL2RenderingContext.TRIANGLES;

	private modelMat: mat4;
	private initialized = false;

	constructor(leaf: Leaf, resourceManager: BSPResourceManager, modelMat: mat4) {
		this.leaf = leaf;
		this.modelMat = modelMat;

		this.resourceManager = resourceManager;

		// TODO: doesnt really seem to do anything?
		this.load();
	}

	private async load() {
		this.shaderIndex = this.resourceManager.createShaderProgram();
		this.resourceManager.addShaders(this.shaderIndex, [VertShader, FragShader]);

		// calculate the vertices and indices of the leaf
		const bsp = this.resourceManager.getBSP();
		const faceLump = bsp.readLump(LumpType.Faces) as FaceLump;
		const leafFaceLump = bsp.readLump(LumpType.LeafFaces) as LeafFaceLump;

		let currentIndex = 0;
		for (let i = this.leaf.firstLeafFace; i < this.leaf.numLeafFaces + this.leaf.firstLeafFace; i++) {
			const leafFace = leafFaceLump.leafFaces[i];
			const face = faceLump.faces[leafFace];
			const bspFace = new BSPFace(face, bsp, this.resourceManager);
			this.faces.push(bspFace);

			// add vertices to mesh
			bspFace.calcIndices(currentIndex);

			addRange(this.vertices, bspFace.vertices);
			// dont add hidden faces to the indices
			if (bspFace.visibility === Visibility.Visible) {
				addRange(this.indices, bspFace.indices);
			}

			if (bspFace.dispInfo != null) {
				// highest index of displacement will be it's second to last index
				currentIndex = bspFace.indices[bspFace.indices.length - 2] + 1;
			} else {
				// highest index of face will be it's last index
				currentIndex = bspFace.indices[bspFace.indices.length - 1] + 1;
			}
		}

		this.indexCount = this.indices.length;
		// if leaf is empty we dont need to render it
		if (this.indexCount < 1) {
			return;
		}
		this.bufferData();
		this.initialized = true;
	}

	public draw(gl: WebGL2RenderingContext, cameraState: CameraState, vis: number[], renderModeOverride?: number) {
		if (this.visibility === Visibility.Hidden || !this.initialized) {
			return;
		}

		// not visible from current cluster
		if (this.leaf.cluster !== -1 && vis[this.leaf.cluster] !== 1) {
			return;
		}

		// enable this leaf's shader
		gl.useProgram(this.resourceManager.getShaderProgram(this.shaderIndex));

		const uniformLocations = this.resourceManager.getUniformLocations(this.shaderIndex);

		// upload uniforms
		gl.uniformMatrix4fv(uniformLocations.uModelMatLocation,
			false,
			cameraState.modelMatrix);

		gl.uniformMatrix4fv(uniformLocations.uViewMatLocation,
			false,
			cameraState.viewMatrix);

		gl.uniformMatrix4fv(uniformLocations.uProjectionMatrixLocation,
			false,
			cameraState.projectionMatrix);

		gl.bindVertexArray(this.VAO);
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.EAO);

		if (renderModeOverride) {
			gl.drawElements(renderModeOverride, this.indexCount, gl.UNSIGNED_INT, 0);
		} else {
			gl.drawElements(this.renderMode, this.indexCount, gl.UNSIGNED_INT, 0);
		}
	}

	public getCurrentCluster(cameraState: CameraState) {
		// check that camera is inside cluster by determining if point is within bounding box formed by mins and maxs
		if ((cameraState.position[0] >= this.leaf.mins[0] && cameraState.position[0] <= this.leaf.maxs[0]) &&
			(cameraState.position[1] >= this.leaf.mins[1] && cameraState.position[1] <= this.leaf.maxs[1]) &&
			(cameraState.position[2] >= this.leaf.mins[2] && cameraState.position[2] <= this.leaf.maxs[2])) {
				return this.leaf.cluster;
		}

		return null;
	}

	// uploads leaf data to gpu
	private bufferData() {
		const gl = this.resourceManager.getGLContext();

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

		const mesh = BSPFace.verticesToMesh(this.vertices);
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
			56,						  // 0 = move forward size * sizeof(type) each iteration to get the next position
			0						  // offset (start at beginnng of buffer)
		);
		gl.enableVertexAttribArray(POSITION_ATTRIB_LOCATION);

		// define normal VAO
		gl.vertexAttribPointer(
			NORMAL_ATTRIB_LOCATION,   // attribute location
			3,					      // size of attribute (vec3)
			gl.FLOAT,				  // type of attribute is float
			true,					  // does need to be normalized
			56,						  // 0 = move forward size * sizeof(type) each iteration to get the next position
			12						  // offset (start at beginnng of buffer)
		);
		gl.enableVertexAttribArray(NORMAL_ATTRIB_LOCATION);

		// enable fallbackColor
		gl.vertexAttribPointer(
			FALLBACK_COLOR_ATTRIB_LOCATION,   // attribute location
			4,					      // size of attribute (vec4)
			gl.FLOAT,				  // type of attribute is float
			false,					  // does need to be normalized
			56,						  // 0 = move forward size * sizeof(type) each iteration to get the next position
			24						  // offset (start at beginnng of buffer)
		);
		gl.enableVertexAttribArray(FALLBACK_COLOR_ATTRIB_LOCATION);

		// enable textureLoaded
		gl.vertexAttribPointer(
			TEXTURE_LOADED_ATTRIB_LOCATION,   // attribute location
			1,					      // size of attribute (int)
			gl.FLOAT,				  // type of attribute is int
			false,					  // does need to be normalized
			56,						  // 0 = move forward size * sizeof(type) each iteration to get the next position
			40						  // offset (start at beginnng of buffer)
		);
		gl.enableVertexAttribArray(TEXTURE_LOADED_ATTRIB_LOCATION);

		// define texcoord VAO
		gl.vertexAttribPointer(
			TEXCOORD_ATTRIB_LOCATION,   // attribute location
			2,					      // size of attribute (vec2)
			gl.FLOAT,				  // type of attribute is float
			false,					  // does not need to be normalized
			56,						  // 0 = move forward size * sizeof(type) each iteration to get the next position
			44						  // offset (start at beginnng of buffer)
		);
		gl.enableVertexAttribArray(TEXCOORD_ATTRIB_LOCATION);

		// define texIndex VAO
		gl.vertexAttribPointer(
			TEXINDEX_ATTRIB_LOCATION, // attribute location
			1,					      // size of attribute int32
			gl.FLOAT,				  	  // type of attribute is ints
			false,					  // does not need to be normalized
			56,						  // 0 = move forward size * sizeof(type) each iteration to get the next position
			52						  // offset (start at beginnng of buffer)
		);
		gl.enableVertexAttribArray(TEXINDEX_ATTRIB_LOCATION);

		// create EAO
		gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, this.EAO);
		gl.bufferData(gl.ELEMENT_ARRAY_BUFFER,
			new Uint32Array(this.indices),
			gl.STATIC_DRAW
		);
	}

	public getClusters(depth: number, clusterNums?: number[], targetDepth?: number) {
		if (clusterNums && !clusterNums.includes(this.leaf.cluster)) {
			return [];
		}

		if (targetDepth && depth !== targetDepth) {
			return [];
		}

		console.log(this.leaf.cluster);
		console.log(this.leaf.mins);
		console.log(this.leaf.maxs);
		// create bounding box cube by interpolating values from min and max
		const v1 = new Vertex(arrayToVec3(this.leaf.mins));

		const v2 = new Vertex(vec3.fromValues(this.leaf.maxs[0], this.leaf.mins[1], this.leaf.mins[2]));
		const v3 = new Vertex(vec3.fromValues(this.leaf.mins[0], this.leaf.maxs[1], this.leaf.mins[2]));

		const v4 = new Vertex(vec3.fromValues(this.leaf.maxs[0], this.leaf.maxs[1], this.leaf.mins[2]));
		const v5 = new Vertex(vec3.fromValues(this.leaf.mins[0], this.leaf.mins[1], this.leaf.maxs[2]));

		const v6 = new Vertex(vec3.fromValues(this.leaf.maxs[0], this.leaf.mins[1], this.leaf.maxs[2]));
		const v7 = new Vertex(vec3.fromValues(this.leaf.mins[0], this.leaf.maxs[1], this.leaf.maxs[2]));

		const v8 = new Vertex(arrayToVec3(this.leaf.maxs));

		// order was found manually
		return [v1, v2, v1, v3, v3, v4, v4, v2,
				v1, v5, v5, v6, v2, v6, v5, v7, v7, v8, v6, v8, v3, v7, v8, v4];
	}

	// public toString(indent = ""): string {

	// }
}