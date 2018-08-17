export class ShaderSource {
	public source: string;
	public type: GLenum;

	constructor(_source: string, _type: GLenum) {
		this.source = _source;
		this.type = _type;
	}
}

export const VertShader: ShaderSource = new ShaderSource(
`#version 300 es

layout (location = 0) in vec4 a_position;
layout (location = 1) in vec4 a_color;
layout (location = 2) in vec4 a_normal;

uniform mat4 u_model_mat;
uniform mat4 u_view_mat;
uniform mat4 u_projection_mat;

out highp vec4 v_norm;

void main() {
	gl_Position = u_projection_mat * u_view_mat * u_model_mat * a_position;

	//temp
	gl_PointSize = 20.0;

	v_norm = a_normal;

}`, WebGLRenderingContext.VERTEX_SHADER);

export const FragShader: ShaderSource = new ShaderSource(
`#version 300 es
precision mediump float;

in highp vec4 v_norm;
out vec4 fragColor;

void main() {
	//fragColor = vec4(1.0, 0.0, 0.5, 1.0);
	fragColor = 0.5 + 0.5 * v_norm;
}`, WebGLRenderingContext.FRAGMENT_SHADER);