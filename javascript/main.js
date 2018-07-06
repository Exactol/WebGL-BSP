"use strict";
exports.__esModule = true;
var Renderer_1 = require("./Rendering/Renderer");
var RenderObject_1 = require("./Rendering/RenderObject");
var Vertex_1 = require("./Utils/Vertex");
var gl_matrix_1 = require("gl-matrix");
// export function so it can be called globally
// @ts-ignore
window.initWebGL = initWebGL;
function initWebGL() {
    var canvas = document.getElementById("canvas");
    if (!canvas) {
        alert("Could not find canvas");
        return;
    }
    // get webgl context, fall back to experimental if failed.
    var gl = canvas.getContext("webgl2");
    if (!gl) {
        alert("Unable to initialize WebGL. Your browser may not support it.");
        return;
    }
    console.log("WebGL Version: " + gl.VERSION);
    console.log("WebGL Shader Language Version: " + gl.SHADING_LANGUAGE_VERSION);
    var renderer = new Renderer_1.GLRenderer(gl);
    // renderer.AddRenderObject(new RenderObject(gl, MeshFactory.createSolidCube(5)));
    renderer.AddRenderObject(new RenderObject_1.RenderObject(gl, [
        new Vertex_1.Vertex(gl_matrix_1.vec3.fromValues(1, 0, 0), new gl_matrix_1.vec4(0)),
        new Vertex_1.Vertex(gl_matrix_1.vec3.fromValues(0, -1, 0), new gl_matrix_1.vec4(0)),
        new Vertex_1.Vertex(gl_matrix_1.vec3.fromValues(0, 1, 0), new gl_matrix_1.vec4(0))
    ]));
    renderer.StartRenderLoop();
}
//     const shaderProgram: WebGLProgram | null = Init(gl);
//     const programInfo = {
//         program: shaderProgram,
//         attribLocations: {
//             vertexPosition: gl.getAttribLocation(shaderProgram, "aVertexPosition"),
//         },
//         uniformLocations: {
//             projectionMatrix: gl.getUniformLocation(shaderProgram, "uProjectionMatrix"),
//             modelViewMatrix: gl.getUniformLocation(shaderProgram, "uModelViewMatrix"),
//         },
//     };
// 	const vertexBuffer: WebGLBuffer | null = initBuffers(gl);
// 	if (vertexBuffer == null) {
// 		return;
// 	}
//     drawScene(gl, programInfo, vertexBuffer);
// }
// function initBuffers(gl: WebGLRenderingContext): WebGLBuffer | null {
//     const vertexBuffer: WebGLBuffer | null = gl.createBuffer();
//     gl.bindBuffer(gl.ARRAY_BUFFER, vertexBuffer);
//     // todo temp
//     const vertices: number[] = [
//         -1.0, 1.0,
//         1.0, 1.0,
//         -1.0, -1.0,
//         1.0, -1.0
//     ];
//     gl.bufferData(gl.ARRAY_BUFFER,
//         new Float32Array(vertices),
//     gl.STATIC_DRAW);
// 	return vertexBuffer;
// }
// function drawScene(gl: WebGLRenderingContext, programInfo, buffers: WebGLBuffer): void {
//     gl.clearColor(0.0, 0.0, 0.0, 1.0);
//     gl.clearDepth(1.0);
//     gl.enable(gl.DEPTH_TEST);
//     gl.depthFunc(gl.LEQUAL);
//     const fov: number = 45 * Math.PI / 180;
//     const aspect: number = gl.canvas.clientWidth / gl.canvas.clientHeight;
//     const nearz: number = 0.1;
//     const farz: number = 100.0;
//     const projectionMatrix = mat4.create();
//     mat4.perspective(projectionMatrix, fov, aspect, nearz, farz);
//     const modelViewMatrix = mat4.create();
//     mat4.translate(modelViewMatrix, modelViewMatrix, [-0.0, 0.0, -6.0]);
//     {
//         const numComponents = 2;
//         const type = gl.FLOAT;
//         const normalize = false;
//         const stride = 0;
//         const offset = 0;
//         gl.bindBuffer(gl.ARRAY_BUFFER, buffers);
//         gl.vertexAttribPointer(
//             programInfo.attribLocations.vertexPosition,
//             numComponents,
//             type,
//             normalize,
//             stride,
//             offset
//         );
//         gl.enableVertexAttribArray(programInfo.attribLocations.vertexPosition);
//         gl.useProgram(programInfo.program);
//         gl.uniformMatrix4fv(
//             programInfo.uniformLocations.projectionMatrix,
//             false,
//             projectionMatrix
//         );
//         gl.uniformMatrix4fv(
//             programInfo.uniformLocations.modelViewMatrix,
//             false,
//             modelViewMatrix
//         );
//         {
//             const offset: number = 0;
//             const vertexCount:number = 4;
//             gl.drawArrays(gl.TRIANGLE_STRIP, offset, vertexCount);
//         }
//     }
// }
