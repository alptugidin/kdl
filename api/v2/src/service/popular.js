const {Popular} = require("../models/popular")

const getPopular = (year) => {
    return Popular.find({popYear: year})
}

module.exports = {getPopular}

