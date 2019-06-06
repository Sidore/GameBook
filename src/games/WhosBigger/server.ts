import { IGame } from "../../models/Game/IGame";

export default class WhosBiggerGame implements IGame {
    constructor(){
        this.init();
    }

    title: string;
    date: Date;
    players: [string];
    round: 1;

    init() {

    }

    recievedMessage(){
        
    }

}