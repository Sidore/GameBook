import { Schema, Model, model } from "mongoose";
import { GameRecordType } from './IGameRecord';
import * as graphql from "graphql";

const GameRoomSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    logo: {
        type: String,
        required: true
    }
});


export let GameRecord = model<GameRecordType>("gameRecord", GameRoomSchema);