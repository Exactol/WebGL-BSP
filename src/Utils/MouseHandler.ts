import { ICamera } from "../Rendering/Camera/ICamera";
import { GLRenderer } from "../Rendering/GLRenderer";

export class MouseHandler {
	public activeCamera: ICamera;

	public deltaTime = 0;


	private _active = false;
	public set active(value) {
		if (value) {
			document.body.requestPointerLock();
		} else {
			document.exitPointerLock();
		}
		
		this._active = value;
	}
	public get active() {
		return this._active;
	}

	constructor(camera: ICamera) {
		this.activeCamera = camera;

		// document.addEventListener("pointerlockchange", () => {
		// 	// pointer locked
		// 	if (document.pointerLockElement === document.getElementById("canvas")) {
		// 		this.active = true;
				
		// 		document.addEventListener("mousemove", this.mouseCallback.bind(this));
		// 	} else {
		// 		this.active = false;
		// 		document.removeEventListener("mousemove", this.mouseCallback.bind(this));
		// 	}
		// });

		document.addEventListener("mousemove", this.mouseCallback.bind(this));
	}

	public mouseCallback(e: MouseEvent) {
		if (this.active) {
			this.activeCamera.update(e.movementX, e.movementY, this.deltaTime);
		}
	}
}
