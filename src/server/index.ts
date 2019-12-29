import * as express from "express";

import { GameBookApp } from "./app";

const server = express();
const app = new GameBookApp(server);

const PORT = process.env.PORT || 2503;


app.init(PORT).then(() => {
    console.log(`Application server is running on a port ${PORT}?`);
});