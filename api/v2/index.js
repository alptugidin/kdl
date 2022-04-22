const express = require("express")
const app = express()

const {popularRoute, calcRoute, seriesRoute, tagCalcRoute, tagsRoute, logRoute} = require("./src/routes")
const loaders = require("./src/loaders/db")

loaders.connectDb().then(r => r)

app.use("/populars", popularRoute)
app.use("/calc", calcRoute)
app.use("/series", seriesRoute)
app.use("/tagCalc", tagCalcRoute)
app.use("/tags", tagsRoute)
app.use("/log", logRoute)

module.exports = app