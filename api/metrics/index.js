const fs = require("fs")
const express = require("express");
const app = express();
const bodyParser = require("body-parser")

app.use(bodyParser.text())
app.use((req, res) => {
    res.sendStatus(204)
    fs.appendFile("./log.txt", req.body + "\n", e => e)
});


module.exports = {
    path: "/api/metrics", handler: app,
};
