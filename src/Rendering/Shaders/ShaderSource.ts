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

layout (location = 0) in vec4 aPosition;
layout (location = 1) in vec4 aColor;
layout (location = 2) in vec4 aNormal;

uniform mat4 uModelMat;
uniform mat4 uViewMat;
uniform mat4 uProjectionMat;

void main() {
	gl_Position = uProjectionMat * uViewMat * uModelMat * aPosition;
}`, WebGLRenderingContext.VERTEX_SHADER);

export const FragShader: ShaderSource = new ShaderSource(
`#version 300 es

precision mediump float;
out vec4 fragColor;

void main() {
	fragColor = vec4(1.0, 0.0, 0.5, 1.0);
}`, WebGLRenderingContext.FRAGMENT_SHADER);