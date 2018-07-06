"use strict";
exports.__esModule = true;
var POSITION_ATTRIB_LOCATION = 0;
var COLOR_ATTRIB_LOCATION = 1;
var NORMAL_ATTRIB_LOCATION = 2;
var RenderObject = /** @class */ (function () {
    function RenderObject(gl, vertices) {
        this.initialized = false;
        this.verticeCount = vertices.length;
        // create buffers
        var _vbo = gl.createBuffer();
        var _vao = gl.createVertexArray();
        // check buffer creation was successful
        if (_vbo == null) {
            console.log("Failed to generate VBO");
            return;
        }
        if (_vao == null) {
            console.log("Failed to generate VAO");
            return;
        }
        this.VBO = _vbo;
        this.VAO = _vao;
        // bind buffers
        gl.bindBuffer(gl.ARRAY_BUFFER, this.VBO);
        // buffer vertex data
        vertices.forEach(function (vertex) {
            gl.bufferData(gl.ARRAY_BUFFER, vertex.position, gl.STATIC_DRAW);
        });
        // position VAO
        gl.bindVertexArray(this.VAO);
        gl.enableVertexAttribArray(POSITION_ATTRIB_LOCATION);
        gl.vertexAttribPointer(POSITION_ATTRIB_LOCATION, // attribute location
        4, // size of attribute (vec4)
        gl.FLOAT, // type of attribute is float
        false, // does not need to be normalized
        0, // 0 = move forward size * sizeof(type) each iteration to get the next position
        0 // offset (start at beginnng of buffer)
        );
    }
    RenderObject.prototype.Render = function (gl, renderType) {
        gl.bindVertexArray(this.VAO);
        gl.drawArrays(renderType, 0, this.verticeCount);
    };
    return RenderObject;
}());
exports.RenderObject = RenderObject;
