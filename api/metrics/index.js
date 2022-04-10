const fs = require("fs")
const express = require("express");
const app = express();
const bodyParser = require("body-parser")

app.use(bodyParser.text())
app.use((req, res) => {
    res.sendStatus(204)
    // const days = ["Paz", "Pzt", "Sal", "Çar", "Per", "Cum", "Cmt"]
    // const months = ["Ocak", "Şubat", "Mart", "Nisan", "Mayıs", "Haziran", "Temmuz", "Ağustos", "Eylül", "Ekim", "Kasım", "Aralık"]
    // const date = new Date().getDate() + months[new Date().getMonth()] + days[new Date().getDay()] + new Date().getFullYear()
    fs.appendFile("./logs/logs.txt", req.body + "\n", e => {
        e !== null ? console.log(e) : null
    })
});


module.exports = {
    path: "/api/metrics", handler: app,
};
