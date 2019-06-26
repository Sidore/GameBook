import { IGame, IGameAction } from "../../models/Game/IGame";
import { Message } from "../../models/Message";
import { IUser } from "../../models/User/IUser";
import Player from "../../models/Player";
import * as ws from "ws";

export default class WhosBiggerGame implements IGame,IGameAction  {

    round: number;
    title: string;
    date: Date;
    players: Player[];
    
    constructor(){
        this.init();
    }

    init() {
        console.log("game WhosBiggerGame inited");
        this.title = "WhosBiggerGame";
        this.round = 0;
    }

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

    toString() {
        return this.title + " " + this.round;
    }

}