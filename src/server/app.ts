
import * as express from "express";
import * as mongoose from "mongoose";
import * as config from "config";

import { Server as WebSocketServer } from "ws";

import GameRoomRoutes from "./routes/api/GameRooms";
import UserRoutes from "./routes/api/User";
import AuthRoutes from "./routes/api/Auth";

export class GameBookApp {

    private server: express.Application;
    private PORT: number;
    private db: any;
    private wss: WebSocketServer;

    constructor(server : express.Application) {
        this.server = server;
    }

    async init(PORT: number): Promise<boolean>  {
        this.PORT = PORT;
        await mongoose.connect(config.get("mongoURI"), { useNewUrlParser: true , "useCreateIndex": true })
            .then(() => {
                console.log("Mongo is connected");
            });

        this.wss = new WebSocketServer({ port: 8081 });

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
    }

    setUpMiddleWares(server : express.Application) {
        server.use(express.json());
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