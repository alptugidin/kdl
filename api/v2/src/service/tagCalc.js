const {seriesWithoutRarity} = require("../models/seriesWithoutRarities")

const getTagCalc = (value) => {
    const findInDb = value.split("--").map(e => e.replaceAll("_", " "))
    return seriesWithoutRarity.find({tags: {$all: findInDb,}})
}


module.exports = {
    getTagCalc
}