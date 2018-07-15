export interface IRenderable {
	VAO: WebGLVertexArrayObject;
	VBO: WebGLBuffer;

	Render(gl: WebGL2RenderingContext, renderTypeOverride?: number): void;
}