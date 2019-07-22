"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var User_1 = require("../../../models/User");
var bcrypt = require("bcryptjs");
var config = require("config");
var jwt = require("jsonwebtoken");
var router = express_1.Router();
router.post('/', function (req, res) {
    var _a = req.body, nickname = _a.nickname, email = _a.email, password = _a.password;
    if (!nickname || !email || !password) {
        return res.status(400).json({ msg: "not all field" });
    }
    User_1.User.findOne({ email: email })
        .then(function (user) {
        if (user) {
            return res.status(400).json({ msg: "user already exists" });
        }
        var newUser = new User_1.User({
            nickname: nickname, email: email, password: password
        });
        bcrypt.genSalt(10, function (err, salt) {
            bcrypt.hash(newUser.password, salt, function (errInner, hash) {
                newUser.password = hash;
                newUser.save()
                    .then(function (user) {
                    jwt.sign({ id: user.id }, config.get("jwtSecret"), { expiresIn: 3600 }, function (err, token) {
                        res.json({
                            user: user,
                            token: token
                        });
                    });
                });
            });
        });
    });
});
exports.default = router;
