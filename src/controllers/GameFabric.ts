import WhosBiggerGame from "../games/WhosBigger/server";

export default function(game: string) {
    //TODO game switch
    return new WhosBiggerGame();
}