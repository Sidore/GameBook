
import * as express from "express";
export class GameBookApp {

    private server: express.Application;
    private PORT: number = 2503;

    constructor(server : express.Application) {
        this.server = server;
    }

    init(): Promise<boolean> {
        return new Promise((resolve, reject) => {
            if (this.server) {
                this.server.listen(this.PORT, () => {
                    console.log("why are you running?!");
                    resolve();
                })
            } else {
                reject();
            }
        })
        
    }

}