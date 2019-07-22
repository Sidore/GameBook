"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Player = /** @class */ (function () {
    function Player(user, game) {
        this.user = user;
        this.game = game;
    }
    Player.prototype.setRole = function (role) {
        console.log("Player role " + this.role + " --> " + role);
        this.role = role;
    };
    Player.prototype.setState = function (state) {
        console.log("Player state " + this.state + " --> " + state);
        this.state = state;
    };
    return Player;
}());
exports.default = Player;
