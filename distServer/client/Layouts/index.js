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
var __assign = (this && this.__assign) || function () {
    __assign = Object.assign || function(t) {
        for (var s, i = 1, n = arguments.length; i < n; i++) {
            s = arguments[i];
            for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
                t[p] = s[p];
        }
        return t;
    };
    return __assign.apply(this, arguments);
};
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
// import Counter from "../components/Counter";
var LobbyPage_1 = require("./LobbyPage");
var AuthPage_1 = require("./AuthPage");
var GamePage_1 = require("./GamePage");
var react_router_dom_1 = require("react-router-dom");
var MainLayout = /** @class */ (function (_super) {
    __extends(MainLayout, _super);
    function MainLayout(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            token: ""
        };
        _this.tokenHandler = _this.tokenHandler.bind(_this);
        return _this;
    }
    MainLayout.prototype.tokenHandler = function (token) {
        this.setState({
            token: token
        });
    };
    MainLayout.prototype.render = function () {
        var _this = this;
        return (React.createElement("div", null,
            React.createElement(react_router_dom_1.BrowserRouter, null,
                React.createElement("div", null,
                    React.createElement("nav", null,
                        React.createElement("ul", null,
                            React.createElement("li", null,
                                React.createElement(react_router_dom_1.Link, { to: "/" }, "Lobby")),
                            React.createElement("li", null,
                                React.createElement(react_router_dom_1.Link, { to: "/login" }, "Login")),
                            React.createElement("li", null,
                                React.createElement(react_router_dom_1.Link, { to: "/rooms/lol" }, "Game")))),
                    React.createElement(react_router_dom_1.Route, { path: "/login", render: function () { return (_this.state.token ?
                            (React.createElement(react_router_dom_1.Redirect, { to: "/" })) :
                            (React.createElement(AuthPage_1.default, { onToken: _this.tokenHandler }))); } }),
                    React.createElement(react_router_dom_1.Route, { path: "/", exact: true, render: function () { return (!_this.state.token ?
                            (React.createElement(react_router_dom_1.Redirect, { to: "/login" })) :
                            (React.createElement(LobbyPage_1.default, { token: _this.state.token }))); } }),
                    React.createElement(react_router_dom_1.Route, { path: "/rooms/:id", render: function (props) { return (!_this.state.token ?
                            (React.createElement(react_router_dom_1.Redirect, { to: "/login" })) :
                            (React.createElement(GamePage_1.default, __assign({ token: _this.state.token }, props)))); } }))),
            React.createElement("hr", null),
            React.createElement("i", null, this.state.token)));
    };
    return MainLayout;
}(React.Component));
exports.default = MainLayout;
