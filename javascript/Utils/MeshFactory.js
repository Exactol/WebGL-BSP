"use strict";
exports.__esModule = true;
var Vertex_1 = require("./Vertex");
var gl_matrix_1 = require("gl-matrix");
var MeshFactory = /** @class */ (function () {
    function MeshFactory() {
    }
    MeshFactory.createSolidCube = function (sideLength, color) {
        if (sideLength === void 0) { sideLength = 10; }
        if (color === void 0) { color = gl_matrix_1.vec4.fromValues(255, 0, 0, 255); }
        sideLength = sideLength / 2; // half side length, otherwise creates cube with 2x length requested
        return [
            new Vertex_1.Vertex(gl_matrix_1.vec3.fromValues(-sideLength, -sideLength, -sideLength), color),
            new Vertex_1.Vertex(gl_matrix_1.vec3.fromValues(-sideLength, -sideLength, sideLength), color),
            new Vertex_1.Vertex(gl_matrix_1.vec3.fromValues(-sideLength, sideLength, -sideLength), color),
            new Vertex_1.Vertex(gl_matrix_1.vec3.fromValues(-sideLength, sideLength, -sideLength), color),
            new Vertex_1.Vertex(gl_matrix_1.vec3.fromValues(-sideLength, -sideLength, sideLength), color),
            new Vertex_1.Vertex(gl_matrix_1.vec3.fromValues(-sideLength, sideLength, sideLength), color),
            new Vertex_1.Vertex(gl_matrix_1.vec3.fromValues(sideLength, -sideLength, -sideLength), color),
            new Vertex_1.Vertex(gl_matrix_1.vec3.fromValues(sideLength, sideLength, -sideLength), color),
            new Vertex_1.Vertex(gl_matrix_1.vec3.fromValues(sideLength, -sideLength, sideLength), color),
            new Vertex_1.Vertex(gl_matrix_1.vec3.fromValues(sideLength, -sideLength, sideLength), color),
            new Vertex_1.Vertex(gl_matrix_1.vec3.fromValues(sideLength, sideLength, -sideLength), color),
            new Vertex_1.Vertex(gl_matrix_1.vec3.fromValues(sideLength, sideLength, sideLength), color),
            new Vertex_1.Vertex(gl_matrix_1.vec3.fromValues(-sideLength, -sideLength, -sideLength), color),
            new Vertex_1.Vertex(gl_matrix_1.vec3.fromValues(sideLength, -sideLength, -sideLength), color),
            new Vertex_1.Vertex(gl_matrix_1.vec3.fromValues(-sideLength, -sideLength, sideLength), color),
            new Vertex_1.Vertex(gl_matrix_1.vec3.fromValues(-sideLength, -sideLength, sideLength), color),
            new Vertex_1.Vertex(gl_matrix_1.vec3.fromValues(sideLength, -sideLength, -sideLength), color),
            new Vertex_1.Vertex(gl_matrix_1.vec3.fromValues(sideLength, -sideLength, sideLength), color),
            new Vertex_1.Vertex(gl_matrix_1.vec3.fromValues(-sideLength, sideLength, -sideLength), color),
            new Vertex_1.Vertex(gl_matrix_1.vec3.fromValues(-sideLength, sideLength, sideLength), color),
            new Vertex_1.Vertex(gl_matrix_1.vec3.fromValues(sideLength, sideLength, -sideLength), color),
            new Vertex_1.Vertex(gl_matrix_1.vec3.fromValues(sideLength, sideLength, -sideLength), color),
            new Vertex_1.Vertex(gl_matrix_1.vec3.fromValues(-sideLength, sideLength, sideLength), color),
            new Vertex_1.Vertex(gl_matrix_1.vec3.fromValues(sideLength, sideLength, sideLength), color),
            new Vertex_1.Vertex(gl_matrix_1.vec3.fromValues(-sideLength, -sideLength, -sideLength), color),
            new Vertex_1.Vertex(gl_matrix_1.vec3.fromValues(-sideLength, sideLength, -sideLength), color),
            new Vertex_1.Vertex(gl_matrix_1.vec3.fromValues(sideLength, -sideLength, -sideLength), color),
            new Vertex_1.Vertex(gl_matrix_1.vec3.fromValues(sideLength, -sideLength, -sideLength), color),
            new Vertex_1.Vertex(gl_matrix_1.vec3.fromValues(-sideLength, sideLength, -sideLength), color),
            new Vertex_1.Vertex(gl_matrix_1.vec3.fromValues(sideLength, sideLength, -sideLength), color),
            new Vertex_1.Vertex(gl_matrix_1.vec3.fromValues(-sideLength, -sideLength, sideLength), color),
            new Vertex_1.Vertex(gl_matrix_1.vec3.fromValues(sideLength, -sideLength, sideLength), color),
            new Vertex_1.Vertex(gl_matrix_1.vec3.fromValues(-sideLength, sideLength, sideLength), color),
            new Vertex_1.Vertex(gl_matrix_1.vec3.fromValues(-sideLength, sideLength, sideLength), color),
            new Vertex_1.Vertex(gl_matrix_1.vec3.fromValues(sideLength, -sideLength, sideLength), color),
            new Vertex_1.Vertex(gl_matrix_1.vec3.fromValues(sideLength, sideLength, sideLength), color)
        ];
    };
    return MeshFactory;
}());
exports.MeshFactory = MeshFactory;
