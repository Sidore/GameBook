import {Schema, Model, model} from "mongoose";
import { IUserDocument } from './IUserDocument';

export interface IUser extends IUserDocument {
}

export interface IUserModel extends Model<IUser> {
}

const UserSchema = new Schema({
    name : {
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

export let User: IUserModel = model<IUser, IUserModel>("user", UserSchema);