import { Schema, model } from "mongoose";
import { GameRoomType } from "./IGameRoom";
import * as graphql from "graphql";
import { GameGraphQL } from "../Game"

const RoomSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    game: {
        type: Object,
        default: {}
    }
});

export let GameRoom = model<GameRoomType>("gameroom", RoomSchema);

//-------------------------------

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean } = graphql;

export const GameRoomGraphQL = new GraphQLObjectType({
    name: "GameRoom",
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        date: { type: GraphQLString },
        game: { type: GameGraphQL }
    })
});