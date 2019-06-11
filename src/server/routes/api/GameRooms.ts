
import {Router} from "express";

import {GameRoom} from "../../../models/GameRoom";

import {auth} from "../../middleware/auth";

const router = Router();

// @route GET api/gameroom
// @access public
router.get('/', auth, (req, res) => {
    GameRoom.find()
        .sort({ date: -1 })
        .then((gamerooms) => {
            res.json(gamerooms);
        })
})

// @route POST api/gameroom
// @access public
router.post('/', auth, (req, res) => {
    const newGameRoom = new GameRoom({
        name: req.body.name
    });

    newGameRoom.save()
        .then((gameroom) => {
            res.json(gameroom);
        })
    
})

// @route DELETE api/gameroom/:id
// @access public
router.delete('/:id', auth, (req, res) => {
    GameRoom.findById(req.params.id)
        .then((gameroom) => {
            gameroom.remove()
                .then(() => {
                    res.json({success: true});
                })
        })
        .catch((err) => {
            res.status(404).json({success: false})
        });
})


export default router;