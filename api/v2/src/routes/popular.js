const express = require("express")
const router = express.Router()
const {queryPopular} = require("../controllers/popular")

router.get("/", queryPopular)


module.exports = {
    router
}