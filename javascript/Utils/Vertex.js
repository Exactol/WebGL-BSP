"use strict";
exports.__esModule = true;
var gl_matrix_1 = require("gl-matrix");
var Vertex = /** @class */ (function () {
    function Vertex(_pos, _col, _norm) {
        if (_norm === void 0) { _norm = new gl_matrix_1.vec3(0); }
        this.size = (3 + 4 + 3) * 4; // size of struct in bytes
        this.position = _pos;
        this.color = _col;
        this.normal = _norm;
    }
    return Vertex;
}());
exports.Vertex = Vertex;
