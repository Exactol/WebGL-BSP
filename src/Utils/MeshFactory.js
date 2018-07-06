"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Vertex_1 = require("./Vertex");
const gl_matrix_1 = require("gl-matrix");
class MeshFactory {
    static createSolidCube(sideLength = 10, color = gl_matrix_1.vec4.fromValues(255, 0, 0, 255)) {
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
    }
}
exports.MeshFactory = MeshFactory;
//# sourceMappingURL=MeshFactory.js.map