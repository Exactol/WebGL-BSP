import {FragShader, VertShader} from "./Shaders/ShaderSource";
import { CreateShaderProgram } from "./Shaders/Shader";
import {Camera} from "./Camera/Camera";
import { RenderObject } from "./RenderObject";
import { KeyboardListener } from "../Utils/KeyboardListener";
import { MouseHandler } from "../Utils/MouseHandler";

export class GLRenderer {
	public gl: WebGL2RenderingContext;

	public cameras: Camera[];
	public activeCamera: Camera;


	// temporary. todo change to support multiple instances
	private static _renderer: GLRenderer;
	public static get renderer(): GLRenderer {
		return GLRenderer._renderer;
	}
	public static set renderer(value: GLRenderer) {
		GLRenderer._renderer = value;
	}

	public gridSize = 15;
	public drawGrid = true;

	private defaultShaderProgram: WebGLProgram | null;
	private defaultShaders = [FragShader, VertShader];

	private renderObjects: RenderObject[] = [];
	// private grid: RenderObject;

	private uModelMatLocation!: WebGLUniformLocation | null;
	private uViewMatLocation!: WebGLUniformLocation | null;
	private uProjectionMatrixLocation!: WebGLUniformLocation | null;

	private keyboardListener!: KeyboardListener;
	public mouseHandler!: MouseHandler;

	private previousTime = 0;

	constructor(_gl: WebGL2RenderingContext) {
		console.log("--Initializing Renderer--");

		// setup gl settings
		this.gl = _gl;
		this.gl.clearColor(0.0, 0, 0, 1.0);
		this.gl.clearDepth(1.0);
		this.gl.cullFace(this.gl.BACK);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.depthFunc(this.gl.LEQUAL);

		// setup default camera
		this.cameras = [new Camera(this.gl.canvas.clientWidth, this.gl.canvas.clientHeight)];
		this.activeCamera = this.cameras[0];
		
		// create default shader
		this.defaultShaderProgram = CreateShaderProgram(this.gl, this.defaultShaders);
		if (this.defaultShaderProgram == null || this.defaultShaderProgram === undefined) {
			return;
		}

		this.uModelMatLocation = this.gl.getUniformLocation(this.defaultShaderProgram, "uModelMat");
		this.uViewMatLocation = this.gl.getUniformLocation(this.defaultShaderProgram, "uViewMat");
		this.uProjectionMatrixLocation = this.gl.getUniformLocation(this.defaultShaderProgram, "uProjectionMat");

		// setup keyboard listener
		this.keyboardListener = new KeyboardListener(this);
		this.mouseHandler = new MouseHandler(this.activeCamera);

		GLRenderer.renderer = this;
	}

	public AddRenderObject(object: RenderObject) {
		this.renderObjects.push(object);
	}

	public Render(currentTime = 0) {
		// resize every frame so when user resizes canvas it is smooth
		this.resize();
		this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);

		// poll keyboard and move camera
		this.keyboardListener.pollKeyboard(this.activeCamera);

		// convert dTime to seconds
		this.mouseHandler.deltaTime = (currentTime - this.previousTime) / 1000;

		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		// use default shader
		this.gl.useProgram(this.defaultShaderProgram);

		// send uniforms to gpu
		this.gl.uniformMatrix4fv(this.uModelMatLocation,
			false,
			this.activeCamera.getModelMatrix());

		this.gl.uniformMatrix4fv(this.uViewMatLocation,
			false,
			this.activeCamera.getViewMatrix());

		this.gl.uniformMatrix4fv(this.uProjectionMatrixLocation,
			false, 
			 this.activeCamera.getProjectionMatrix());

		this.renderObjects.forEach((renderObject) => {
			renderObject.Render(this.gl, this.gl.TRIANGLE_STRIP);
		});

		this.previousTime = currentTime;

		// request another render
		window.requestAnimationFrame(this.Render.bind(this));
	}

	private resize() {
		const pixelRatio = window.devicePixelRatio || 1;

		const width = Math.floor(this.gl.canvas.clientWidth * pixelRatio);
		const height = Math.floor(this.gl.canvas.clientHeight * pixelRatio);

		if (this.gl.canvas.width !== width || this.gl.canvas.height !== height) {
			this.gl.canvas.width = width;
			this.gl.canvas.height = height;

			this.activeCamera.updateAspectRatio(width, height); 
		}
	}
}