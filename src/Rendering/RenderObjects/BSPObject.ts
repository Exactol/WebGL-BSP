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

export class BSPRenderObject implements IRenderable {
	private modelCount!: number;
	private initialized = false;
	private renderMode = WebGL2RenderingContext.POINTS;
	private bsp: BSP;

	private faces: BSPFace[] = [];

	constructor(gl: WebGL2RenderingContext, bsp: BSP) {
		this.bsp = bsp;
		const faceLump = bsp.getLump(LumpType.Faces) as FaceLump;

		let i = 0;
		faceLump.faces.forEach((face) => {
			i ++;
			// console.log("------Creating Face: " + i + "-----");
			this.faces.push(new BSPFace(gl, face, this.bsp));
		});

		this.initialized = true;		
		console.log("BSP Loaded");
	}

	public draw(gl: WebGL2RenderingContext, renderModeOverride?: number) {
		if (!this.initialized) {
			console.log("Cannot render object, not initialized");
			return;
		}
		
		this.faces.forEach((face) => {
			face.draw(gl, renderModeOverride);
		});
	}
}