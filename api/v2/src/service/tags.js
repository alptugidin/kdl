const {Tags} = require("../models/tags")

const getTags = (regex) => {
    return Tags.find({tag: {$regex: regex, $options: "i"}}).limit(10)
}

module.exports = {
    getTags
}