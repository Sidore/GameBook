import * as graphql from "graphql";

import { GameGraphQL, Game } from "../../models/Game";
import { GameRoomGraphQL, GameRoom } from "../../models/GameRoom";
import { UserGraphQL, User } from "../../models/User";

const { GraphQLObjectType, GraphQLID, GraphQLList } = graphql;


const RootQuery = new GraphQLObjectType({
    name: "Root",
    fields: {
        gameRoom: {
            type: GameRoomGraphQL,
            args: {id : {type: GraphQLID}},
            resolve(parent, args) {
                //code to get data from db
                return GameRoom.findById(args.id);
            }
        },
        gameRooms: {
            type: new GraphQLList(GameRoomGraphQL),
            resolve(parent, args) {
                return GameRoom.find({});
            }
        }, 
        user: {
            type : UserGraphQL,
            args: {id : {type: GraphQLID}},
            resolve(parent, args) {
                console.log(parent, args);
                return User.findById(args.id)
            }
        }
    }
});

export const graphqlSchema = new graphql.GraphQLSchema({
    query: RootQuery
})