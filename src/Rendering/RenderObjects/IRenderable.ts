export interface IRenderable {
	visibility: Visibility;
	draw(gl: WebGL2RenderingContext, renderTypeOverride?: number): void;
}

export enum Visibility {
	Visible,
	Hidden,
}