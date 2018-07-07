"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vertex_1 = require("./Vertex");
var gl_matrix_1 = require("gl-matrix");
var MeshFactory = /** @class */ (function () {
    function MeshFactory() {
    }
    MeshFactory.createSolidCube = function (sideLength, color) {
        if (sideLength === void 0) { sideLength = 10; }
        if (color === void 0) { color = gl_matrix_1.vec4.fromValues(1, 0, 0, 1); }
        sideLength = sideLength / 2; // half side length, otherwise creates cube with 2x length requested
        return [
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(-sideLength, -sideLength, -sideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(-sideLength, -sideLength, sideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(-sideLength, sideLength, -sideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(-sideLength, sideLength, -sideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(-sideLength, -sideLength, sideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(-sideLength, sideLength, sideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(sideLength, -sideLength, -sideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(sideLength, sideLength, -sideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(sideLength, -sideLength, sideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(sideLength, -sideLength, sideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(sideLength, sideLength, -sideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(sideLength, sideLength, sideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(-sideLength, -sideLength, -sideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(sideLength, -sideLength, -sideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(-sideLength, -sideLength, sideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(-sideLength, -sideLength, sideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(sideLength, -sideLength, -sideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(sideLength, -sideLength, sideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(-sideLength, sideLength, -sideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(-sideLength, sideLength, sideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(sideLength, sideLength, -sideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(sideLength, sideLength, -sideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(-sideLength, sideLength, sideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(sideLength, sideLength, sideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(-sideLength, -sideLength, -sideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(-sideLength, sideLength, -sideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(sideLength, -sideLength, -sideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(sideLength, -sideLength, -sideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(-sideLength, sideLength, -sideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(sideLength, sideLength, -sideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(-sideLength, -sideLength, sideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(sideLength, -sideLength, sideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(-sideLength, sideLength, sideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(-sideLength, sideLength, sideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(sideLength, -sideLength, sideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(sideLength, sideLength, sideLength, 1.0), color)
        ];
    };
    return MeshFactory;
}());
exports.MeshFactory = MeshFactory;
