import { Document } from 'mongoose';
import { IRestriction } from '../Restriction';
import { IUser } from '../User/IUser';

export interface IGame {
    title: string;
    url: string;
    logo: string;
    description: string;
    token: string;
}

export interface GameType extends Document, IGame { };