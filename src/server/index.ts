import * as express from "express";


import { GameBookApp } from "./app";

const server = express();
const app = new GameBookApp(server);

app.init();