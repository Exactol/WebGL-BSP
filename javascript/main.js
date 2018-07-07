"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Renderer_1 = require("./Rendering/Renderer");
var MeshFactory_1 = require("./Utils/MeshFactory");
var RenderObject_1 = require("./Rendering/RenderObject");
// export function so it can be called globally
// @ts-ignore
window.initWebGL = initWebGL;
function initWebGL() {
    var canvas = document.getElementById("canvas");
    if (!canvas) {
        alert("Could not find canvas");
        return;
    }
    // get webgl2 context
    var gl = canvas.getContext("webgl2");
    if (!gl) {
        alert("Unable to initialize WebGL2. Your browser may not support it.");
        return;
    }
    console.log("WebGL Version: " + gl.VERSION);
    console.log("WebGL Shader Language Version: " + gl.SHADING_LANGUAGE_VERSION);
    var renderer = new Renderer_1.GLRenderer(gl);
    renderer.AddRenderObject(new RenderObject_1.RenderObject(gl, MeshFactory_1.MeshFactory.createSolidCube(5)));
    // renderer.AddRenderObject(new RenderObject(gl, [
    //     new Vertex(vec4.fromValues(-0.5, 0.5, -1.0, 1.0), vec4.create()), 
    //     new Vertex(vec4.fromValues(0.5, 0.5, -1.0, 1.0), vec4.create()), 
    //     new Vertex(vec4.fromValues(-0.5, -0.5, -1.0, 1.0), vec4.create()),
    //     new Vertex(vec4.fromValues(0.5, -0.5, -1.0, 1.0), vec4.create())
    // ]));
    // start render loop
    renderer.RenderFrame();
}
