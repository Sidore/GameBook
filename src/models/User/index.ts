import { Schema, Model, model } from "mongoose";
import { UserType } from './IUser';

const UserSchema = new Schema({
    nickname : {
        type : String,
        required : true
    },
    email : {
        type : String,
        required : true,
        unique : true
    },
    password : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default: Date.now
    }
});

export let User = model<UserType>("user", UserSchema);

