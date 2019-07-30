
import { Router } from "express";

import { User } from "../../../models/User";
import {auth} from "../../middleware/auth";
import { Token } from "../../../models/Token";


import * as bcrypt from "bcryptjs";
import * as config from "config";
import * as jwt from "jsonwebtoken";

const router = Router();

router.post('/', (req, res) => {

    const { email, password } = req.body;

    if( !email || !password) {
        return res.status(400).json({data : "Not all requirments filled"})
    }

    User.findOne({ email })
        .then((user) => {
            if(!user) {
                return res.status(400).json({data: "User doesn`t exist"});
            }
            
            bcrypt.compare(password, user.password)
                .then((isMatch) => {
                    if (!isMatch) return res.status(400).json({data : "Invalid creditals"});
                    jwt.sign({ id : user.id} , config.get("jwtSecret"), {expiresIn : 3600}, (err, token) => {

                        if (!user.isVerified) {
                            return res.status(400).json({data : "User is not verified"});
                        } else {
                            res.json({
                                token, user
                            })
                        }
                        
                    });
                })
        })
    
});

router.get("/user", auth, (req: any, res) => {
    User.findById(req.user.id)
        .select("-password")
        .then((user) => {
            res.json(user);
        })
})



export const AuthRoutes = router;
export const ConfirmRoutes = Router().get("/:token", (req, res) => {
    // console.log(req.body)
    Token.findOne({ token: req.params.token }, function (err, token) {
        if (!token) return res.status(400).send({ type: 'not-verified', data: 'We were unable to find a valid token. Your token my have expired.' });
 
        // If we found a token, find a matching user
        User.findOne({ _id: token._userId }, function (err, user) {
            if (!user) return res.status(400).send({ msg: 'We were unable to find a user for this token.', data : {
                // user : token._userId,
                token: req.params.token,
                tokenObj : token
            } });
            if (user.isVerified) return res.status(400).send({ type: 'already-verified', msg: 'This user has already been verified.' });
 
            // Verify and save the user
            user.isVerified = true;
            user.save(function (err) {
                if (err) { return res.status(500).send({ msg: err.message }); }
                res.redirect('../login');
            });
        });
    });
})