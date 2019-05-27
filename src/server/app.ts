
import * as express from "express";
export class GameBookApp {

    private server: express.Application;
    private PORT: number;

    constructor(server : express.Application) {
        this.server = server;
    }

    init(PORT: number): Promise<boolean> {
        this.PORT = PORT;
        return new Promise((resolve, reject) => {
            if (this.server) {
                this.setUpServer(this.server);
                this.server.listen(this.PORT, () => {
                    resolve();
                })
            } else {
                reject();
            }
        })
        
    }

    setUpServer(server : express.Application) {
        this.setUpMiddleWares(server);
        this.setUpRoutes(server);
    }

    setUpMiddleWares(server : express.Application) {
        server.use(express.json());
    }

    setUpRoutes(server : express.Application) {
        server.use('/', (req, res) => {
            res.send("hello from route");
        });
    }

}