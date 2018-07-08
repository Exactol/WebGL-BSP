"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Vertex_1 = require("../Structs/Vertex");
var gl_matrix_1 = require("gl-matrix");
var MeshFactory = /** @class */ (function () {
    function MeshFactory() {
    }
    MeshFactory.createSolidCube = function (SideLength, color) {
        if (SideLength === void 0) { SideLength = 10; }
        if (color === void 0) { color = gl_matrix_1.vec4.fromValues(1, 0, 0, 1); }
        var halfSideLength = SideLength / 2; // half side length, otherwise creates cube with 2x length requested
        return [
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(-halfSideLength, -halfSideLength, -halfSideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(-halfSideLength, -halfSideLength, halfSideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(-halfSideLength, halfSideLength, -halfSideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(-halfSideLength, halfSideLength, -halfSideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(-halfSideLength, -halfSideLength, halfSideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(-halfSideLength, halfSideLength, halfSideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(halfSideLength, -halfSideLength, -halfSideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(halfSideLength, halfSideLength, -halfSideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(halfSideLength, -halfSideLength, halfSideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(halfSideLength, -halfSideLength, halfSideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(halfSideLength, halfSideLength, -halfSideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(halfSideLength, halfSideLength, halfSideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(-halfSideLength, -halfSideLength, -halfSideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(halfSideLength, -halfSideLength, -halfSideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(-halfSideLength, -halfSideLength, halfSideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(-halfSideLength, -halfSideLength, halfSideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(halfSideLength, -halfSideLength, -halfSideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(halfSideLength, -halfSideLength, halfSideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(-halfSideLength, halfSideLength, -halfSideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(-halfSideLength, halfSideLength, halfSideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(halfSideLength, halfSideLength, -halfSideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(halfSideLength, halfSideLength, -halfSideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(-halfSideLength, halfSideLength, halfSideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(halfSideLength, halfSideLength, halfSideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(-halfSideLength, -halfSideLength, -halfSideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(-halfSideLength, halfSideLength, -halfSideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(halfSideLength, -halfSideLength, -halfSideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(halfSideLength, -halfSideLength, -halfSideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(-halfSideLength, halfSideLength, -halfSideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(halfSideLength, halfSideLength, -halfSideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(-halfSideLength, -halfSideLength, halfSideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(halfSideLength, -halfSideLength, halfSideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(-halfSideLength, halfSideLength, halfSideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(-halfSideLength, halfSideLength, halfSideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(halfSideLength, -halfSideLength, halfSideLength, 1.0), color),
            new Vertex_1.Vertex(gl_matrix_1.vec4.fromValues(halfSideLength, halfSideLength, halfSideLength, 1.0), color)
        ];
    };
    return MeshFactory;
}());
exports.MeshFactory = MeshFactory;
