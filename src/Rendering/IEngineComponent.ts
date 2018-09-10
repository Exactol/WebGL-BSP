import { Message } from "./Messaging/Message";

export interface IEngineComponent {
	componentName: string;
	onMessage(message: Message);
}