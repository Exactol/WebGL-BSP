import { ICamera } from "../Rendering/Camera/ICamera";
import { GLRenderer } from "../Rendering/GLRenderer";

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
			// use fallthrough cases to handle when shift is held
			switch (event.key) {
				case "W":
				case "w":
					this.wPressed = true;
					break;
				case "A":
				case "a":
					this.aPressed = true;
					break;
				case "S":
				case "s":
					this.sPressed = true;
					break;
				case "D":
				case "d":
					this.dPressed = true;
					break;
				case "Z":
				case "z":
					// toggle
					this.zToggle = !this.zToggle;

					// activate or deactivate camera
					this.renderer.mouseHandler.active = this.zToggle;

					// start rendering
					this.renderer.render = this.zToggle;
					this.renderer.Render();
					break;
				case "Shift":
					this.renderer.activeCamera.mulitplier = 5.0;
			}
		});

		window.addEventListener("keyup", (event) => {
			switch (event.key) {
				case "W":
				case "w":
					this.wPressed = false;
					break;
				case "A":
				case "a":
					this.aPressed = false;
					break;
				case "S":
				case "s":
					this.sPressed = false;
					break;
				case "D":
				case "d":
					this.dPressed = false;
					break;
				case "Shift":
					this.renderer.activeCamera.mulitplier = 1.0;
			}
		});
	}

	public pollKeyboard(camera: ICamera) {
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