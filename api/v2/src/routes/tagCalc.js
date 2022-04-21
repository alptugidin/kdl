const express = require("express")
const router = express.Router()

const {queryTagCalc} = require("../controllers/tagCalc")

router.get("/", queryTagCalc)

module.exports = {
    router
}