import { Document } from 'mongoose';

export interface IUser {
    email: string;
    nickname: string;
    password: string;
}

export interface UserType extends Document, IUser {};
