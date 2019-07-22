"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express = require("express");
var app_1 = require("./app");
var server = express();
var app = new app_1.GameBookApp(server);
app.init(2503).then(function () {
    console.log("why are you running on 2503?");
});
