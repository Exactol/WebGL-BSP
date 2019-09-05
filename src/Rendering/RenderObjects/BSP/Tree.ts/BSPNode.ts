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
import { mat4, vec3 } from "gl-matrix";
import { Vertex } from "../../../../Structs/Vertex";
import { arrayToVec3 } from "../../../../Utils/vec3Utils";

export class BSPNode implements IBSPTree {
	public isNode = true;
	public visibility = Visibility.Visible;

	public plane: Plane;
	public node: Node;

	public front: IBSPTree;
	public back: IBSPTree;
	// public children: IBSPTree[] = [];

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

		// negative numbers are leaves, -(leafs + 1), not nodes
		// build the bsp tree
		if (node.children[0] < 0) {
			this.front = new BSPLeaf(leafLump.leaves[-(node.children[0] + 1)], this.resourceManager, modelMat);
		} else {
			this.front = new BSPNode(nodeLump.nodes[node.children[0]], this.resourceManager, modelMat);
		}

		if (node.children[1] < 0) {
			this.back = new BSPLeaf(leafLump.leaves[-(node.children[1] + 1)], this.resourceManager, modelMat);
		} else {
			this.back = new BSPNode(nodeLump.nodes[node.children[1]], this.resourceManager, modelMat);
		}
	}

	public draw(gl: WebGL2RenderingContext, cameraState: CameraState, vis: number[], renderModeOverride?: number) {
		if (this.visibility === Visibility.Hidden) {
			return;
		}

		// recursively walk bsp tree and render each node/leaf
		switch (BSPNode.classifyPoint(this.plane, cameraState.position)) {
			case TreeClassification.FRONT:
				this.back.draw(gl, cameraState, vis, renderModeOverride);
				this.front.draw(gl, cameraState, vis, renderModeOverride);
				break;
			case TreeClassification.BACK:
				this.front.draw(gl, cameraState, vis, renderModeOverride);
				this.back.draw(gl, cameraState, vis, renderModeOverride);
				break;
			default:
				this.front.draw(gl, cameraState, vis, renderModeOverride);
				this.back.draw(gl, cameraState, vis, renderModeOverride);
				break;
		}
	}

	public static classifyPoint(plane: Plane, camPos: vec3): TreeClassification {
		const planePos = vec3.create();
		vec3.scale(planePos, plane.normal, plane.dist);

		const AB = vec3.create();
		vec3.subtract(AB, camPos, planePos);
		const result = vec3.dot(AB, plane.normal);

		if (result < -0.001) {
			return TreeClassification.BACK;
		}
		if (result > 0.001) {
			return TreeClassification.FRONT;
		}
		return TreeClassification.ONPLANE;
	}

	public getCurrentCluster(cameraState: CameraState) {
		// check that camera is inside cluster by determining if point is within bounding box formed by mins and maxs
		// OpenGL uses Y for up, while Source uses Z

		if ((cameraState.position[0] >= this.node.mins[0] && cameraState.position[0] <= this.node.maxs[0]) &&
			(cameraState.position[1] >= this.node.mins[1] && cameraState.position[1] <= this.node.maxs[1]) &&
			(cameraState.position[2] >= this.node.mins[2] && cameraState.position[2] <= this.node.maxs[2])) {
				const cluster = this.front.getCurrentCluster(cameraState);
				// try to get current cluster from front node, if fails return current cluster of back node
				return cluster ? cluster : this.back.getCurrentCluster(cameraState);
		}

		return null;
	}

	public getClusters(depth: number = 0, clusterNums?: number[], targetDepth?: number) {
		if (targetDepth && depth === targetDepth) {
			const v1 = new Vertex(arrayToVec3(this.node.mins));

			const v2 = new Vertex(vec3.fromValues(this.node.maxs[0], this.node.mins[1], this.node.mins[2]));
			const v3 = new Vertex(vec3.fromValues(this.node.mins[0], this.node.maxs[1], this.node.mins[2]));

			const v4 = new Vertex(vec3.fromValues(this.node.maxs[0], this.node.maxs[1], this.node.mins[2]));
			const v5 = new Vertex(vec3.fromValues(this.node.mins[0], this.node.mins[1], this.node.maxs[2]));

			const v6 = new Vertex(vec3.fromValues(this.node.maxs[0], this.node.mins[1], this.node.maxs[2]));
			const v7 = new Vertex(vec3.fromValues(this.node.mins[0], this.node.maxs[1], this.node.maxs[2]));

			const v8 = new Vertex(arrayToVec3(this.node.maxs));

			// order was found manually
			return [v1, v2, v1, v3, v3, v4, v4, v2,
					v1, v5, v5, v6, v2, v6, v5, v7, v7, v8, v6, v8, v3, v7, v8, v4];
		}

		return this.front.getClusters(depth + 1, clusterNums, targetDepth).concat(this.back.getClusters(depth + 1, clusterNums, targetDepth));
	}
}

export enum TreeClassification {
	FRONT,
	BACK,
	ONPLANE
}