export interface IRenderable {
	hidden: boolean;
	draw(gl: WebGL2RenderingContext, renderTypeOverride?: number): void;
}