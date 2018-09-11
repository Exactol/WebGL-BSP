import { IBSPTree } from "./IBSPTree";
import { Plane } from "../../../../BSP/Structs/Plane";
import { BSPFace } from "../BSPFace";
import { Node } from "../../../../BSP/Structs/Node";
import { BSP } from "../../../../BSP/BSP";
import { LumpType } from "../../../../BSP/Lumps/LumpType";
import { NodeLump } from "../../../../BSP/Lumps/NodeLump";
import { PlaneLump } from "../../../../BSP/Lumps/PlaneLump";
import { LeafLump } from "../../../../BSP/Lumps/LeafLump";
import { BSPLeaf } from "./BSPLeaf";
import { Visibility } from "../../IRenderable";
import { BSPResourceManager } from "../../BSPResourceManager";
import { CameraState } from "../../../Camera/CameraState";
import { mat4 } from "gl-matrix";

export class BSPNode implements IBSPTree {
	public isNode = true;
	public visibility = Visibility.Visible;

	public plane: Plane;
	public node: Node;
	public children: IBSPTree[] = [];
	
	public resourceManager: BSPResourceManager;

	constructor(node: Node, resourceManager: BSPResourceManager, modelMat: mat4) {
		this.node = node;
		this.resourceManager = resourceManager;
		const bsp = this.resourceManager.getBSP();

		const planeLump = bsp.readLump(LumpType.Planes) as PlaneLump;
		this.plane = planeLump.planes[this.node.planeNum];

		// determine children
		const leafLump = bsp.readLump(LumpType.Leafs) as LeafLump;
		const nodeLump = bsp.readLump(LumpType.Nodes) as NodeLump;

		// negative numbers are -(leafs + 1), not nodes
		// recursively will fill the bsp tree
		if (node.children[0] < 0) {
			this.children[0] = new BSPLeaf(leafLump.leaves[-(node.children[0] + 1)], this.resourceManager, modelMat);
		} else {
			this.children[0] = new BSPNode(nodeLump.nodes[node.children[0]], this.resourceManager, modelMat);
		}
		if (node.children[1] < 0) {
			this.children[1] = new BSPLeaf(leafLump.leaves[-(node.children[1] + 1)], this.resourceManager, modelMat);
		} else {
			this.children[1] = new BSPNode(nodeLump.nodes[node.children[1]], this.resourceManager, modelMat);
		}
	}

	public draw(gl: WebGL2RenderingContext, cameraState?: CameraState, renderModeOverride?: number) {
		if (this.visibility === Visibility.Hidden) {
			return;
		}
		
		// recursively walk bsp tree and render each node/leaf
		this.children[0].draw(gl, cameraState, renderModeOverride);
		this.children[1].draw(gl, cameraState, renderModeOverride);
	}

	// public toString(indent = ""): string {

	// }
}