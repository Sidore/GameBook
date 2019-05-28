import * as config from "config";
import * as jwt from "jsonwebtoken";
import * as express from "express";

export function auth(req, res: express.Response, next: express.NextFunction) {
  const token = req.header("x-auth-token");

  if (!token)
    return res.status(401).json({ msg: "No token, authorizaton denied" });

  try {
    // Verify token
    const decoded = jwt.verify(token, config.get("jwtSecret"));
    // Add user from payload
    req.user = decoded;
    next();
  } catch (e) {
    res.status(400).json({ msg: "Token is not valid" });
  }
}
