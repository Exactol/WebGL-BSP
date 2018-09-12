import { BSPNode } from "./BSPNode";
import { BSPResourceManager } from "../../BSPResourceManager";
import { mat4 } from "gl-matrix";
import { Node } from "../../../../BSP/Structs/Node";

export class BSPTree extends BSPNode {
	public headNode: Node;

	constructor(node: Node, resourceManager: BSPResourceManager, modelMat: mat4) {
		super(node, resourceManager, modelMat);
		this.headNode = node;
	}
}