import { Document } from 'mongoose';

export interface IGameRoom {
    email: string;
    name: string;
    password: string; 
}

export interface GameRoomType extends Document, IGameRoom {}
