
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

        server.use(function(req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE")
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            next();
          });
    }

    setUpWS() {
        const wss = this.wss = new WebSocketServer({ port: 8081 });
        console.log("ws is connected...")
        wss.on("connection", (ws) => {
            let player: Player = null;
            let game: IGameAction = null;

            ws.on("message", (message) => {
                if (player && game) {
                    game.playerAction(message.toString(), player);
                } else {
                    const { type , roomTitle, user } = JSON.parse(message.toString());
                    if (type === "auth") {
                        if (roomTitle) {
                            if (user) {
                                const buffRoom: IGameRoom = this.gameRooms.find((room) => {
                                    return room.title === roomTitle;
                                });
                                if (buffRoom) {
                                    game = buffRoom.game;
                                    player = game.createPlayerFromWS(user, ws);
                                    ws.send(`Вы вошли в игру ${game.title}`);
                                } else {
                                    ws.send("Такой игры игровой комнаты");
                                }
                            } else {
                                ws.send("Вы не авторизированы");
                            }
                        } else { 
                            ws.send("Вы не указали комнату");
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