const express = require("express")
const router = express.Router()

const {queryCalculate} = require("../controllers/calc")

router.get("/", queryCalculate)

module.exports = router