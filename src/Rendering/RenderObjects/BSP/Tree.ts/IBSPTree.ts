import { IRenderable } from "../../IRenderable";
import { CameraState } from "../../../Camera/CameraState";
import { RenderObject } from "../../RenderObject";
import { Vertex } from "../../../../Structs/Vertex";

export interface IBSPTree extends IRenderable {
	isNode: boolean;
	getCurrentCluster(cameraState: CameraState): number | null;
	// toString(indent?: string): string;
	getClusters(depth: number, clusterNums?: number[], targetDepth?: number): Vertex[];
}