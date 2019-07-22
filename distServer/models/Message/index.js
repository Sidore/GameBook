"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Message = /** @class */ (function () {
    function Message(message, type) {
        this.message = message;
        this.type = type ? type : MessageType.REGULAR;
    }
    return Message;
}());
exports.Message = Message;
var MessageType;
(function (MessageType) {
    MessageType[MessageType["REGULAR"] = 0] = "REGULAR";
    MessageType[MessageType["WARN"] = 1] = "WARN";
    MessageType[MessageType["OPTION"] = 2] = "OPTION";
})(MessageType = exports.MessageType || (exports.MessageType = {}));
