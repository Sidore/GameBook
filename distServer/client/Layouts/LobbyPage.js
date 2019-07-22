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
var react_router_dom_1 = require("react-router-dom");
var LobbyPage = /** @class */ (function (_super) {
    __extends(LobbyPage, _super);
    function LobbyPage(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            roomName: "",
            rooms: [],
            roomLink: ""
        };
        _this.createRoom = _this.createRoom.bind(_this);
        _this.getRooms = _this.getRooms.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        _this.chooseRoom = _this.chooseRoom.bind(_this);
        return _this;
    }
    LobbyPage.prototype.createRoom = function () {
        var _this = this;
        var req = new XMLHttpRequest();
        req.open('POST', 'http://localhost:2503/api/gameroom');
        req.setRequestHeader("Content-Type", "application/json");
        req.setRequestHeader("Authorization", "Bearer " + this.props.token);
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                //   document.getElementById("output").innerHTML = req.responseText;
                console.log(JSON.parse(req.responseText));
                _this.setState({
                    roomName: ""
                });
                _this.getRooms();
            }
        };
        req.send(JSON.stringify({
            name: this.state.roomName
        }));
    };
    LobbyPage.prototype.chooseRoom = function (roomName) {
        this.setState({
            roomLink: roomName
        });
    };
    LobbyPage.prototype.getRooms = function () {
        var _this = this;
        var req = new XMLHttpRequest();
        req.open('GET', 'http://localhost:2503/api/gameroom');
        req.setRequestHeader("Content-Type", "application/json");
        req.setRequestHeader("Authorization", "Bearer " + this.props.token);
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                if (req.status == 200) {
                    var response = JSON.parse(req.responseText);
                    console.log(response);
                    _this.setState({
                        rooms: response
                    });
                }
            }
        };
        req.send();
    };
    LobbyPage.prototype.handleChange = function (event) {
        var _a;
        var target = event.target;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        var name = target.name;
        this.setState((_a = {},
            _a[name] = value,
            _a));
    };
    LobbyPage.prototype.componentWillMount = function () {
        this.getRooms();
    };
    LobbyPage.prototype.render = function () {
        var _this = this;
        if (this.state.roomLink) {
            var link = "/rooms/" + this.state.roomLink;
            return React.createElement(react_router_dom_1.Redirect, { to: link });
        }
        var list = this.state.rooms.map(function (el, index) {
            return (React.createElement("li", { key: index },
                React.createElement("button", { onClick: function () { return _this.chooseRoom(el.name); } }, el.name)));
        });
        return (React.createElement("div", null,
            React.createElement("div", null, "User info"),
            React.createElement("div", null,
                React.createElement("div", null, "Last games"),
                React.createElement("div", null, "filter"),
                React.createElement("div", null,
                    "games list",
                    React.createElement("ul", null, list))),
            React.createElement("div", null,
                React.createElement("label", null,
                    "room name:",
                    React.createElement("input", { type: "text", name: "roomName", value: this.state.roomName, onChange: this.handleChange })),
                React.createElement("button", { onClick: this.createRoom }, "create new room"))));
    };
    return LobbyPage;
}(React.Component));
exports.default = LobbyPage;
