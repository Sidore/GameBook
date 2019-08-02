import {Schema, model} from "mongoose";
import {GameType} from "./IGame";
import * as graphql from "graphql";


const GameSchema = new Schema({
    title : {
        type : String,
        required : true
    },
    date : {
        type : Date,
        default: Date.now
    },
    players : {
        type: Array,
        default: []
    },
    round : {
        type: Number,
        default: 1
    }
});

export let Game = model<GameType>("game", GameSchema);

//-------------------------------

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean, GraphQLInt, GraphQLList} = graphql;

export const GameGraphQL = new GraphQLObjectType({
    name: "Game",
    fields: () => ({
        id : { type : GraphQLID },
        title : { type : GraphQLString },
        date : { type : GraphQLString },
        round : { type : GraphQLInt },
        players : { type : new GraphQLList(GraphQLID)}
    })
});