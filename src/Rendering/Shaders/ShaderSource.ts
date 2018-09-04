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
layout (location = 2) in vec4 a_color;

uniform mat4 u_model_mat;
uniform mat4 u_view_mat;
uniform mat4 u_projection_mat;

out highp vec4 v_norm;
out highp vec4 v_color;

void main() {
	gl_Position = u_projection_mat * u_view_mat * u_model_mat * a_position;

	//temp
	gl_PointSize = 20.0;

	v_norm = a_normal;
	v_color = a_color;

}`, WebGLRenderingContext.VERTEX_SHADER);

export const FragShader: ShaderSource = new ShaderSource(
`#version 300 es
precision mediump float;

in highp vec4 v_norm;
in highp vec4 v_color;

out vec4 fragColor;

void main() {
	// fragColor = 0.5 + 0.5 * v_norm;

	// float ambientStrength = 0.4;
	// vec3 ambient = ambientStrength * vec3(1.0, 1.0, 1.0);

	vec4 color = vec4(0.2, 0.2, 0.2, 1.0);
	vec4 ambientColor = vec4(0.6, 0.6, 0.6, 1.0);

	// vec4 lightDir = vec4(1.0, 0, 0, 1.0);
	vec4 lightDir = vec4(0.707107, 0.707107, 0, 1.0);

	float intensity = clamp(dot(v_norm, lightDir), 0.0, 1.0);
	// float intensity = dot(v_norm, lightDir);
	if (intensity > 0.0) {
		color += (ambientColor * intensity);
	}

	color = clamp(color, 0.0, 1.0);
	fragColor = color * v_color;
	// fragColor = v_color;
	// fragColor.rgb *= intensity + 0.2;

	// float diffuse = dot(v_norm, vec4(0.707107, 0.707107, 0, 0));

	// fragColor = v_color;
	// fragColor.rgb *= (diffuse + 0.4);

	//fragColor = v_color;// + 0.1 * v_norm;
}`, WebGLRenderingContext.FRAGMENT_SHADER);