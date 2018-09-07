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
layout (location = 1) in vec4 a_normal;
layout (location = 2) in vec2 a_texCoord;
layout (location = 3) in float a_texIndex;

uniform mat4 u_model_mat;
uniform mat4 u_view_mat;
uniform mat4 u_projection_mat;

out highp vec4 v_norm;
out highp vec2 v_uv;
flat out int v_texIndex;

void main() {
	gl_Position = u_projection_mat * u_view_mat * u_model_mat * a_position;

	//temp
	gl_PointSize = 20.0;

	v_norm = a_normal;
	v_uv = a_texCoord;
	v_texIndex = int(a_texIndex);

}`, WebGLRenderingContext.VERTEX_SHADER);

export const FragShader: ShaderSource = new ShaderSource(
`#version 300 es
precision mediump float;

uniform highp sampler2DArray u_texture_array;

in highp vec4 v_norm;
in highp vec2 v_uv;
flat in int v_texIndex;

out vec4 fragColor;

void main() {
	vec4 color = vec4(0.2, 0.2, 0.2, 1.0);
	vec4 ambientColor = vec4(0.1, 0.1, 0.1, 1.0);

	vec4 lightDir = vec4(0.707107, 0.707107, 0, 1.0);

	float intensity = clamp(dot(v_norm, lightDir), 0.0, 1.0);
	if (intensity > 0.0) {
		color += (ambientColor * intensity);
	}

	color = clamp(color, 0.0, 1.0);

	// z index of sampler2DArray is the layer
	fragColor = texture(u_texture_array, vec3(v_uv, v_texIndex)) + color;
}`, WebGLRenderingContext.FRAGMENT_SHADER);