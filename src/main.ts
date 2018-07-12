import { GLRenderer } from "./Rendering/Renderer";
import { MeshFactory } from "./Utils/MeshFactory";
import { RenderObject } from "./Rendering/RenderObject";
import { Vertex } from "./Structs/Vertex";
import { vec4 } from "gl-matrix";
import { BSP } from "./BSP/BSP";
import { LumpType } from "./BSP/Lumps/LumpType";

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

    setupBtnListeners();
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

function setupBtnListeners() {
    // setup button listener for open file dialog
    const openBtn = document.getElementById("openBtn");
    if (openBtn == null) {
        console.log("Open button was null");
        return;
    }
    openBtn.addEventListener("click", openFileBtnCallback);
}

function openFileBtnCallback() {
    const fileDialog = document.getElementById("fileDialog") as HTMLInputElement;
    if (fileDialog == null) {
        console.log("fileDialog was null");
        return;
    } 

    // event that handles when 
    fileDialog.addEventListener("change", () => {
        if (fileDialog.files == null) {
            console.log("selected files were null");
            return;
        }

        const file = fileDialog.files[0];
        console.log(file);
        if (file.name.match(/.*\.(bsp)$/gm)) {
            const bsp = new BSP(file, readBSP);
        } else {
            console.log("Only BSP files are supported");
        }
    }, false);

    fileDialog.click();
}

function readBSP(bsp: BSP) {
    // console.log(bsp.getLump(LumpType.Vertexes).toString());
    // bsp.getLump(LumpType.Faces);
    // bsp.getLump(LumpType.Vertexes);
    // bsp.getLump(LumpType.Edges);
    // bsp.getLump(LumpType.Planes);
    // bsp.getLump(LumpType.SurfEdges);
    console.log(bsp.getLump(LumpType.Nodes).toString());
    // bsp.printLumps();
}