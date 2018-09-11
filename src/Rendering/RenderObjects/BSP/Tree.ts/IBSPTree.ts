import { IRenderable } from "../../IRenderable";

export interface IBSPTree extends IRenderable {
	isNode: boolean;
	// toString(indent?: string): string;
}