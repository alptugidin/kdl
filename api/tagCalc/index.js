const express = require("express");
const app = express();
const mongoose = require("mongoose");


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

app.use((req, res) => {
  const reqData = Object.values(req.query)[0]

  /*
  * 0-29
  * 30-59
  * 60-89
  * 90-119
  */

  const pageString = req.query.page
  const page = Number(pageString)
  let start = 0
  let stop = 0

  if (page === 1) {
    // console.log(0 + " and " + 29)
    start = 0
    stop = 60
  } else {
    // console.log((page - 1) * 30 + " and " + ((page * 30) - 1))
    start = page * 60 - 60
    stop = page * 60
  }

  const findInDb = reqData.split("--").map(e => e.replaceAll("_", " "))
  mongoose.connect("mongodb://localhost:27017/kdramalike2")
  // mongoose.connect("mongodb://kdramalike:aLp+905547528301aLp@localhost:27017/kdramalike?authSource=admin")
    .catch(err => console.log("mconnect err >> " + err))
    .then(r => {
      seriesWithoutRarity.find({tags: {$all: findInDb,}}, (err, data) => {
        err ? console.log(err) : null
        const pocketRaw = data.sort((a, b) => b.year - a.year)
        const pocket = pocketRaw.slice(start, stop)

        const arr = []
        pocket.forEach(e => {
          arr.push({
            idx: e.idx,
            name: e.name,
            year: e.year,
            summary: e.summary,
            summaryLink: e.summaryLink,
            title: e.title,
            video: e.video,
            co: 0
          })
        })

        // pocket.push(data.length)

        arr.push(data.length)
        res.send(arr)
      })
    })
})


module.exports = {
  path: "/api/tagCalc", handler: app,
};


