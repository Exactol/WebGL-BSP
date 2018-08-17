export interface IRenderable {
	draw(gl: WebGL2RenderingContext, renderTypeOverride?: number): void;
}