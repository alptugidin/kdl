const express = require("express")
const router = express.Router()

const {querySeries} = require("../controllers/series")

router.get("/", querySeries)

module.exports = router