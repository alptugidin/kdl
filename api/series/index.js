const express = require("express");
const app = express();
const mongoose = require("mongoose");

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
});


mongoose.connect(`mongodb://localhost:27017/kdramalike2`)
// mongoose.connect("mongodb://kdramalike:aLp+905547528301aLp@localhost:27017/kdramalike?authSource=admin")
  .catch(err => {
    console.log("connect err > " + err)
  })
  .then(r =>
    app.use((req, res) => {
      const reqSource = Object.keys(req.query)[0]
      const reqData = Object.values(req.query)[0]

      Serie.find({name: {$regex: reqData, $options: "i"}}, (err, data) => {
        if (err) {
          console.log("LISTING ERROR " + err);
        }
        let pocket = []
        let i = 0
        data.forEach(element => {
          // pocket.push([element.idx, element.name, element.year])
          pocket[i] = [element.idx, element.name, element.year]
          i++
        })

        res.send(pocket);
      }).limit(10);
    })
  )


module.exports = {
  path: "/api/series", handler: app,
};




























