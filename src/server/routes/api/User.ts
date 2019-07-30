
import { Router } from "express";

import { User } from "../../../models/User";
import { Token } from "../../../models/Token";
import emailsender from "../../services/email";
import * as crypto from "crypto";
import * as bcrypt from "bcryptjs";
import * as config from "config";
import * as jwt from "jsonwebtoken";
import * as nodemailer from "nodemailer";
const router = Router();

router.post('/', (req, res) => {

    const { nickname, email, password } = req.body;

    if( !nickname || !email || !password) {
        return res.status(400).json({data : "Not all requirments filled"})
    }

    User.findOne({ email })
        .then((user) => {
            if(user) {
                return res.status(400).json({data: "User already exists"});
            }

            const newUser = new User({
                nickname, email, password
            });
            
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (errInner, hash) => {
                    newUser.password = hash;
                    newUser.save()
                        .then((user) => {

                            const token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
                            token.save()
                                .then(function (t) {

                                emailsender.send({
                                    to: user.email,
                                    from: 'odmen@games-book.com',
                                    subject: 'Verification email',
                                    text: 'and easy to do anywhere, even with Node.js',
                                    html: 'Follow link to verify youself <strong>http://' + req.headers.host + '/confirmation/' + t.token +'</strong> <br/> after redirect to login just enter your creditals',
                                  }).then((request) => {
                                    res.status(201).json({data: 'A verification email has been sent to <b>' + user.email + '</b><br/> Check spam too)'});
                                  }).catch((err) => {
                                    return res.status(500).send({ msg: err.message });
                                  })
                            })

                            // USER LOGIN
                            // jwt.sign({id: user.id},
                            //     config.get("jwtSecret"),
                            //     { expiresIn: 3600 },
                            //     (err, token) => {
                            //         res.json({
                            //             user,
                            //             token
                            //         })
                            //     });
                        })
                })
            })
        })
    
})



export default router;