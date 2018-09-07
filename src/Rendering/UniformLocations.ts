export class UniformLocations {
	public uModelMatLocation!: WebGLUniformLocation | null;
	public uViewMatLocation!: WebGLUniformLocation | null;
	public uProjectionMatrixLocation!: WebGLUniformLocation | null;
	public uTextureArrayLocation!: WebGLUniformLocation | null;

	constructor(gl: WebGL2RenderingContext, shaderProgram: WebGLProgram) {
		this.uModelMatLocation = gl.getUniformLocation(shaderProgram, "u_model_mat");
		this.uViewMatLocation = gl.getUniformLocation(shaderProgram, "u_view_mat");
		this.uProjectionMatrixLocation = gl.getUniformLocation(shaderProgram, "u_projection_mat");
		this.uTextureArrayLocation = gl.getUniformLocation(shaderProgram, "u_sampler");		
	}
}