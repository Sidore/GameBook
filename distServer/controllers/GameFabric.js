"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var server_1 = require("../games/WhosBigger/server");
var client_1 = require("../games/WhosBigger/client");
var gameList = [
    {
        title: "WhosBigger",
        client: client_1.default,
        server: server_1.default
    }
];
var GameFabric = /** @class */ (function () {
    function GameFabric() {
    }
    GameFabric.prototype.create = function (game) {
        // console.log(game);
        var title = typeof game === "string" ? game : game.title;
        var theGame = gameList.find(function (gameItem) {
            return gameItem.title === title;
        });
        if (theGame) {
            var server = new theGame.server();
            server.round = typeof game === "string" ? 0 : game.round;
            return server;
        }
    };
    GameFabric.prototype.getList = function () {
        return gameList.map(function (game) { return game.title; });
    };
    return GameFabric;
}());
exports.default = new GameFabric();
