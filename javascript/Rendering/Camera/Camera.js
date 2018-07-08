"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gl_matrix_1 = require("gl-matrix");
var WrapAngle_1 = require("../../Utils/WrapAngle");
var LimitAngle_1 = require("../../Utils/LimitAngle");
// todo make into interface
var Camera = /** @class */ (function () {
    function Camera(width, height) {
        this.horizontalFov = 45;
        this.originalSpeed = 0.5;
        this.speed = 0.5;
        this.mouseSensitivity = 5;
        this.up = gl_matrix_1.vec3.fromValues(0, 1, 0);
        this.modelMatrix = gl_matrix_1.mat4.identity(gl_matrix_1.mat4.create());
        this.nearClip = 1;
        this.farClip = 1000;
        console.log("--Initializing Camera--");
        console.log("	Canvas Width: " + width);
        console.log("	Canvas Height: " + height);
        if (height === 0) {
            console.log("Error, height cannot be 0");
            this.aspectRatio = 0;
        }
        else {
            this.aspectRatio = width / height;
        }
        console.log("	Aspect Ratio: " + this.aspectRatio);
        // start camera at world center
        this.position = gl_matrix_1.vec3.fromValues(0, 0, 0);
        this.horizontalAngle = 0;
        this.verticalAngle = 0;
        // calculate projection matrix
        this.getProjectionMatrix();
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
    Camera.prototype.getFront = function () {
        var front = gl_matrix_1.vec3.create();
        // x
        front[0] = Math.cos(gl_matrix_1.glMatrix.toRadian(this.verticalAngle)) * Math.cos(gl_matrix_1.glMatrix.toRadian(this.horizontalAngle));
        // y
        front[1] = Math.sin(gl_matrix_1.glMatrix.toRadian(this.verticalAngle));
        // z
        front[2] = Math.cos(gl_matrix_1.glMatrix.toRadian(this.verticalAngle)) * Math.sin(gl_matrix_1.glMatrix.toRadian(this.horizontalAngle));
        gl_matrix_1.vec3.normalize(front, front);
        return front;
    };
    Camera.prototype.getRight = function () {
        var front = this.getFront();
        var right = gl_matrix_1.vec3.create();
        gl_matrix_1.vec3.cross(right, front, this.up);
        gl_matrix_1.vec3.normalize(right, right);
        return right;
    };
    Camera.prototype.getProjectionMatrix = function () {
        var projectionMatrix = gl_matrix_1.mat4.create();
        gl_matrix_1.mat4.perspective(projectionMatrix, gl_matrix_1.glMatrix.toRadian(this.horizontalFov), this.aspectRatio, this.nearClip, this.farClip);
        // tslint:disable-next-line:align
        return projectionMatrix;
    };
    Camera.prototype.getViewMatrix = function () {
        var positionPlusFront = gl_matrix_1.vec3.create();
        gl_matrix_1.vec3.add(positionPlusFront, this.position, this.getFront());
        var viewMatrix = gl_matrix_1.mat4.create();
        gl_matrix_1.mat4.lookAt(viewMatrix, this.position, positionPlusFront, this.up);
        return viewMatrix;
    };
    Camera.prototype.getModelMatrix = function () {
        return this.modelMatrix;
    };
    Camera.prototype.updateAspectRatio = function (width, height) {
        if (height === 0) {
            console.log("Error, height cannot be 0");
            return;
        }
        this.aspectRatio = width / height;
    };
    Camera.prototype.moveForward = function () {
        // get front matrix
        var front = this.getFront();
        // x
        this.position[0] += (this.speed * front[0]);
        // y
        this.position[1] += (this.speed * front[1]);
        // z
        this.position[2] += (this.speed * front[2]);
    };
    Camera.prototype.moveBackword = function () {
        // get front matrix
        var front = this.getFront();
        // x
        this.position[0] -= (this.speed * front[0]);
        // y
        this.position[1] -= (this.speed * front[1]);
        // z
        this.position[2] -= (this.speed * front[2]);
    };
    Camera.prototype.moveRight = function () {
        //
        var right = this.getRight();
        // x
        this.position[0] += (this.speed * right[0]);
        // y
        this.position[1] += (this.speed * right[1]);
        // z
        this.position[2] += (this.speed * right[2]);
    };
    Camera.prototype.moveLeft = function () {
        //
        var right = this.getRight();
        // x
        this.position[0] -= (this.speed * right[0]);
        // y
        this.position[1] -= (this.speed * right[1]);
        // z
        this.position[2] -= (this.speed * right[2]);
    };
    Camera.prototype.update = function (dX, dY, dTime) {
        this.horizontalAngle += dX * dTime * this.mouseSensitivity;
        // this.verticalAngle += -dY * dTime * this.mouseSensitivity;
        // console.log("vAngle: " + this.verticalAngle);
        console.log("hAngle: " + this.horizontalAngle);
    };
    return Camera;
}());
exports.Camera = Camera;
