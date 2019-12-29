import { Router } from "express";

import { GameRecord } from "../../../models/GameRecord";

import { auth } from "../../middleware/auth";

import ee from "../../../controllers/EventEmmiter"

const router = Router();

// @route GET api/gamerecord
// @access public
router.get('/', auth, (req, res) => {
    GameRecord.find()
        .sort({ date: -1 })
        .then((gamerecord) => {
            res.json(gamerecord);
        })
})

// @route POST api/gamerecord
// @access public
router.post('/', auth, (req, res) => {
    new GameRecord({
        title: req.body.title,
        url: req.body.url,
        logo: req.body.logo
    }).save()
        .then((gamerecord) => {
            ee.emit("gamerecord.created", gamerecord)
            res.json(gamerecord);
        })

})

// @route GET api/gamerecord/:id/game
// @access public
// router.get('/:id/game', auth, (req, res) => {

//     res.json(GameFabric.getList());

// })


// @route POST api/gamerecord/:id/game/:name
// @access public
// router.post('/:id/game/:name', auth, (req, res) => {
//     GameRecord.findOne({ name: req.params.id })
//         .then((gamerecord) => {
//             const gameItem = GameFabric.create(req.params.name);
//             // gamerecord.game = gameItem;
//             // TODO Game creation

//             gamerecord.save()
//                 .then(() => {
//                     res.json({ gamerecord, gameItem });
//                 })
//         })
//         .catch((err) => {
//             res.status(404).json({ success: false, err })
//         });

// })

// @route DELETE api/gamerecord/:id
// @access public
router.delete('/:id', auth, (req, res) => {
    GameRecord.findById(req.params.id)
        .then((gamerecord) => {
            gamerecord.remove()
                .then(() => {
                    res.json({ success: true });
                })
        })
        .catch((err) => {
            res.status(404).json({ success: false })
        });
})


export default router;