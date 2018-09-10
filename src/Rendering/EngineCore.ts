import {FragShader, VertShader} from "./Shaders/ShaderSource";
import { CreateShaderProgram } from "./Shaders/Shader";
import { ICamera} from "./Camera/ICamera";
import { RenderObject } from "./RenderObjects/RenderObject";
import { KeyboardListener } from "../KeyboardListener";
import { MouseHandler } from "../MouseHandler";
import { IRenderable } from "./RenderObjects/IRenderable";
import { PerspectiveCamera } from "./Camera/PerspectiveCamera";
import { MeshFactory } from "../Utils/MeshFactory";
import { Texture } from "./Textures/Texture";
import { vec4, vec3 } from "gl-matrix";
import { UniformLocations } from "./Shaders/UniformLocations";
import { TextureDictionary } from "./Textures/TextureDictionary";
import { MessageQueue } from "./Messaging/MessageQueue";
import { IEngineComponent } from "./IEngineComponent";
import { Message, MessageType } from "./Messaging/Message";
import { Key, KeyPress, KeyModifier, KeyState } from "../Utils/KeyPress";

export class EngineCore implements IEngineComponent {
	public componentName = "CoreEngine";
	public gl: WebGL2RenderingContext;

	public messageQueue: MessageQueue;

	public cameras: ICamera[];
	public activeCamera: ICamera;
	public controlsActive = false;

	// temporary. todo change to support multiple instances
	private static _renderer: EngineCore;
	public static get renderer(): EngineCore {
		return EngineCore._renderer;
	}
	public static set renderer(value: EngineCore) {
		EngineCore._renderer = value;
	}

	public gridSize = 15;
	public drawGrid = true;

	private defaultShaderProgram: WebGLProgram | null;
	private defaultShaders = [FragShader, VertShader];

	private renderObjects: IRenderable[] = [];
	// private grid: RenderObject;

	public uniformLocations!: UniformLocations;

	public keyboardListener!: KeyboardListener;
	public mouseHandler!: MouseHandler;

	private previousTime = 0;
	private deltaTime = 0;
	public renderFrame = false;

	constructor(gl: WebGL2RenderingContext) {
		console.log("--Initializing Core--");

		// setup gl settings
		this.gl = gl;

		this.messageQueue = new MessageQueue();
		
		this.gl.clearColor(0.0, 0, 0, 1.0);
		this.gl.clearDepth(1.0);
		this.gl.enable(this.gl.CULL_FACE);
		this.gl.cullFace(this.gl.FRONT);
		this.gl.enable(this.gl.DEPTH_TEST);
		this.gl.depthFunc(this.gl.LEQUAL);
		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		// setup default camera
		this.cameras = [new PerspectiveCamera(this.gl.canvas.clientWidth, this.gl.canvas.clientHeight)];
		this.activeCamera = this.cameras[0];
		
		// create default shader
		this.defaultShaderProgram = CreateShaderProgram(this.gl, this.defaultShaders);
		if (this.defaultShaderProgram == null || this.defaultShaderProgram === undefined) {
			return;
		}

		this.uniformLocations = new UniformLocations(this.gl, this.defaultShaderProgram);

		// setup the texture array to use TEXTURE0
		this.gl.uniform1i(this.uniformLocations.uTextureArrayLocation, 0);
		
		// setup keyboard listener
		this.keyboardListener = new KeyboardListener(this);
		this.mouseHandler = new MouseHandler(this);

		EngineCore.renderer = this;
	}

	public addRenderableObject(object: IRenderable) {
		this.renderObjects.push(object);
	}

	public clearRenderObjects() {
		this.renderObjects = [];
	}

	public main(currentTime = 0) {
		window.requestAnimationFrame(this.main.bind(this));

		// dispatch messages
		this.messageQueue.dispatch();

		// poll keyboard 
		this.keyboardListener.pollKeyboard(this);

		// convert dTime to seconds
		this.deltaTime = (currentTime - this.previousTime) / 1000;
		this.previousTime = currentTime;
		
		if (this.renderFrame) {
			this.render();
		}
	}

	public render() {
		// resize every frame so when user resizes canvas it is smooth
		this.resize();
		this.gl.viewport(0, 0, this.gl.drawingBufferWidth, this.gl.drawingBufferHeight);

		this.gl.clear(this.gl.COLOR_BUFFER_BIT | this.gl.DEPTH_BUFFER_BIT);

		// use default shader
		this.gl.useProgram(this.defaultShaderProgram);

		// send uniforms to gpu
		this.gl.uniformMatrix4fv(this.uniformLocations.uModelMatLocation,
			false,
			this.activeCamera.getModelMatrix());

		this.gl.uniformMatrix4fv(this.uniformLocations.uViewMatLocation,
			false,
			this.activeCamera.getViewMatrix());

		this.gl.uniformMatrix4fv(this.uniformLocations.uProjectionMatrixLocation,
			false, 
			this.activeCamera.getProjectionMatrix());

		// render all objects
		this.renderObjects.forEach((renderObject) => {
			// renderObject.draw(this.gl, this.gl.POINTS);
			renderObject.draw(this.gl);
		});
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

	// reroutes messages to their correct destination
	public onMessage(message: Message) {
		switch (message.type) {
			case MessageType.ToggleCameraActive:
				// toggles mouse input and toggles frame rendering
				this.controlsActive = message.data;
				this.mouseHandler.active = message.data;
				this.keyboardListener.zToggle = message.data;
				this.renderFrame = message.data;
				break;

			// case MessageType.ToggleControlsActive:
			// 	this.controlsActive = message.data;
			// 	this.mouseHandler.active = message.data

			case MessageType.ToggleRender:
				// if there is no movement, no need to keep rendering 
				// TODO: disable this once brush ents / moving things are working
				this.renderFrame = message.data;
				break;

			case MessageType.MoveCamera:
				this.activeCamera.onMessage(message);
				break;

			case MessageType.MouseMove:
				// add deltatime to the vec2 containing (dx, dy)
				this.activeCamera.onMessage(new Message(this.activeCamera, this, MessageType.MouseMove, 
					vec3.fromValues(message.data[0], message.data[1], this.deltaTime)));
				break;

			case MessageType.Keypress:
				switch (message.data.key) {
					case Key.Z:
						this.controlsActive = !this.controlsActive;
						this.renderFrame = !this.renderFrame;
						this.mouseHandler.active = this.controlsActive;
						break;

					case Key.Escape:
						this.controlsActive = false;
						this.renderFrame = false;
						this.mouseHandler.active = false;

					default:
						switch (message.data.modifier) {
							case KeyModifier.Shift:
								if (message.data.state === KeyState.Keydown) {
									this.activeCamera.mulitplier = 5.0;
								} else {
									this.activeCamera.mulitplier = 1.0;
								}
								break;
							
							default:
								break;
						}
						break;
				}
			default:
				break;
		}
	}
}