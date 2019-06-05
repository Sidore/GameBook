import { Document } from 'mongoose';

export interface IGameRoom {
    email: string;
    name: string;
    password: string;
}

export type GameRoomType = IGameRoom & Document;
