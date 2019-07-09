import WhosBiggerGameServer from "../games/WhosBigger/server";
import WhosBiggerGameCliet from "../games/WhosBigger/client";

const gameList = [
    {
        title: "WhosBigger",
        client: WhosBiggerGameCliet,
        server: WhosBiggerGameServer
    }
]
class GameFabric {
    create(gameName: string) {
        const theGame = gameList.find((game) => {
            return game.title === gameName;
        })

        if (theGame) {
            return new theGame.server();
        }
    }

    getList() {
        return gameList.map(game => game.title);
    }
    
}

export default new GameFabric();
