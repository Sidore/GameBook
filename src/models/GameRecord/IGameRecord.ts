import { Document } from 'mongoose';
import { IRestriction } from '../Restriction';
import { IUser } from '../User/IUser';

export interface IGameRecord {
    title: string;
    url: string;
    logo: string
}

export interface GameRecordType extends Document, IGameRecord { };