export class ShaderSource {
	public source: string;
	public type: GLenum;

	constructor(_source: string, _type: GLenum) {
		this.source = _source;
		this.type = _type;
	}

	public compileShader(gl: WebGL2RenderingContext) {
		const shader = gl.createShader(this.type);
		if (!shader) {
			console.error("Failed to create shader: ", this.source);
			return;
		}
		// compile shader
		gl.shaderSource(shader, this.source);
		gl.compileShader(shader);

		// check for errors
		if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
			console.log("----------Failed to compile shader----------\n" + this.source);
			console.log("Info log: " + gl.getShaderInfoLog(shader));
			gl.deleteShader(shader);
			throw new Error("Failed to compile shader");
		}

		return shader;
	}
}

// TODO: convert shader from https://gist.github.com/Kink3d/7d7a8da1a8a67d808f74a3f824d8a294

export const VertShader: ShaderSource = new ShaderSource(
`#version 300 es

layout (location = 0) in vec4 a_position;
layout (location = 1) in vec4 a_normal;
layout (location = 2) in vec4 a_fallbackColor;
layout (location = 3) in float a_textureLoaded;
layout (location = 4) in vec2 a_texCoord;
layout (location = 5) in float a_texIndex;

uniform mat4 u_model_mat;
uniform mat4 u_view_mat;
uniform mat4 u_projection_mat;

out highp vec4 v_norm;
out highp vec4 v_fallbackColor;
out highp vec2 v_uv;

flat out int v_texIndex;
flat out int v_textureLoaded;

void main() {
	gl_Position = u_projection_mat * u_view_mat * u_model_mat * a_position;

	//temp
	gl_PointSize = 20.0;

	v_norm = a_normal;
	v_fallbackColor = a_fallbackColor;
	v_textureLoaded = int(a_textureLoaded);
	v_uv = a_texCoord;
	v_texIndex = int(a_texIndex);

}`, WebGLRenderingContext.VERTEX_SHADER);

export const FragShader: ShaderSource = new ShaderSource(
`#version 300 es
precision mediump float;

uniform highp sampler2DArray u_texture_array;

in highp vec4 v_norm;
in highp vec4 v_fallbackColor;
in highp vec2 v_uv;


flat in int v_texIndex;
flat in int v_textureLoaded;

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
	fragColor = v_fallbackColor + color;

	// if (v_textureLoaded > 0) {
	// 	fragColor = vec4(1, 0, 0, 1);
	// 	// z index of sampler2DArray is the layer
	// 	// fragColor = texture(u_texture_array, vec3(v_uv, v_texIndex)) + color;
	// } else {
	// 	fragColor = vec4(0, 0, 1, 1);
	// 	// fragColor = v_fallbackColor + color;
	// }
}`, WebGLRenderingContext.FRAGMENT_SHADER);




export const SimpleFragShader: ShaderSource = new ShaderSource(
`#version 300 es
precision mediump float;

out vec4 fragColor;

void main() {
	fragColor = vec4(0, .2, 1.0, 0.6);
}`, WebGLRenderingContext.FRAGMENT_SHADER);

export const SimpleVertShader: ShaderSource = new ShaderSource(
	`#version 300 es

	layout (location = 0) in vec4 a_position;

	uniform mat4 u_model_mat;
	uniform mat4 u_view_mat;
	uniform mat4 u_projection_mat;

	void main() {
		gl_Position = u_projection_mat * u_view_mat * u_model_mat * a_position;

		//temp
		gl_PointSize = 20.0;
	}`, WebGLRenderingContext.VERTEX_SHADER);
