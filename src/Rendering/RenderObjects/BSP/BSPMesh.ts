import { BSP } from "../../../BSP/BSP";
import { IRenderable, Visibility } from "../IRenderable";
import { LumpType } from "../../../BSP/Lumps/LumpType";
import { POSITION_ATTRIB_LOCATION, NORMAL_ATTRIB_LOCATION, TEXCOORD_ATTRIB_LOCATION, 
	TEXINDEX_ATTRIB_LOCATION, 
	FALLBACK_COLOR_ATTRIB_LOCATION,
	TEXTURE_LOADED_ATTRIB_LOCATION} from "../../Shaders/LayoutLocations";
import { FaceLump } from "../../../BSP/Lumps/FaceLump";
import { addRange } from "../../../Utils/AddRange";
import { BSPFace } from "./BSPFace";
import { Texture } from "../../Textures/Texture";
import { UniformLocations } from "../../Shaders/UniformLocations";
import { TextureDictionary } from "../../Textures/TextureDictionary";
import { BSPResourceManager } from "../BSPResourceManager";
import { ModelLump } from "../../../BSP/Lumps/ModelLump";
import { BSPModel } from "./BSPModel";
import { CameraState } from "../../Camera/CameraState";

export class BSPMesh implements IRenderable {
	public visibility = Visibility.Visible;

	private initialized = false;
	private renderMode = WebGL2RenderingContext.TRIANGLES;

	private models: BSPModel[] = [];

	constructor(gl: WebGL2RenderingContext, bsp: BSP) {
		const modelLump = bsp.readLump(LumpType.Models) as ModelLump;

		modelLump.models.forEach((model) => {
			this.models.push(new BSPModel(gl, bsp, model));
		});

		this.initialized = true;
		console.log("BSP Loaded");
	}

	public draw(gl: WebGL2RenderingContext, cameraState: CameraState, renderModeOverride?: number) {
		if (!this.initialized) {
			console.log("Cannot render object, not initialized");
			return;
		}
		if (this.visibility === Visibility.Hidden) {
			return;
		}
		
		// node 0 is world geometry
		// TODO: walk every bsp tree once entity info parsing is available and their offsets can be obtained
		this.models[0].draw(gl, cameraState, renderModeOverride);
		// this.models.forEach((model) => {
		// 	model.draw(gl, cameraState, renderModeOverride);
		// });
		// if (renderModeOverride == null) {
		// 	gl.drawElements(this.renderMode, this.vertexCount, gl.UNSIGNED_INT, 0);
		// } else {
		// 	gl.drawElements(renderModeOverride, this.vertexCount, gl.UNSIGNED_INT, 0);
		// }
	}

	private getUniformLocations() {
		
	}
}