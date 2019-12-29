import { Document } from 'mongoose';
import { IRestriction } from '../Restriction';
import { IUser } from '../User/IUser';

export interface IGameRoom {
    title: string;
    gameRecordId: string;
    restrictions: IRestriction[],
    users: IUser[],
    round: number,
    isClosed: boolean
    date: Date
}

export interface GameRoomType extends Document, IGameRoom { };