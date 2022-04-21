const {Serie} = require("../models/series")

const getSeries = (regex) => {
    return Serie.find({name: {$regex: regex, $options: "i"}}).limit(10)
}


module.exports = {
    getSeries
}