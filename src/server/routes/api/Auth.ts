
import { Router } from "express";

import { User } from "../../../models/User";
import { auth } from "../../middleware/auth";
import { Token } from "../../../models/Token";


import * as bcrypt from "bcryptjs";
import * as config from "config";
import * as jwt from "jsonwebtoken";

const router = Router();

router.post("/", (req, res) => {

    const { email, password } = req.body;

    if (!email || !password) {
        return res.status(400).json({
            data: "Not all requirments filled",
            type: "not-filled"
        })
    }

    User.findOne({ email })
        .then((user) => {
            if (!user) {
                return res.status(400).json({
                    data: "User doesn`t exist",
                    type: "user-not-found"
                });
            }

            bcrypt.compare(password, user.password)
                .then((isMatch) => {
                    if (!isMatch) return res.status(400).json({
                        data: "Invalid creditals",
                        type: "pass-failed"
                    });
                    jwt.sign({ id: user.id }, config.get("jwtSecret"), { expiresIn: 3600 }, (err, token) => {

                        if (!user.isVerified) {
                            return res.status(400).json({
                                data: "User is not verified",
                                type: "user-not-verified"
                            });
                        } else {
                            res.json({
                                token
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
