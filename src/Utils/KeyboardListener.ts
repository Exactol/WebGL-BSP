import { Camera } from "../Rendering/Camera/Camera";
import { GLRenderer } from "../Rendering/Renderer";

export class KeyboardListener {
	public listen = true;
	private zToggle = false;

	private wPressed = false;
	private aPressed = false;
	private sPressed = false;
	private dPressed = false;

	private renderer: GLRenderer;

	constructor(rendererInstance: GLRenderer) {
		this.renderer = rendererInstance;
		
		window.addEventListener("keydown", (event) => {
			switch (event.key) {
				case "w":
					this.wPressed = true;
					break;
				case "a":
					this.aPressed = true;
					break;
				case "s":
					this.sPressed = true;
					break;
				case "d":
					this.dPressed = true;
					break;
				case "z":
					// toggle
					this.zToggle = !this.zToggle;

					// activate or deactivate camera
					this.renderer.mouseHandler.active = this.zToggle;
					break;
			}
		});

		window.addEventListener("keyup", (event) => {
			switch (event.key) {
				case "w":
					this.wPressed = false;
					break;
				case "a":
					this.aPressed = false;
					break;
				case "s":
					this.sPressed = false;
					break;
				case "d":
					this.dPressed = false;
					break;
			}
		});
	}

	public pollKeyboard(camera: Camera) {
		if (this.wPressed) {
			if (this.zToggle) {
				camera.moveForward();
			}
		}

		if (this.sPressed) {
			if (this.zToggle) {
				camera.moveBackword();
			}
		}

		if (this.dPressed) {
			if (this.zToggle) {
				camera.moveRight();
			}
		}

		if (this.aPressed) {
			if (this.zToggle) {
				camera.moveLeft();
			}
		}
	}
}