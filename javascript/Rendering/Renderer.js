"use strict";
exports.__esModule = true;
var ShaderSource_1 = require("./Shaders/ShaderSource");
var Shader_1 = require("./Shaders/Shader");
var Camera_1 = require("./Camera/Camera");
var GLRenderer = /** @class */ (function () {
    function GLRenderer(_gl) {
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
    GLRenderer.prototype.AddRenderObject = function (object) {
        this.renderObjects.push(object);
    };
    GLRenderer.prototype.StartRenderLoop = function () {
        while (this.renderNextFrame) {
            this.Render();
        }
    };
    GLRenderer.prototype.Render = function () {
        var _this = this;
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // use default shader
        this.gl.useProgram(this.defaultShaderProgram);
        // send uniforms to gpu
        this.gl.uniformMatrix4fv(this.uModelMatLocation, false, this.activeCamera.GetModelMatrix());
        this.gl.uniformMatrix4fv(this.uViewMatLocation, false, this.activeCamera.GetViewMatrix());
        this.gl.uniformMatrix4fv(this.uProjectionMatrixLocation, false, this.activeCamera.GetProjectionMatrix());
        this.renderObjects.forEach(function (renderObject) {
            renderObject.Render(_this.gl, _this.gl.TRIANGLES);
        });
    };
    return GLRenderer;
}());
exports.GLRenderer = GLRenderer;
