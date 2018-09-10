import { IEngineComponent } from "../IEngineComponent";

// TODO: turn into interface for custo messages?
export class Message {
	public to: IEngineComponent[];
	public from: IEngineComponent;
	public type: MessageType;
	public data: any;
	public priority: MessagePriority;

	constructor(to: IEngineComponent[] | IEngineComponent, from: IEngineComponent, messageType: MessageType, 
			data?: any, priority = MessagePriority.Low) {
		if (to instanceof Array) {
			this.to = to;
		} else {
			this.to = [to];
		}
		this.from = from;
		this.type = messageType;
		this.data = data;
		this.priority = priority;
	}

	public toString() {
		let retStr = "";
		this.to.forEach((recipient) => {
			retStr += `${this.from.componentName} -> ${recipient.componentName} - ${MessagePriority[this.priority]}:\n`;
			retStr += `${this.data} (${MessageType[this.type]})\n`;
		});
		return retStr;
	}
}

export enum MessagePriority {
	High,
	Medium,
	Low,	
}

export enum MessageType {
	ToggleCameraActive, // bool
	// ToggleControlsActive, // bool
	Keypress, // KeyPress class
	ToggleRender, // bool
	MoveCamera, // MoveDirection enum
	MouseMove, // vec2 (dx, dy)
}