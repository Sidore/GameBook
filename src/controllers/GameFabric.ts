import WhosBiggerGameServer from "../games/WhosBigger/server";
import WhosBiggerGameCliet from "../games/WhosBigger/client";
import { IGameAction } from "../models/Game/IGame";

const gameList = [
    {
        title: "WhosBigger",
        client: WhosBiggerGameCliet,
        server: WhosBiggerGameServer
    }
]
class GameFabric {
    create(game: string | { title, round }): IGameAction {

        // console.log(game);

        const title = typeof game === "string" ? game : game.title;

        const theGame = gameList.find((gameItem) => {
            return gameItem.title === title;
        })

        if (theGame) {
            const server = new theGame.server();
            server.round = typeof game === "string" ? 0 : game.round;
            return server;
        }
    }

    getList() {
        return gameList.map(game => game.title);
    }

}

export default new GameFabric();
