"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gl_matrix_1 = require("gl-matrix");
const WrapAngle_1 = require("../../Utils/WrapAngle");
const LimitAngle_1 = require("../../Utils/LimitAngle");
class Camera {
    constructor(height, width) {
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
    get horizontalAngle() {
        return this._horizontalAngle;
    }
    set horizontalAngle(value) {
        this._horizontalAngle = WrapAngle_1.wrapAngle(value);
    }
    get verticalAngle() {
        return this._verticalAngle;
    }
    set verticalAngle(value) {
        this._verticalAngle = LimitAngle_1.limitAngle(value, -89, 89);
    }
    GetFront() {
        // x
        this.front[0] = Math.sin(gl_matrix_1.glMatrix.toRadian(this.verticalAngle)) * Math.cos(gl_matrix_1.glMatrix.toRadian(this.horizontalAngle));
        // y
        this.front[1] = Math.sin(gl_matrix_1.glMatrix.toRadian(this.verticalAngle));
        // z
        this.front[2] = Math.cos(gl_matrix_1.glMatrix.toRadian(this.verticalAngle)) * Math.sin(gl_matrix_1.glMatrix.toRadian(this.horizontalAngle));
        gl_matrix_1.vec3.normalize(this.front, this.front);
        return this.front;
    }
    GetProjectionMatrix() {
        gl_matrix_1.mat4.perspective(this.projectionMatrix, this.horizontalFov * (Math.PI / 180), this.aspectRatio, this.nearClip, this.farClip);
        // tslint:disable-next-line:align
        return this.projectionMatrix;
    }
    GetViewMatrix() {
        const positionPlusFront = gl_matrix_1.vec3.create();
        gl_matrix_1.vec3.add(positionPlusFront, this.position, this.front);
        gl_matrix_1.mat4.lookAt(this.viewMatrix, this.position, positionPlusFront, this.up);
        return this.viewMatrix;
    }
    GetModelMatrix() {
        return this.modelMatrix;
    }
}
exports.Camera = Camera;
//# sourceMappingURL=Camera.js.map