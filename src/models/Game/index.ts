import { Schema, Model, model } from "mongoose";
import { GameType } from './IGame';
import * as graphql from "graphql";

const GameSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    url: {
        type: String,
        required: true
    },
    logo: {
        type: String,
    },
    description: {
        type: String,
    },
    token: {
        type: String
    }
});


export let Game = model<GameType>("game", GameSchema);