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
var AuthPage = /** @class */ (function (_super) {
    __extends(AuthPage, _super);
    function AuthPage(props) {
        var _this = _super.call(this, props) || this;
        _this.state = {
            newUser: false,
            password: "",
            nickname: "",
            email: "",
            token: ""
        };
        _this.toggleHandler = _this.toggleHandler.bind(_this);
        _this.register = _this.register.bind(_this);
        _this.login = _this.login.bind(_this);
        _this.handleChange = _this.handleChange.bind(_this);
        return _this;
    }
    AuthPage.prototype.toggleHandler = function (params) {
        this.setState({
            newUser: !this.state.newUser
        });
    };
    AuthPage.prototype.register = function () {
        var _this = this;
        var creds = {
            email: this.state.email,
            password: this.state.password,
            nickname: this.state.nickname
        };
        console.log("register with creds", creds);
        var req = new XMLHttpRequest();
        req.open('POST', 'http://localhost:2503/api/user');
        req.setRequestHeader("Content-Type", "application/json");
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                console.log(JSON.parse(req.responseText));
                _this.setState({
                    token: JSON.parse(req.responseText).token
                });
                _this.props.onToken(_this.state.token);
            }
        };
        req.send(JSON.stringify(creds));
    };
    AuthPage.prototype.login = function () {
        var _this = this;
        var creds = {
            email: this.state.email,
            password: this.state.password
        };
        console.log("login with creds", creds);
        var req = new XMLHttpRequest();
        req.open('POST', 'http://localhost:2503/api/auth');
        req.setRequestHeader("Content-Type", "application/json");
        req.onreadystatechange = function () {
            if (req.readyState == 4) {
                console.log(JSON.parse(req.responseText));
                _this.setState({
                    token: JSON.parse(req.responseText).token
                });
                _this.props.onToken(_this.state.token);
            }
        };
        req.send(JSON.stringify(creds));
    };
    AuthPage.prototype.handleChange = function (event) {
        var _a;
        var target = event.target;
        var value = target.type === 'checkbox' ? target.checked : target.value;
        var name = target.name;
        this.setState((_a = {},
            _a[name] = value,
            _a));
    };
    AuthPage.prototype.render = function () {
        var form;
        if (this.state.newUser) {
            form = React.createElement("div", null,
                React.createElement("label", null,
                    "Email:",
                    React.createElement("input", { type: "text", name: "email", value: this.state.email, onChange: this.handleChange })),
                React.createElement("br", null),
                React.createElement("label", null,
                    "Password:",
                    React.createElement("input", { type: "text", name: "password", value: this.state.password, onChange: this.handleChange })),
                React.createElement("br", null),
                React.createElement("label", null,
                    "Nickname:",
                    React.createElement("input", { type: "text", name: "nickname", value: this.state.nickname, onChange: this.handleChange })),
                React.createElement("br", null),
                React.createElement("button", { onClick: this.register }, "Register"));
        }
        else {
            form = React.createElement("div", null,
                React.createElement("label", null,
                    "Email:",
                    React.createElement("input", { type: "text", name: "email", value: this.state.email, onChange: this.handleChange })),
                React.createElement("br", null),
                React.createElement("label", null,
                    "Password:",
                    React.createElement("input", { type: "text", name: "password", value: this.state.password, onChange: this.handleChange })),
                React.createElement("br", null),
                React.createElement("button", { onClick: this.login }, "Login"));
        }
        return (React.createElement("div", null,
            React.createElement("div", null,
                "New user? ",
                React.createElement("br", null),
                React.createElement("input", { type: "checkbox", checked: this.state.newUser, onChange: this.toggleHandler.bind(this) })),
            form));
    };
    return AuthPage;
}(React.Component));
exports.default = AuthPage;
