
import * as express from "express";
import * as mongoose from "mongoose";
import * as config from "config";

import { Server as WebSocketServer } from "ws";

import { IGameRoom } from "./../models/GameRoom/IGameRoom";
import { IGameAction } from "./../models/Game/IGame";
import Player from "./../models/Player";

import GameRoomRoutes from "./routes/api/GameRooms";
import UserRoutes from "./routes/api/User";
import AuthRoutes from "./routes/api/Auth";

export class GameBookApp {

    private server: express.Application;
    private PORT: number;
    private db: any;
    private wss: WebSocketServer;
    private gameRooms: IGameRoom[];
    // private connections: []

    constructor(server : express.Application) {
        this.server = server;
    }

    async init(PORT: number): Promise<boolean>  {
        this.PORT = PORT;
        await mongoose.connect(config.get("mongoURI"), { useNewUrlParser: true , "useCreateIndex": true })
            .then(() => {
                console.log("Mongo is connected");
            });


        await new Promise((resolve, reject) => {
            if (this.server) {
                this.setUpServer(this.server);
                this.server.listen(this.PORT, () => {
                    resolve();
                })
            } else {
                reject();
            }
        })

        return true;
        
    }

    setUpServer(server : express.Application) {
        this.setUpMiddleWares(server);
        this.setUpRoutes(server);
        this.setUpWS();
    }

    setUpMiddleWares(server : express.Application) {
        server.use(express.json());
    }

    setUpWS() {
        const wss = this.wss = new WebSocketServer({ port: 8081 });
        console.log("ws is connected...")
        wss.on("connection", (ws) => {
            let player: Player = null;
            let game: IGameAction = null;

            ws.on("message", (message) => {
                if (player && game) {
                    game.playerAction(message.toString() ,player);
                } else {
                    const { type , roomTitle } = JSON.parse(message.toString());
                    if (type === "auth" && roomTitle) {
                        const buffRoom: IGameRoom = this.gameRooms.find((room) => {
                            return room.title === roomTitle;
                        });
                        if (buffRoom) {
                            game = buffRoom.game;
                            player = game.createPlayerFromWS(null,ws);
                        } else {
                            ws.send("Такой игры нет");
                        }
                    }
                }
            });
          });
          
        // wss.on("close", (ws) => {
        //     app.removeUser(ws);
        //   });
    }

    setUpRoutes(server : express.Application) {

        server.use("/api/gameroom", GameRoomRoutes)
        server.use("/api/user", UserRoutes)
        server.use("/api/auth", AuthRoutes)

        server.use("/", (req, res) => {
            res.send("hello from route");
        });

    }

}