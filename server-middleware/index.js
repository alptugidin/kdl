const express = require("express")
const app = express()

app.use(express.json())

app.get("/", (req, res) => {
    console.log("okkkk")
    res.send("tesGet working...")
})

module.exports = app