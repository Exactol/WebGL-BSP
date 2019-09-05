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
import { VisibilityLump } from "../../../BSP/Lumps/VisibilityLump";
import { Vertex } from "../../../Structs/Vertex";

export class BSPMesh implements IRenderable {
	public visibility = Visibility.Visible;
	public resourceManager: BSPResourceManager

	private initialized = false;
	private renderMode = WebGL2RenderingContext.TRIANGLES;

	private models: BSPModel[] = [];

	private visLump: VisibilityLump;

	constructor(gl: WebGL2RenderingContext, bsp: BSP) {
		this.resourceManager = new BSPResourceManager(gl, bsp);

		this.visLump = this.resourceManager.getBSP().readLump(LumpType.Visibility) as VisibilityLump;
		const modelLump = bsp.readLump(LumpType.Models) as ModelLump;

		modelLump.models.forEach((model) => {
			this.models.push(new BSPModel(gl, this.resourceManager, model));
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

		const currentCluster = this.getCurrentCluster(cameraState);

		const vis = this.visLump.decompressPVS(currentCluster);
		window.dispatchEvent(new CustomEvent("clusterUpdate", {detail: currentCluster}));

		// node 0 is world geometry
		// TODO: add model offsets once entity info parsing is done
		this.models.forEach((model) => {
			model.draw(gl, cameraState, vis, renderModeOverride);
		});
	}

	private getCurrentCluster(cameraState: CameraState) {
		let currentCluster: number | null = null;
		this.models.forEach((model) => {
			const cluster = model.getCurrentCluster(cameraState);
			if (cluster) {
				currentCluster = cluster;
			}
		});
		return currentCluster;
	}

	private getUniformLocations() {

	}

	public getClusters(clusterNums?: number[], targetDepth?: number) {
		let clusters: Vertex[] = [];
		this.models.forEach(m => clusters = clusters.concat(m.getClusters(clusterNums, targetDepth)));
		return clusters;
	}
}