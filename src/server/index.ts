import * as express from "express";


import { GameBookApp } from "./app";

const server = express();
const app = new GameBookApp(server);

app.init(2503).then(() => {
    console.log("why are you running on 2503?");
});