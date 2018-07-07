"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var gl_matrix_1 = require("gl-matrix");
var Vertex = /** @class */ (function () {
    function Vertex(_pos, _col, _norm) {
        if (_norm === void 0) { _norm = gl_matrix_1.vec4.create(); }
        this.size = (4 + 4 + 4) * 4; // size of struct in bytes
        this.position = _pos;
        this.color = _col;
        this.normal = _norm;
    }
    return Vertex;
}());
exports.Vertex = Vertex;
