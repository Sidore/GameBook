"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var WhosBiggerGame = /** @class */ (function () {
    function WhosBiggerGame() {
        this.init();
    }
    WhosBiggerGame.prototype.init = function () {
        console.log("game WhosBiggerGame inited");
        this.title = "WhosBiggerGame";
        this.round = 0;
    };
    WhosBiggerGame.prototype.roundEnd = function () {
        throw new Error("Method not implemented.");
    };
    WhosBiggerGame.prototype.broadcast = function (message, group) {
        throw new Error("Method not implemented.");
    };
    WhosBiggerGame.prototype.playerAction = function (message, player) {
        throw new Error("Method not implemented.");
    };
    WhosBiggerGame.prototype.createPlayerFromWS = function (user, ws) {
        ws.send("lol)");
    };
    WhosBiggerGame.prototype.toString = function () {
        return this.title + " " + this.round;
    };
    return WhosBiggerGame;
}());
exports.default = WhosBiggerGame;
