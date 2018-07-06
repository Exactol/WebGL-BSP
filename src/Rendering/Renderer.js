"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const ShaderSource_1 = require("./Shaders/ShaderSource");
const Shader_1 = require("./Shaders/Shader");
const Camera_1 = require("./Camera/Camera");
class GLRenderer {
    constructor(_gl) {
        this.gridSize = 15;
        this.drawGrid = true;
        this.defaultShaders = [ShaderSource_1.FragShader, ShaderSource_1.VertShader];
        this.renderObjects = [];
        // private grid: RenderObject;
        this.renderNextFrame = true;
        // setup gl settings
        this.gl = _gl;
        this.gl.clearColor(0.0, 0, 0, 1.0);
        this.gl.clearDepth(1.0);
        this.gl.cullFace(this.gl.BACK);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LEQUAL);
        // setup default camera
        this.cameras = [new Camera_1.Camera(this.gl.canvas.height, this.gl.canvas.width)];
        this.activeCamera = this.cameras[0];
        // create default shader
        this.defaultShaderProgram = Shader_1.CreateShaderProgram(this.gl, this.defaultShaders);
        if (this.defaultShaderProgram == null || this.defaultShaderProgram === undefined) {
            return;
        }
        this.uModelMatLocation = this.gl.getUniformLocation(this.defaultShaderProgram, "uModelMat");
        this.uViewMatLocation = this.gl.getUniformLocation(this.defaultShaderProgram, "uViewMat");
        this.uProjectionMatrixLocation = this.gl.getUniformLocation(this.defaultShaderProgram, "uProjectionMat");
    }
    AddRenderObject(object) {
        this.renderObjects.push(object);
    }
    StartRenderLoop() {
        while (this.renderNextFrame) {
            this.Render();
        }
    }
    Render() {
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // use default shader
        this.gl.useProgram(this.defaultShaderProgram);
        // send uniforms to gpu
        this.gl.uniformMatrix4fv(this.uModelMatLocation, false, this.activeCamera.GetModelMatrix());
        this.gl.uniformMatrix4fv(this.uViewMatLocation, false, this.activeCamera.GetViewMatrix());
        this.gl.uniformMatrix4fv(this.uProjectionMatrixLocation, false, this.activeCamera.GetProjectionMatrix());
        this.renderObjects.forEach((renderObject) => {
            renderObject.Render(this.gl, this.gl.TRIANGLES);
        });
    }
}
exports.GLRenderer = GLRenderer;
//# sourceMappingURL=Renderer.js.map