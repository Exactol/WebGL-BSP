"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var ShaderSource_1 = require("./Shaders/ShaderSource");
var Shader_1 = require("./Shaders/Shader");
var Camera_1 = require("./Camera/Camera");
var KeyboardListener_1 = require("../Utils/KeyboardListener");
var MouseHandler_1 = require("../Utils/MouseHandler");
var GLRenderer = /** @class */ (function () {
    function GLRenderer(_gl) {
        this.gridSize = 15;
        this.drawGrid = true;
        this.defaultShaders = [ShaderSource_1.FragShader, ShaderSource_1.VertShader];
        this.renderObjects = [];
        this.previousTime = 0;
        console.log("--Initializing Renderer--");
        // setup gl settings
        this.gl = _gl;
        this.gl.clearColor(0.0, 0, 0, 1.0);
        this.gl.clearDepth(1.0);
        this.gl.cullFace(this.gl.BACK);
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        this.gl.enable(this.gl.DEPTH_TEST);
        this.gl.depthFunc(this.gl.LEQUAL);
        // setup default camera
        this.cameras = [new Camera_1.Camera(this.gl.canvas.clientWidth, this.gl.canvas.clientHeight)];
        this.activeCamera = this.cameras[0];
        // create default shader
        this.defaultShaderProgram = Shader_1.CreateShaderProgram(this.gl, this.defaultShaders);
        if (this.defaultShaderProgram == null || this.defaultShaderProgram === undefined) {
            return;
        }
        this.uModelMatLocation = this.gl.getUniformLocation(this.defaultShaderProgram, "uModelMat");
        this.uViewMatLocation = this.gl.getUniformLocation(this.defaultShaderProgram, "uViewMat");
        this.uProjectionMatrixLocation = this.gl.getUniformLocation(this.defaultShaderProgram, "uProjectionMat");
        // setup keyboard listener
        this.keyboardListener = new KeyboardListener_1.KeyboardListener(this);
        this.mouseHandler = new MouseHandler_1.MouseHandler(this.activeCamera);
        GLRenderer.renderer = this;
    }
    Object.defineProperty(GLRenderer, "renderer", {
        get: function () {
            return GLRenderer._renderer;
        },
        set: function (value) {
            GLRenderer._renderer = value;
        },
        enumerable: true,
        configurable: true
    });
    GLRenderer.prototype.AddRenderObject = function (object) {
        this.renderObjects.push(object);
    };
    GLRenderer.prototype.Render = function (currentTime) {
        var _this = this;
        if (currentTime === void 0) { currentTime = 0; }
        // resize every frame so when user resizes canvas it is smooth
        this.resize();
        this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);
        // poll keyboard and move camera
        this.keyboardListener.pollKeyboard(this.activeCamera);
        // convert dTime to seconds
        this.mouseHandler.deltaTime = (currentTime - this.previousTime) / 1000;
        this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
        // use default shader
        this.gl.useProgram(this.defaultShaderProgram);
        // send uniforms to gpu
        this.gl.uniformMatrix4fv(this.uModelMatLocation, false, this.activeCamera.getModelMatrix());
        this.gl.uniformMatrix4fv(this.uViewMatLocation, false, this.activeCamera.getViewMatrix());
        this.gl.uniformMatrix4fv(this.uProjectionMatrixLocation, false, this.activeCamera.getProjectionMatrix());
        this.renderObjects.forEach(function (renderObject) {
            renderObject.Render(_this.gl, _this.gl.TRIANGLE_STRIP);
        });
        this.previousTime = currentTime;
        // request another render
        window.requestAnimationFrame(this.Render.bind(this));
    };
    GLRenderer.prototype.resize = function () {
        var pixelRatio = window.devicePixelRatio || 1;
        var width = Math.floor(this.gl.canvas.clientWidth * pixelRatio);
        var height = Math.floor(this.gl.canvas.clientHeight * pixelRatio);
        if (this.gl.canvas.width !== width || this.gl.canvas.height !== height) {
            this.gl.canvas.width = width;
            this.gl.canvas.height = height;
            this.activeCamera.updateAspectRatio(width, height);
        }
    };
    return GLRenderer;
}());
exports.GLRenderer = GLRenderer;
