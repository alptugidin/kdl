const express = require("express")
const router = express.Router()

const {queryTags} = require("../controllers/tags")

router.get("/", queryTags)

module.exports = {
    router
}