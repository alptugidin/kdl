const express = require("express")
const app = express()

const {popularRoute, calcRoute, seriesRoute, tagCalcRoute, tagsRoute, logRoute} = require("./src/routes")
const loaders = require("./src/loaders/db")

loaders.connectDb().then(r => r)

app.use("/populars", popularRoute.router)
app.use("/calc", calcRoute.router)
app.use("/series", seriesRoute.router)
app.use("/tagCalc", tagCalcRoute.router)
app.use("/tags", tagsRoute.router)
app.use("/log", logRoute.router)

module.exports = app