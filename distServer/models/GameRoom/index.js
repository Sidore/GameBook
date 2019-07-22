"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var RoomSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    game: {
        type: Object,
        default: {}
    }
});
exports.GameRoom = mongoose_1.model("gameroom", RoomSchema);
