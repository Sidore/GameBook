"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var config = require("config");
var jwt = require("jsonwebtoken");
function auth(req, res, next) {
    var token = req.header("Authorization");
    if (!token)
        return res.status(401).json({ msg: "No token, authorizaton denied" });
    try {
        // Verify token
        var decoded = jwt.verify(token.split(" ")[1], config.get("jwtSecret"));
        // Add user from payload
        req.user = decoded;
        next();
    }
    catch (e) {
        res.status(400).json({ msg: "Token is not valid" });
    }
}
exports.auth = auth;
