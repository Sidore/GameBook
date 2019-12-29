import { Schema, Model, model } from "mongoose";
import { GameRoomType } from './IGameRoom';
import * as graphql from "graphql";

const GameRoomSchema = new Schema({

    title: {
        type: String,
        required: true
    },
    gameRecordId: {
        type: String,
        required: true
    },
    restrictions: [{ type: 'String' }],
    users: [{ type: 'String' }],
    round: {
        type: Number,
        default: 1
    },
    isClosed: {
        type: Boolean,
        default: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});


export let GameRoom = model<GameRoomType>("gameRoom", GameRoomSchema);