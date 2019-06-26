import {Schema, model} from "mongoose";
import {GameRoomType} from "./IGameRoom";

const RoomSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default: Date.now
    },
    game : {
        type : Object,
        default : {}
    }
});

export let GameRoom = model<GameRoomType>("gameroom", RoomSchema);