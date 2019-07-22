"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var User_1 = require("../../../models/User");
var auth_1 = require("../../middleware/auth");
var bcrypt = require("bcryptjs");
var config = require("config");
var jwt = require("jsonwebtoken");
var router = express_1.Router();
router.post('/', function (req, res) {
    var _a = req.body, email = _a.email, password = _a.password;
    if (!email || !password) {
        return res.status(400).json({ msg: "not all field" });
    }
    User_1.User.findOne({ email: email })
        .then(function (user) {
        if (!user) {
            return res.status(400).json({ msg: "user does not exist" });
        }
        bcrypt.compare(password, user.password)
            .then(function (isMatch) {
            if (!isMatch)
                return res.status(400).json({ msg: "Invalid creditals" });
            jwt.sign({ id: user.id }, config.get("jwtSecret"), { expiresIn: 3600 }, function (err, token) {
                res.json({
                    token: token, user: user
                });
            });
        });
    });
});
router.get("/user", auth_1.auth, function (req, res) {
    User_1.User.findById(req.user.id)
        .select("-password")
        .then(function (user) {
        res.json(user);
    });
});
exports.default = router;
