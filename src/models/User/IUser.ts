import { Document } from 'mongoose';

export interface IUser {
    email: string;
    name: string;
    password: string;
}

export interface UserType extends Document, IUser {};