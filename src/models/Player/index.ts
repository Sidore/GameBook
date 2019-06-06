import { IGame } from "../Game/IGame";
import { IUser } from "../User/IUser";
import { IPlayerState, IPlayerRole  } from "./PlayerProps";
export default class Player {
    constructor(user: IUser, game: IGame) {
        this.user = user;
        this.game = game;
    }

    setRole(role: IPlayerRole) {
        console.log(`Player role ${this.role} --> ${role}`)
        this.role = role;
    }

    setState(state: IPlayerState) {
        console.log(`Player state ${this.state} --> ${state}`)
        this.state = state;
    }

    game: IGame;
    user: IUser;
    role: IPlayerRole;
    state: IPlayerState;

}