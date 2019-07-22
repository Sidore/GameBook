"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var express_1 = require("express");
var GameRoom_1 = require("../../../models/GameRoom");
var auth_1 = require("../../middleware/auth");
var GameFabric_1 = require("../../../controllers/GameFabric");
var EventEmmiter_1 = require("../../../controllers/EventEmmiter");
var router = express_1.Router();
// @route GET api/gameroom
// @access public
router.get('/', auth_1.auth, function (req, res) {
    GameRoom_1.GameRoom.find()
        .sort({ date: -1 })
        .then(function (gamerooms) {
        res.json(gamerooms);
    });
});
// @route POST api/gameroom
// @access public
router.post('/', auth_1.auth, function (req, res) {
    var newGameRoom = new GameRoom_1.GameRoom({
        name: req.body.name
    });
    newGameRoom.save()
        .then(function (gameroom) {
        EventEmmiter_1.default.emit("gameroom.created", gameroom);
        res.json(gameroom);
    });
});
// @route GET api/gameroom/:id/game
// @access public
router.get('/:id/game', auth_1.auth, function (req, res) {
    res.json(GameFabric_1.default.getList());
});
// @route POST api/gameroom/:id/game/:name
// @access public
router.post('/:id/game/:name', auth_1.auth, function (req, res) {
    GameRoom_1.GameRoom.findOne({ name: req.params.id })
        .then(function (gameroom) {
        var gameItem = GameFabric_1.default.create(req.params.name);
        gameroom.game = gameItem;
        gameroom.save()
            .then(function () {
            res.json({ gameroom: gameroom, gameItem: gameItem });
        });
    })
        .catch(function (err) {
        res.status(404).json({ success: false, err: err });
    });
});
// @route DELETE api/gameroom/:id
// @access public
router.delete('/:id', auth_1.auth, function (req, res) {
    GameRoom_1.GameRoom.findById(req.params.id)
        .then(function (gameroom) {
        gameroom.remove()
            .then(function () {
            res.json({ success: true });
        });
    })
        .catch(function (err) {
        res.status(404).json({ success: false });
    });
});
exports.default = router;
