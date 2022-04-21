const express = require("express")
const app = express()

const {popularRoute, calcRoute} = require("./src/routes")
const loaders = require("./src/loaders/db")

app.use(express.json())
loaders.connectDb().then(r => r)

app.use("/populars", popularRoute.router)
app.use("/calc", calcRoute.router)
module.exports = app