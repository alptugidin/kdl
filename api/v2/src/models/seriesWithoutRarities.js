const mongoose = require("mongoose")

let seriesWithoutRarity = mongoose.model("seriesWithoutRarity", {
    idx: String,
    name: String,
    year: String,
    tags: [],
    aka: [],
    co: Number,
    summary: String,
    summaryLink: String,
    video: String,
    title: String,
})


module.exports = {
    seriesWithoutRarity
}