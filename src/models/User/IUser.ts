import { Document } from 'mongoose';

export interface IUser {
    email: string;
    name: string;
    password: string;
}

export type UserType = IUser & Document;



// import {IUser} from './user.ts';
// import * as mongoose from 'mongoose';

// type UserType = IUser & mongoose.Document;
// const User = mongoose.model<UserType>('User', new mongoose.Schema({
//     userName  : String,
//     password  : String,
//     /* etc */
// }));