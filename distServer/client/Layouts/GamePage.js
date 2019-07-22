"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var LazyLoad_1 = require("./../components/LazyLoad");
var GamePage = /** @class */ (function (_super) {
    __extends(GamePage, _super);
    function GamePage(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            gameList: [],
            game: null
        };
        _this.getGamesList = _this.getGamesList.bind(_this);
        _this.chooseGame = _this.chooseGame.bind(_this);
        _this.setUpSocketsToGame = _this.setUpSocketsToGame.bind(_this);
        return _this;
    }
    GamePage.prototype.getGamesList = function () {
        var _this = this;
        var req = new XMLHttpRequest();
        req.open('GET', "http://localhost:2503/api/gameroom/" + this.props.match.params.id + "/game");
        req.setRequestHeader("Content-Type", "application/json");
        req.setRequestHeader("Authorization", "Bearer " + this.props.token);
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                console.log(JSON.parse(req.responseText));
                _this.setState({
                    gameList: JSON.parse(req.responseText)
                });
            }
        };
        req.send();
    };
    GamePage.prototype.chooseGame = function (gameName) {
        var _this = this;
        var req = new XMLHttpRequest();
        req.open('POST', "http://localhost:2503/api/gameroom/" + this.props.match.params.id + "/game/" + gameName);
        req.setRequestHeader("Content-Type", "application/json");
        req.setRequestHeader("Authorization", "Bearer " + this.props.token);
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                console.log(JSON.parse(req.responseText));
                _this.setUpSocketsToGame(gameName);
            }
        };
        req.send();
    };
    GamePage.prototype.setUpSocketsToGame = function (gameName) {
        // console.log("try to set up sockets");
        var _this = this;
        var socket = new WebSocket("ws://localhost:8081");
        socket.onopen = function () {
            socket.send(JSON.stringify({
                type: "auth",
                roomTitle: _this.props.match.params.id,
                gameTitle: gameName,
                user: {
                    nickname: "lol"
                }
            }));
        };
        socket.onmessage = function (event) {
            var incomingMessage = event.data;
            console.log(incomingMessage);
        };
        // socket.send(JSON.stringify({
        //     type: this.type.value,
        //     message: outgoingMessage
        // }));
        this.setState({
            game: gameName
        });
    };
    GamePage.prototype.componentDidMount = function () {
        this.getGamesList();
    };
    GamePage.prototype.render = function () {
        var _this = this;
        if (this.state.game) {
            return React.createElement(LazyLoad_1.default, { resolve: function () { return Promise.resolve().then(function () { return require('../../games/WhosBigger/client'); }); } });
        }
        else {
            var list = this.state.gameList.map(function (game, index) {
                return (React.createElement("li", { key: index },
                    React.createElement("button", { onClick: function () { _this.chooseGame(game); } }, game)));
            });
            return (React.createElement("div", null,
                React.createElement("ul", null, list)));
        }
    };
    return GamePage;
}(React.Component));
exports.default = GamePage;
