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

export class BSPModel implements IRenderable {
	public model: Model;
	public resourceManager: BSPResourceManager;

	public tree!: BSPNode;
	public visibility: Visibility = Visibility.Visible;

	private modelMatrix!: mat4;


	constructor(gl: WebGL2RenderingContext, bsp: BSP, model: Model) {
		this.resourceManager = new BSPResourceManager(gl, bsp);
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

		// calculate bsp tree
		const nodeLump = bsp.readLump(LumpType.Nodes) as NodeLump;
		this.tree = new BSPNode(nodeLump.nodes[model.headNode], this.resourceManager, this.modelMatrix);
	}

	public draw(gl: WebGL2RenderingContext, cameraState: CameraState, renderModeOverride?: number) {
		if (this.visibility === Visibility.Hidden) {
			return;
		}
		// recursively walk the bsp tree and draw at every leaf
		this.tree.draw(gl, cameraState, renderModeOverride);
	}
}