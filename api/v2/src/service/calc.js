const {Serie} = require("../models/series")

const getCalculate = () => {
    return Serie.find({})
}

module.exports = {getCalculate}
