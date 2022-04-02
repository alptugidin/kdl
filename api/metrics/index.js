const fs = require("fs")
const express = require("express");
const app = express();
const bodyParser = require("body-parser")

app.use(bodyParser.text())
app.use((req, res) => {
    res.sendStatus(204)
    const date = new Date().toLocaleDateString()

    fs.appendFile(`./logs/${date}.txt`, req.body + "\n", e => e)
});


module.exports = {
    path: "/api/metrics", handler: app,
};
