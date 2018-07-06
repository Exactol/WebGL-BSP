"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const gl_matrix_1 = require("gl-matrix");
class Vertex {
    constructor(_pos, _col, _norm = new gl_matrix_1.vec3(0)) {
        this.size = (3 + 4 + 3) * 4; // size of struct in bytes
        this.position = _pos;
        this.color = _col;
        this.normal = _norm;
    }
}
exports.Vertex = Vertex;
//# sourceMappingURL=Vertex.js.map