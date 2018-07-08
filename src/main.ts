import { GLRenderer } from "./Rendering/Renderer";
import { MeshFactory } from "./Utils/MeshFactory";
import { RenderObject } from "./Rendering/RenderObject";
import { Vertex } from "./Structs/Vertex";
import { vec4 } from "gl-matrix";

// export function so it can be called globally
// @ts-ignore
window.initWebGL = initWebGL;

function initWebGL(): void {
    const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
    if (!canvas) {
        alert("Could not find canvas");
        return;
	}

    // get webgl2 context
    const gl: WebGL2RenderingContext | null = canvas.getContext("webgl2");

    if (!gl) {
        alert("Unable to initialize WebGL2. Your browser may not support it.");
        return;
    }

    console.log("WebGL Version: " + gl.VERSION);
    console.log("WebGL Shader Language Version: " + gl.SHADING_LANGUAGE_VERSION);

    const renderer = new GLRenderer(gl);
    renderer.AddRenderObject(new RenderObject(gl, MeshFactory.createSolidCube(5)));
    // renderer.AddRenderObject(new RenderObject(gl, [
    //     new Vertex(vec4.fromValues(-0.5, 0.5, -1.0, 1.0), vec4.create()), 
    //     new Vertex(vec4.fromValues(0.5, 0.5, -1.0, 1.0), vec4.create()), 
    //     new Vertex(vec4.fromValues(-0.5, -0.5, -1.0, 1.0), vec4.create()),
    //     new Vertex(vec4.fromValues(0.5, -0.5, -1.0, 1.0), vec4.create())
    // ]));

    // start render loop
    renderer.Render();
}