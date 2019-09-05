import { Vertex } from "../../../Structs/Vertex";
import { BSPFace } from "./BSPFace";
import { IRenderable, Visibility } from "../IRenderable";
import { BSPResourceManager } from "../BSPResourceManager";
import { Model } from "../../../BSP/Structs/Model";
import { BSP } from "../../../BSP/BSP";
import { LumpType } from "../../../BSP/Lumps/LumpType";
import { FaceLump } from "../../../BSP/Lumps/FaceLump";
import { addRange } from "../../../Utils/AddRange";
import { BSPNode } from "./Tree.ts/BSPNode";
import { NodeLump } from "../../../BSP/Lumps/NodeLump";
import { vec3, vec4, mat4, glMatrix } from "gl-matrix";
import { CameraState } from "../../Camera/CameraState";
import { IBSPTree } from "./Tree.ts/IBSPTree";
import { Node } from "../../../BSP/Structs/Node";
import { Plane } from "../../../BSP/Structs/Plane";
import { Leaf } from "../../../BSP/Structs/Leaf";
import { VisibilityLump } from "../../../BSP/Lumps/VisibilityLump";

export class BSPModel implements IRenderable {
	public model: Model;
	public resourceManager: BSPResourceManager;

	public headNode!: BSPNode;
	public visibility: Visibility = Visibility.Visible;

	private modelMatrix!: mat4;


	constructor(gl: WebGL2RenderingContext, resourceManager: BSPResourceManager, model: Model) {
		// this.resourceManager = new BSPResourceManager(gl, bsp);
		this.resourceManager = resourceManager;
		this.model = model;

		// don't need to calculate the tree if there is no faces
		if (model.numFaces === 0) {
			console.log("Empty Node");
			this.visibility = Visibility.Hidden;
			return;
		}
		this.modelMatrix = mat4.create(); // TODO: parse this from the entity lump
		// mat4.fromTranslation(this.modelMatrix, model.origin);
		// compensate for fact that source uses Z as up axis, while openGL uses Y.
		// mat4.rotateX(this.modelMatrix, this.modelMatrix, glMatrix.toRadian(-90));

		// create bsp tree
		const nodeLump = this.resourceManager.getBSP().readLump(LumpType.Nodes) as NodeLump;
		this.headNode = new BSPNode(nodeLump.nodes[model.headNode], this.resourceManager, this.modelMatrix);
	}


	public draw(gl: WebGL2RenderingContext, cameraState: CameraState, vis: number[], renderModeOverride?: number) {
		if (this.visibility === Visibility.Hidden) {
			return;
		}
		// const currentCluster = this.getCurrentCluster(cameraState);

		// const visibilityLump = this.resourceManager.getBSP().readLump(LumpType.Visibility) as VisibilityLump;
		// const vis = visibilityLump.decompressPVS(currentCluster);

		// console.log(currentCluster);
		// TODO: upload uniform world matrix here?
		this.headNode.draw(gl, cameraState, vis, renderModeOverride);
	}

	public getCurrentCluster(cameraState: CameraState) {
		if (this.headNode) {
			return this.headNode.getCurrentCluster(cameraState);
		}

		return null;
	}

	public getClusters(clusterNums?: number[], targetDepth?: number) {
		if (this.headNode) {
			return this.headNode.getClusters(0, clusterNums, targetDepth);
		}

		return [];
	}
}