import { Document } from 'mongoose';
export interface IGame {
    title: string;
    date: Date;
    players: [string];
    round: number;
}

export interface GameType extends Document, IGame {}