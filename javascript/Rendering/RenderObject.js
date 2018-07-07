"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
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
        // allocate buffer for all vertices and store them in it
        var vertexData = RenderObject.concatBuffers(vertices.map(function (a) { return a.position; }));
        // const positions = [
        // 	0, 0, 0, 1.0,
        // 	0, 0.5, 0, 1.0,
        // 	0.7, 0, 0, 1.0
        // ];
        // this.verticeCount = 3;
        // gl.bufferData(gl.ARRAY_BUFFER,
        // 	new Float32Array(positions), gl.STATIC_DRAW);
        // buffer vertex data
        gl.bufferData(gl.ARRAY_BUFFER, vertexData, gl.STATIC_DRAW);
        // create vertex position VAO
        gl.bindVertexArray(this.VAO);
        gl.enableVertexAttribArray(POSITION_ATTRIB_LOCATION);
        gl.vertexAttribPointer(POSITION_ATTRIB_LOCATION, // attribute location
        4, // size of attribute (vec4)
        gl.FLOAT, // type of attribute is float
        false, // does not need to be normalized
        0, // 0 = move forward size * sizeof(type) each iteration to get the next position
        0 // offset (start at beginnng of buffer)
        );
        this.initialized = true;
    }
    RenderObject.prototype.Render = function (gl, renderType) {
        if (!this.initialized) {
            console.log("Cannot render object, not initialized");
            return;
        }
        gl.bindVertexArray(this.VAO);
        gl.drawArrays(renderType, 0, this.verticeCount);
    };
    // source: https://stackoverflow.com/a/14089496
    // tslint:disable-next-line:member-ordering
    RenderObject.concatBuffers = function (buffers) {
        // create array of buffer lengths
        var length = buffers.map(function (a) { return a.length; });
        // add up lengths of all buffers
        var bufOut = new Float32Array(length.reduce(function (a, b) { return a + b; }, 0));
        for (var i = 0; i < buffers.length; i++) {
            // calculate offset from start
            var offset = RenderObject.sum(length.slice(0, i));
            // insert data starting at offset position
            bufOut.set(buffers[i], offset);
        }
        return bufOut;
    };
    // tslint:disable-next-line:member-ordering
    RenderObject.sum = function (array) {
        // tslint:disable-next-line:only-arrow-functions
        return array.reduce(function (a, b) { return a + b; }, 0);
    };
    return RenderObject;
}());
exports.RenderObject = RenderObject;
