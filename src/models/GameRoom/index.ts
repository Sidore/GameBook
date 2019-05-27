import {Schema, model} from "mongoose";

const RoomSchema = new Schema({
    name : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default: Date.now
    }
});

export let GameRoom = model("gameroom", RoomSchema);