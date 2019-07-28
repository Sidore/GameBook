
import { Router } from "express";

import { User } from "../../../models/User";
import { Token } from "../../../models/Token";

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

                            // if (err) { return res.status(500).send({ msg: err.message }); }
 
                            // Create a verification token for this user
                            var token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
                     
                            // Save the verification token
                            token.save()
                                .then(function (t) {
                                // if (err) { return res.status(500).send({ msg: err.message }); }
                     
                                // Send the email
                                var transporter = nodemailer.createTransport({ service: 'Sendgrid', auth: { user: "sidore", pass: "NK9KaazjYfiE@ey" } });
                                var mailOptions = { from: 'no-reply@games-book.com', to: user.email, subject: 'Account Verification Token', text: 'Hello,\n\n' + 'Please verify your account by clicking the link: \nhttp:\/\/' + req.headers.host + '\/confirmation\/' + t.token + '.\n' };
                                transporter.sendMail(mailOptions, function (err) {
                                    if (err) { return res.status(500).send({ msg: err.message }); }
                                    res.status(200).send('A verification email has been sent to ' + user.email + '.');
                                });
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