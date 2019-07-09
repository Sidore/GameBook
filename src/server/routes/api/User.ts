
import { Router } from "express";

import { User } from "../../../models/User";

import * as bcrypt from "bcryptjs";
import * as config from "config";
import * as jwt from "jsonwebtoken";

const router = Router();

router.post('/', (req, res) => {

    const { nickname, email, password } = req.body;

    if( !nickname || !email || !password) {
        return res.status(400).json({msg : "not all field"})
    }

    User.findOne({ email })
        .then((user) => {
            if(user) {
                return res.status(400).json({msg: "user already exists"});
            }

            const newUser = new User({
                nickname, email, password
            });
            
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (errInner, hash) => {
                    newUser.password = hash;
                    newUser.save()
                        .then((user) => {
                            jwt.sign({id: user.id},
                                config.get("jwtSecret"),
                                { expiresIn: 3600 },
                                (err, token) => {
                                    res.json({
                                        user,
                                        token
                                    })
                                });
                        })
                })
            })
        })
    
})



export default router;