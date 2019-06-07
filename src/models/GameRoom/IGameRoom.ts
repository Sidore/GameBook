import { Document } from 'mongoose';
import { IGameAction } from '../Game/IGame';

export interface IGameRoom {
    title: string;
    date: Date;
    game: IGameAction;
}

export interface GameRoomType extends Document, IGameRoom {}
