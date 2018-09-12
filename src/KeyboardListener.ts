import { ICamera, MoveDirection } from "./Rendering/Camera/ICamera";
import { EngineCore } from "./Rendering/EngineCore";
import { IEngineComponent } from "./Rendering/IEngineComponent";
import { Message, MessageType, MessagePriority } from "./Rendering/Messaging/Message";
import { MessageQueue } from "./Rendering/Messaging/MessageQueue";
import { Key, KeyPress, KeyModifier, KeyState } from "./Utils/KeyPress";

export class KeyboardListener implements IEngineComponent {
	public componentName = "KeyboardListener";
	public listen = true;
	public zToggle = false;

	private wPressed = false;
	private aPressed = false;
	private sPressed = false;
	private dPressed = false;

	constructor(coreEngine: EngineCore) {
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

					// has to be high priority, otherwise pointer lock fails
					coreEngine.messageQueue.add(
						new Message(coreEngine, this, MessageType.Keypress, new KeyPress(Key.Z), MessagePriority.High)
					);

					// request toggle frame rendering
					coreEngine.messageQueue.add(
						new Message(coreEngine, this, MessageType.ToggleRender, this.zToggle)
					);
					break;
				case "Shift":
					coreEngine.messageQueue.add(
						new Message(coreEngine, this, MessageType.Keypress, 
							new KeyPress(null, KeyState.Keydown, KeyModifier.Shift), 
							MessagePriority.High)
					);
					break;
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
					coreEngine.messageQueue.add(
						new Message(coreEngine, this, MessageType.Keypress, 
							new KeyPress(null, KeyState.Keyup, KeyModifier.Shift), 
							MessagePriority.High)
					);
					break;
			}
		});
	}

	public pollKeyboard(coreEngine: EngineCore) {
		if (this.wPressed) {
			if (this.zToggle) {
				coreEngine.messageQueue.add(new Message(coreEngine, this, MessageType.MoveCamera, MoveDirection.forward));
			}
		}

		if (this.sPressed) {
			if (this.zToggle) {
				coreEngine.messageQueue.add(new Message(coreEngine, this, MessageType.MoveCamera, MoveDirection.backward));
			}
		}

		if (this.dPressed) {
			if (this.zToggle) {
				coreEngine.messageQueue.add(new Message(coreEngine, this, MessageType.MoveCamera, MoveDirection.right));
			}
		}

		if (this.aPressed) {
			if (this.zToggle) {
				coreEngine.messageQueue.add(new Message(coreEngine, this, MessageType.MoveCamera, MoveDirection.left));
			}
		}
	}

	public onMessage(message: Message) {

	}
}