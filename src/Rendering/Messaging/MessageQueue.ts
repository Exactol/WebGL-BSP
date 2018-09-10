import { IEngineComponent } from "../IEngineComponent";
import { Message, MessagePriority } from "./Message";

export class MessageQueue {
	private lowPriorityMessages: Message[] = [];
	private mediumPriorityMessages: Message[] = [];
	// private subscribers: IEngineComponent[] = [];
	private logging: boolean;

	constructor(logging = false) {
		this.logging = logging;
	}

	public add(message: Message) {
		// sort by priority
		switch (message.priority) {
			case MessagePriority.High:
				// high priority messages should be dispatched immedietly
				this.dispatchMessage(message);
				break;
			case MessagePriority.Medium:
				this.mediumPriorityMessages.push(message);
			case MessagePriority.Low:
				this.lowPriorityMessages.push(message);
			default:
				break;
		}
	}

	public dispatch() {
		// dispatch medium priority messages first
		for (let i = 0; i < this.mediumPriorityMessages.length; i++) {
			const message = this.mediumPriorityMessages.shift();
			this.dispatchMessage(message);
		}

		for (let i = 0; i < this.lowPriorityMessages.length; i++) {
			const message = this.lowPriorityMessages.shift();
			this.dispatchMessage(message);
		}
	}

	public dispatchMessage(message: Message | undefined) {
			// validate message is valid
			if (message) {
				if (this.logging) {
					console.log(message.toString());
				}

				const recipient = message.to;

				// validate recipient is valid
				if (recipient) {
					recipient.forEach((rec) => {
						rec.onMessage(message);
					});
				}
			}
	}
}

