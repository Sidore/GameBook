import { Document } from 'mongoose';
import * as graphql from "graphql";

export interface IUser {
    email: string;
    nickname: string;
    password: string;
    isVerified: boolean;
}

export interface UserType extends Document, IUser {};

//-------------------------------

const { GraphQLObjectType, GraphQLString, GraphQLID, GraphQLBoolean} = graphql;

export const UserGraphQL = new GraphQLObjectType({
    name: "User",
    fields: () => ({
        id : { type : GraphQLID },
        nickname : { type : GraphQLString },
        password : { type : GraphQLString },
        isVerified : { type : GraphQLBoolean }
    })
});