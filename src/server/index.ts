import * as express from "express";

const app = express();

app.get("/", (req, res) => {
    res.send("hello1");
});

app.listen(2503, () => {
    console.log("why are you running?!")
})