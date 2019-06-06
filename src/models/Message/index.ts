export class Message {
    constructor(message: string, type?: MessageType) {
        this.message = message;
        this.type = type ? type : MessageType.REGULAR;
    }

    message: string;
    type: MessageType;
}

export enum MessageType {
    REGULAR,
    WARN,
    OPTION
}