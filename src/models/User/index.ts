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
    roles: [{ type: 'String' }],
    password : {
        type : String,
        required : true
    },
    isVerified: { 
        type: Boolean, 
        default: false 
    },
    passwordResetToken: String,
    passwordResetExpires: Date,
    date : {
        type : Date,
        default: Date.now
    }
});


export let User = model<UserType>("user", UserSchema);

