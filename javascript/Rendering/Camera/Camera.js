"use strict";
exports.__esModule = true;
var gl_matrix_1 = require("gl-matrix");
var common_1 = require("gl-matrix/src/gl-matrix/common");
var vec3_1 = require("gl-matrix/src/gl-matrix/vec3");
var WrapAngle_1 = require("../../Utils/WrapAngle");
var LimitAngle_1 = require("../../Utils/LimitAngle");
var Camera = /** @class */ (function () {
    function Camera(height, width) {
        this.horizontalFov = 45;
        this.originalSpeed = 50;
        this.speed = 50;
        this.mouseSensitivity = 5;
        this.up = gl_matrix_1.vec3.fromValues(0, 1, 0);
        this.modelMatrix = gl_matrix_1.mat4.identity(new gl_matrix_1.mat4(0));
        this.nearClip = 10;
        this.farClip = 1000;
        if (height === 0) {
            console.log("Error, height cannot be 0");
            this.aspectRatio = 0;
        }
        else {
            this.aspectRatio = width / height;
        }
        this.position = gl_matrix_1.vec3.create();
        this.horizontalAngle = 0;
        this.verticalAngle = 0;
        // calculate front vector
        this.front = gl_matrix_1.vec3.create();
        this.GetFront();
        // calculate projection matrix
        this.projectionMatrix = gl_matrix_1.mat4.create();
        this.viewMatrix = gl_matrix_1.mat4.create();
        this.GetProjectionMatrix();
    }
    Object.defineProperty(Camera.prototype, "horizontalAngle", {
        get: function () {
            return this._horizontalAngle;
        },
        set: function (value) {
            this._horizontalAngle = WrapAngle_1.wrapAngle(value);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Camera.prototype, "verticalAngle", {
        get: function () {
            return this._verticalAngle;
        },
        set: function (value) {
            this._verticalAngle = LimitAngle_1.limitAngle(value, -89, 89);
        },
        enumerable: true,
        configurable: true
    });
    Camera.prototype.GetFront = function () {
        // x
        this.front[0] = Math.sin(common_1.toRadian(this.verticalAngle)) * Math.cos(common_1.toRadian(this.horizontalAngle));
        // y
        this.front[1] = Math.sin(common_1.toRadian(this.verticalAngle));
        // z
        this.front[2] = Math.cos(common_1.toRadian(this.verticalAngle)) * Math.sin(common_1.toRadian(this.horizontalAngle));
        vec3_1.normalize(this.front, this.front);
        return this.front;
    };
    Camera.prototype.GetProjectionMatrix = function () {
        gl_matrix_1.mat4.perspective(this.projectionMatrix, this.horizontalFov * (Math.PI / 180), this.aspectRatio, this.nearClip, this.farClip);
        // tslint:disable-next-line:align
        return this.projectionMatrix;
    };
    Camera.prototype.GetViewMatrix = function () {
        var positionPlusFront = gl_matrix_1.vec3.create();
        gl_matrix_1.vec3.add(positionPlusFront, this.position, this.front);
        gl_matrix_1.mat4.lookAt(this.viewMatrix, this.position, positionPlusFront, this.up);
        return this.viewMatrix;
    };
    Camera.prototype.GetModelMatrix = function () {
        return this.modelMatrix;
    };
    return Camera;
}());
exports.Camera = Camera;
