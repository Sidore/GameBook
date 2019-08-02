import * as graphql from "graphql";

const { GraphQLObjectType, GraphQLString } = graphql;

const RoomType = new GraphQLObjectType({
    name: "Room",
    fields: () => ({
        id : { type : GraphQLString },
        name : { type : GraphQLString },
        game : { type : GraphQLString }
    })
});

const RootQuery = new GraphQLObjectType({
    name: "Root",
    fields: {
        room: {
            type: RoomType,
            args: {id : {type: GraphQLString}},
            resolve(parent, args) {
                //code to get data from db
            }
        }
    }
});

export const graphqlSchema = new graphql.GraphQLSchema({
    query: RootQuery
})