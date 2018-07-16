import { GLRenderer } from "./Rendering/GLRenderer";
import { MeshFactory } from "./Utils/MeshFactory";
import { RenderObject } from "./Rendering/RenderObjects/RenderObject";
import { Vertex } from "./Structs/Vertex";
import { vec4 } from "gl-matrix";
import { BSP } from "./BSP/BSP";
import { LumpType } from "./BSP/Lumps/LumpType";
import { BSPObject } from "./Rendering/RenderObjects/BSPObject";

// export function so it can be called globally
// @ts-ignore
window.initWebGL = initWebGL;

function initWebGL(): void {
    const bspRenderer = new BSPRenderer();
}

class BSPRenderer {
    public gl!: WebGL2RenderingContext | null;
    public renderer!: GLRenderer;

    constructor() {
        const canvas: HTMLCanvasElement = document.getElementById("canvas") as HTMLCanvasElement;
        if (!canvas) {
            alert("Could not find canvas");
            return;
        }
    
        // get webgl2 context
        this.gl = canvas.getContext("webgl2");
    
        if (!this.gl) {
            alert("Unable to initialize WebGL2. Your browser may not support it.");
            return;
        }
    
        console.log("WebGL Version: " + this.gl.VERSION);
        console.log("WebGL Shader Language Version: " + this.gl.SHADING_LANGUAGE_VERSION);
    
        this.renderer = new GLRenderer(this.gl);
    
        this.setupBtnListeners();
        // this.renderer.AddRenderableObject(new RenderObject(this.gl, MeshFactory.createSolidCube(5)));
    
        // start render loop
        // this.renderer.Render();
    }

    public setupBtnListeners() {
        // setup button listener for open file dialog
        const openBtn = document.getElementById("openBtn");
        if (openBtn == null) {
            console.log("Open button was null");
            return;
        }
        openBtn.addEventListener("click", this.openFileBtnCallback.bind(this));
    }
    
    public openFileBtnCallback() {
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
            if (file == null) {
                return;
            }
    
            // console.log(file);
            if (file.name.match(/.*\.(bsp)$/gm)) {
                const reader = new FileReader();
    
                reader.onload = this.readBSP.bind(this);
                reader.readAsArrayBuffer(file);
            } else {
                console.log("Only BSP files are supported");
            }
        }, false);
    
        fileDialog.click();
    }
    
    public readBSP(e: FileReaderProgressEvent) {
        if (e.target == null) {
            throw new Error("BSP Read Error");
        }
        const bsp = new BSP(e.target.result);

        if (this.gl == null) {
            return;
        }
        this.renderer.AddRenderableObject(new BSPObject(this.gl, bsp));
        this.renderer.Render();
    }
}