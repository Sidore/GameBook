import { IGame, IGameAction } from "../../models/Game/IGame";
import { Message } from "../../models/Message";
import { IUser } from "../../models/User/IUser";
import Player from "../../models/Player";
import ws from "ws";

export default class WhosBiggerGame implements IGame,IGameAction  {

    round: number;
    roundEnd() {
        throw new Error("Method not implemented.");
    }
    broadcast(message: Message, group: any) {
        throw new Error("Method not implemented.");
    }
    playerAction(message: string | Message, player: Player) {
        throw new Error("Method not implemented.");
    }
    createPlayerFromWS(user: IUser, ws: ws) {
        throw new Error("Method not implemented.");
    }
    
    constructor(){
        this.init();
    }

    title: string;
    date: Date;
    players: [string];

    init() {

    }


}