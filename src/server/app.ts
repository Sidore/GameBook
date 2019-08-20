
import * as express from "express";
import * as mongoose from "mongoose";
import * as config from "config";
import * as path from "path";
import * as graphqlHTTP from "express-graphql";
import { Server as WebSocketServer } from "ws";

import ee from "../controllers/EventEmmiter";

import { IGameRoom } from "./../models/GameRoom/IGameRoom";
import { IGameAction } from "./../models/Game/IGame";
import Player from "./../models/Player";
import { GameRoom } from "../models/GameRoom";

import GameRoomRoutes from "./routes/api/GameRooms";
import UserRoutes from "./routes/api/User";
import { AuthRoutes, ConfirmRoutes } from "./routes/api/Auth";
import GameFabric from "../controllers/GameFabric";
import { graphqlSchema } from "./schema"
import { api2 } from "./services/sms";

export class GameBookApp {

    private server: express.Application;
    private PORT: number;
    private db: any;
    private wss: WebSocketServer;
    private gameRooms: IGameRoom[];
    // private connections: []

    constructor(server: express.Application) {
        this.server = server;
        this.gameRooms = [];
    }

    async init(PORT: number): Promise<GameBookApp> {
        this.PORT = PORT;
        await mongoose.connect(config.get("mongoURI"), { useNewUrlParser: true, "useCreateIndex": true })
            .then(() => {
                console.log("Mongo is connected");
            });

        await new Promise(async (resolve, reject) => {
            if (this.server) {
                await this.setUpServer(this.server);
                let a = this.server.listen(process.env.PORT || this.PORT || 5000, () => {
                    console.log(`server run on port ${process.env.PORT || this.PORT || 5000}`);
                    resolve();
                })
                console.log(a.address());
            } else {
                reject();
            }
        })
        return this;

    }

    async stop() {
        await mongoose.connection.close().then(() => {
            console.log("mongo stopped");
        })
    }

    async setUpServer(server: express.Application): Promise<any> {
        await this.downloadDB();
        this.setUpMiddleWares(server);
        this.setUpGrapgql(server);
        this.setUpRoutes(server);
        this.setUpEvents(this);
        this.setUpWS();
    }

    setUpMiddleWares(server: express.Application) {
        server.use(express.json());

        server.use(function (req, res, next) {
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
                    const { type, roomTitle, user, gameTitle } = JSON.parse(message.toString());
                    if (type === "auth") {
                        if (roomTitle) {
                            if (user) {
                                const buffRoom: IGameRoom = this.gameRooms.find((room) => {
                                    return room.name === roomTitle;
                                });

                                console.log(2, gameTitle, game, buffRoom, user)
                                if (buffRoom) {

                                    game = GameFabric.create(
                                        !buffRoom.game ? gameTitle : { title: buffRoom.game.title, round: buffRoom.game.round }
                                    );


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

    setUpRoutes(server: express.Application) {

        console.log(process.env.NODE_ENV);

        const extraPass = process.env.NODE_ENV === "test" ? "" : "";

        server.use("/",(req, res, next) => {
            console.log("root route fired", req.url, __dirname);
            next();
        })
        server.use("/dist", express.static(path.join(__dirname, `${extraPass}../../dist`)));
        server.use("/api/gameroom", GameRoomRoutes)
        server.use("/api/user", UserRoutes)
        server.use("/api/auth", AuthRoutes)
        server.use("/confirmation", ConfirmRoutes)
        server.use("/", (req, res) => {
            res.sendFile(path.join(__dirname, `${extraPass}../../dist`, 'index.html'));
        });

    }

    setUpEvents(app) {
        ee.on("gameroom.created", (gameroom) => {
            console.log("gameroom.created", gameroom);
            this.addGameRoom(gameroom);
        })
    }

    async downloadDB() {
        await GameRoom.find((err, result) => {
            this.gameRooms = result.map((room) => {
                if (room.game.title) {
                    // console.log(1,room.game)
                    room.game = GameFabric.create({ title: room.game.title, round: room.game.round });
                }
                return room;
            });
            console.log("db downloaded")

        })
    }

    setUpGrapgql(server: express.Application) {
        server.use("/graphql", graphqlHTTP({
            schema: graphqlSchema,
            graphiql: true
        }));
    }

    addGameRoom(gameroom) {
        if (gameroom.game.title) {
            gameroom.game = GameFabric.create({ title: gameroom.game.title, round: gameroom.game.round });
        }
        this.gameRooms.push(gameroom);
        console.log(1, gameroom)

    }

}