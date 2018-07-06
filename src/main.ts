import { GLRenderer } from "./Rendering/Renderer";
import { MeshFactory } from "./Utils/MeshFactory";
import { RenderObject } from "./Rendering/RenderObject";
import { Vertex } from "./Utils/Vertex";
import { vec4, vec3 } from "gl-matrix";

// export function so it can be called globally
// @ts-ignore
window.initWebGL = initWebGL;

function initWebGL(): void {
    const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
    if (!canvas) {
        alert("Could not find canvas");
        return;
	}

    // get webgl context, fall back to experimental if failed.
    const gl: WebGL2RenderingContext | null =
        canvas.getContext("webgl2");

    if (!gl) {
        alert("Unable to initialize WebGL. Your browser may not support it.");
        return;
    }

    console.log("WebGL Version: " + gl.VERSION);
    console.log("WebGL Shader Language Version: " + gl.SHADING_LANGUAGE_VERSION);

    const renderer = new GLRenderer(gl);
    // renderer.AddRenderObject(new RenderObject(gl, MeshFactory.createSolidCube(5)));
    renderer.AddRenderObject(new RenderObject(gl, [
        new Vertex(vec3.fromValues(1, 0, 0), new vec4(0)), 
        new Vertex(vec3.fromValues(0, -1, 0), new vec4(0)), 
        new Vertex(vec3.fromValues(0, 1, 0), new vec4(0))
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
