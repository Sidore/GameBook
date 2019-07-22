"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : new P(function (resolve) { resolve(result.value); }).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var mongoose = require("mongoose");
var config = require("config");
var ws_1 = require("ws");
var EventEmmiter_1 = require("../controllers/EventEmmiter");
var GameRoom_1 = require("../models/GameRoom");
var GameRooms_1 = require("./routes/api/GameRooms");
var User_1 = require("./routes/api/User");
var Auth_1 = require("./routes/api/Auth");
var GameFabric_1 = require("../controllers/GameFabric");
var GameBookApp = /** @class */ (function () {
    // private connections: []
    function GameBookApp(server) {
        this.server = server;
        this.gameRooms = [];
    }
    GameBookApp.prototype.init = function (PORT) {
        return __awaiter(this, void 0, void 0, function () {
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        this.PORT = PORT;
                        return [4 /*yield*/, mongoose.connect(config.get("mongoURI"), { useNewUrlParser: true, "useCreateIndex": true })
                                .then(function () {
                                console.log("Mongo is connected");
                            })];
                    case 1:
                        _a.sent();
                        return [4 /*yield*/, new Promise(function (resolve, reject) {
                                if (_this.server) {
                                    _this.setUpServer(_this.server);
                                    _this.server.listen(_this.PORT, function () {
                                        resolve();
                                    });
                                }
                                else {
                                    reject();
                                }
                            })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    GameBookApp.prototype.setUpServer = function (server) {
        this.downloadDB();
        this.setUpMiddleWares(server);
        this.setUpRoutes(server);
        this.setUpEvents(this);
        this.setUpWS();
    };
    GameBookApp.prototype.setUpMiddleWares = function (server) {
        server.use(express.json());
        server.use(function (req, res, next) {
            res.header("Access-Control-Allow-Origin", "*");
            res.header("Access-Control-Allow-Methods", "POST, GET, OPTIONS, DELETE");
            res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
            next();
        });
    };
    GameBookApp.prototype.setUpWS = function () {
        var _this = this;
        var wss = this.wss = new ws_1.Server({ port: 8081 });
        console.log("ws is connected...");
        wss.on("connection", function (ws) {
            var player = null;
            var game = null;
            ws.on("message", function (message) {
                if (player && game) {
                    game.playerAction(message.toString(), player);
                }
                else {
                    var _a = JSON.parse(message.toString()), type = _a.type, roomTitle_1 = _a.roomTitle, user = _a.user, gameTitle = _a.gameTitle;
                    if (type === "auth") {
                        if (roomTitle_1) {
                            if (user) {
                                var buffRoom = _this.gameRooms.find(function (room) {
                                    return room.name === roomTitle_1;
                                });
                                console.log(2, gameTitle, game, buffRoom, user);
                                if (buffRoom) {
                                    game = GameFabric_1.default.create(!buffRoom.game ? gameTitle : { title: buffRoom.game.title, round: buffRoom.game.round });
                                    player = game.createPlayerFromWS(user, ws);
                                    ws.send("\u0412\u044B \u0432\u043E\u0448\u043B\u0438 \u0432 \u0438\u0433\u0440\u0443 " + game.title);
                                }
                                else {
                                    ws.send("Такой игры игровой комнаты");
                                }
                            }
                            else {
                                ws.send("Вы не авторизированы");
                            }
                        }
                        else {
                            ws.send("Вы не указали комнату");
                        }
                    }
                }
            });
        });
        // wss.on("close", (ws) => {
        //     app.removeUser(ws);
        //   });
    };
    GameBookApp.prototype.setUpRoutes = function (server) {
        server.use("/api/gameroom", GameRooms_1.default);
        server.use("/api/user", User_1.default);
        server.use("/api/auth", Auth_1.default);
        server.use("/", function (req, res) {
            res.send("hello from route");
        });
    };
    GameBookApp.prototype.setUpEvents = function (app) {
        var _this = this;
        EventEmmiter_1.default.on("gameroom.created", function (gameroom) {
            console.log("gameroom.created", gameroom);
            _this.addGameRoom(gameroom);
        });
    };
    GameBookApp.prototype.downloadDB = function () {
        var _this = this;
        GameRoom_1.GameRoom.find(function (err, result) {
            _this.gameRooms = result.map(function (room) {
                if (room.game.title) {
                    // console.log(1,room.game)
                    room.game = GameFabric_1.default.create({ title: room.game.title, round: room.game.round });
                }
                return room;
            });
            console.log("db downloaded");
        });
    };
    GameBookApp.prototype.addGameRoom = function (gameroom) {
        if (gameroom.game.title) {
            gameroom.game = GameFabric_1.default.create({ title: gameroom.game.title, round: gameroom.game.round });
        }
        this.gameRooms.push(gameroom);
        console.log(1, gameroom);
    };
    return GameBookApp;
}());
exports.GameBookApp = GameBookApp;
