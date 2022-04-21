const mongoose = require("mongoose")

const Serie = mongoose.model("Serie", {
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
    Serie
}