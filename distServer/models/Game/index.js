"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var mongoose_1 = require("mongoose");
var GameSchema = new mongoose_1.Schema({
    title: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    players: {
        type: Array,
        default: []
    },
    round: {
        type: Number,
        default: 1
    }
});
exports.Game = mongoose_1.model("game", GameSchema);
