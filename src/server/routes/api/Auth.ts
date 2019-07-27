
import { Router } from "express";

import { User } from "../../../models/User";
import {auth} from "../../middleware/auth";

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
                        res.json({
                            token, user
                        })
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



export default router;