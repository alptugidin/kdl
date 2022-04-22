const express = require("express")
const router = express.Router()

const {logging} = require("../controllers/log")

router.use(express.text())
router.use(express.urlencoded({extended: true}))
router.post("/", logging)


module.exports = router