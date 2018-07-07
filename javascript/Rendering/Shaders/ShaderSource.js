"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ShaderSource = /** @class */ (function () {
    function ShaderSource(_source, _type) {
        this.source = _source;
        this.type = _type;
    }
    return ShaderSource;
}());
exports.ShaderSource = ShaderSource;
exports.VertShader = new ShaderSource("#version 300 es\n\nlayout (location = 0) in vec4 aPosition;\nlayout (location = 1) in vec4 aColor;\nlayout (location = 2) in vec4 aNormal;\n\nuniform mat4 uModelMat;\nuniform mat4 uViewMat;\nuniform mat4 uProjectionMat;\n\nvoid main() {\n\tgl_Position = uProjectionMat * uViewMat * uModelMat * aPosition;\n}", WebGLRenderingContext.VERTEX_SHADER);
exports.FragShader = new ShaderSource("#version 300 es\n\nprecision mediump float;\nout vec4 fragColor;\n\nvoid main() {\n\tfragColor = vec4(1.0, 0.0, 0.5, 1.0);\n}", WebGLRenderingContext.FRAGMENT_SHADER);
