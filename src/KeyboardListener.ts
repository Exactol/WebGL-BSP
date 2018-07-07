import { Camera } from "./Rendering/Camera/Camera";

export class KeyboardListener {
	public listen = true;
	private zToggle = false;

	private wPressed = false;
	private aPressed = false;
	private sPressed = false;
	private dPressed = false;

	constructor() {
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
			camera.moveForward();
		}

		if (this.sPressed) {
			camera.moveBackword();
		}

		if (this.dPressed) {
			camera.moveRight();
		}

		if (this.aPressed) {
			camera.moveLeft();
		}
	}
}