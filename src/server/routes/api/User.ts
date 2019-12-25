
import { Router } from "express";

import { User } from "../../../models/User";
import { Token } from "../../../models/Token";
import emailsender from "../../services/email";
import { auth } from "../../middleware/auth";

import * as crypto from "crypto";
import * as bcrypt from "bcryptjs";
import * as config from "config";
import * as jwt from "jsonwebtoken";
import * as nodemailer from "nodemailer";
const router = Router();

router.post('/', (req, res) => {

    const { nickname, email, password } = req.body;

    if (!nickname || !email || !password) {
        return res.status(400).json({ data: "Not all requirments filled" })
    }

    User.findOne({ email })
        .then((user) => {
            if (user) {
                return res.status(400).json({ data: "User already exists" });
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
                                        html: 'Follow link to verify youself <strong>http://' + req.headers.host + '/confirmation/' + t.token + '</strong> <br/>, after redirect to login just enter your creditals',
                                    }).then((request) => {
                                        res.status(201).json({ data: 'A verification email has been sent to <b>' + user.email + '</b><br/> Check spam too)' });
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

router.post('restore', (req, res) => {
    const { email } = req.body;

    if (!email) {
        return res.status(400).json({ data: "Not all requirments filled" })
    }

    User.findOne({ email })
        .then((user) => {
            if (!user) {
                return res.status(201).json({ data: `Email sent to user ${email} (or not)` });
            }

            const token = new Token({ _userId: user._id, token: crypto.randomBytes(16).toString('hex') });
            token.save()
                .then(function (t) {
                    emailsender.send({
                        to: user.email,
                        from: 'odmen@games-book.com',
                        subject: 'Password restore email',
                        text: 'and easy to do anywhere, even with Node.js',
                        html: 'Follow link to restore password <strong>http://' + req.headers.host + '/api/user/restore/' + t.token + '</strong> <br/>',
                    }).then((request) => {
                        res.status(201).json({ data: `Email sent to user ${email}` });
                    }).catch((err) => {
                        return res.status(500).send({ msg: err.message });
                    })
                })
        });
})

router.post('restore/:id', (req,res) => {
    const { password } = req.body;
    Token.findOne({ token: req.params.token }, (err, token) => {
        if (!token) return res.status(400).send({
            type: "not-verified",
            data: "We were unable to find a valid token. Your token may have expired."
        });

        User.findOne({ _id: token._userId }, (err, user) => {
            if (!user) return res.status(400).send({
                type: "token-not-found",
                data: "We were unable to find a user for this token."
            });

            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(password, salt, (errInner, hash) => {
                    user.password = hash;
                    user.save((err) => {
                        res.json({
                            data: "Password changed! Please enter with new creds"
                        })
                    })
                })
            })


        });

    })
});

router.post('change-pass', auth, (req,res) => {
    const { password, new_pass, user } = req.body;

    console.log(user);

})

export const UserRoutes = router;
export const ConfirmRoutes = Router().get("/:token", (req, res) => {
    Token.findOne({ token: req.params.token }, (err, token) => {
        if (!token) return res.status(400).send({
            type: "not-verified",
            data: "We were unable to find a valid token. Your token may have expired."
        });

        // If we found a token, find a matching user
        User.findOne({ _id: token._userId }, (err, user) => {
            if (!user) return res.status(400).send({
                type: "token-not-found",
                data: "We were unable to find a user for this token."
            });

            if (user.isVerified) return res.status(400).send({
                type: "already-verified",
                data: "This user has already been verified."
            });

            // Verify and save the user
            user.isVerified = true;
            user.save(async (err) => {
                if (err) { return res.status(500).send({ data: err.message }); }

                await token.remove();

                res.redirect("../login");
            });
        });
    });
});

