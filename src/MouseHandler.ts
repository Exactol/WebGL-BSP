import { ICamera } from "./Rendering/Camera/ICamera";
import { EngineCore } from "./Rendering/EngineCore";
import { Message, MessageType, MessagePriority } from "./Rendering/Messaging/Message";
import { IEngineComponent } from "./Rendering/IEngineComponent";
import { vec2, vec3 } from "gl-matrix";
import { KeyPress, Key } from "./Utils/KeyPress";

export class MouseHandler implements IEngineComponent {
	public componentName = "MouseHandler";

	private _active = false;
	public set active(value) {
		const canvas = document.getElementById("canvas");
		if (!canvas) {
			console.log("Failed to find canvas element");
			return;
		}
		if (value) {
			canvas.requestPointerLock();
		} else {
			document.exitPointerLock();
		}
		
		this._active = value;
	}
	public get active() {
		return this._active;
	}

	constructor(coreEngine: EngineCore) {
		document.addEventListener("mousemove", this.mouseCallback.bind(this, coreEngine));
		document.addEventListener("pointerlockchange", this.pointerLockChanged.bind(this, coreEngine));
		document.addEventListener("pointerlockerror", () => console.log("Pointer lock failed"));
	}

	public mouseCallback(coreEngine: EngineCore, e: MouseEvent) {
		if (this.active) {
			coreEngine.messageQueue.add(
				new Message(coreEngine, this, MessageType.MouseMove,
				vec2.fromValues(e.movementX, e.movementY), MessagePriority.High)
			);
		}
	}

	public pointerLockChanged(coreEngine: EngineCore, e: MouseEvent) {
		// pointer locked
		if (document.pointerLockElement !== document.getElementById("canvas")) {
			coreEngine.messageQueue.add(
				new Message(coreEngine, this, MessageType.ToggleCameraActive, false)
			);
		}
	}

	public onMessage(message: Message) {
		switch (message.type) {
			case MessageType.ToggleCameraActive:
				this.active = message.data;
				break;
		
			default:
				break;
		}
	}
}
