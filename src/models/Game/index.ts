import {Schema, model} from "mongoose";
import {GameType} from "./IGame";

const GameSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default: Date.now
    },
    players : {
        type: Array,
        default: []
    },
    round : {
        type: Number,
        default: 1
    }
});

export let Game = model<GameType>("game", GameSchema);