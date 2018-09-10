export interface IRenderable {
	visibility: Visibility;
	draw(gl: WebGL2RenderingContext, renderTypeOverride?: number): void;
	bind(gl: WebGL2RenderingContext);

	// update(); TODO: for updating game state
}

export enum Visibility {
	Visible,
	Hidden,
}