import { Document } from 'mongoose';
import { Message } from "../Message";
import { IUser } from "../User/IUser";
import Player from "../Player";
import ws from "ws";

export interface IGame {
    title: string;
    date: Date;
    players: [string];
    round: number;
}

export interface IGameAction extends IGame {
    init();
    roundEnd();
    broadcast(message: Message, group: Player[]);
    playerAction(message: Message | string, player: Player);
    createPlayerFromWS(user: IUser, ws: ws);

}

export interface GameType extends Document, IGame {}