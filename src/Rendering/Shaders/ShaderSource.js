"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ShaderSource {
    constructor(_source, _type) {
        this.source = _source;
        this.type = _type;
    }
}
exports.ShaderSource = ShaderSource;
exports.VertShader = new ShaderSource(`#version 300 es

layout (location = 0) in vec4 aPosition;
layout (location = 1) in vec4 aColor;
layout (location = 2) in vec4 aNormal;

uniform mat4 uModelMat;
uniform mat4 uViewMat;
uniform mat4 uProjectionMat;

void main() {
	gl_Position = aPosition;
}`, WebGLRenderingContext.VERTEX_SHADER);
exports.FragShader = new ShaderSource(`#version 300 es

precision highp float;

out vec4 fragColor;

void main() {
	fragColor = vec4(0.0, 1.0, 1.0, 1.0);
}`, WebGLRenderingContext.FRAGMENT_SHADER);
//# sourceMappingURL=ShaderSource.js.map