const express = require("express");
const app = express();
const mongoose = require("mongoose");

const Popular = mongoose.model("Popular", {
  popYear: String,
  data: []
});


app.use((req, res) => {

  const reqData = Object.values(req.query)[0]
  // mongoose.connect("mongodb://kdramalike:aLp+905547528301aLp@localhost:27017/kdramalike?authSource=admin")
  mongoose.connect("mongodb://localhost:27017/kdramalike2")

      .then(r => {
      Popular.find({popYear: reqData}, ((err, data) => {
        if (err) {
          console.log("POPULAR ERROR " + err)
        }

        // console.log(data[0])

        // console.log(data[0].data[0])

        const pocket = []
        data[0].data.forEach(element => {
          const serie = {
            idx: element.idx,
            name: element.name,
            year: element.year,
            summary: element.summary,
            summaryLink: element.summaryLink,
            video: element.video,
            title: element.title,
            co: 0
          }

          pocket.push(serie)

        })

        res.send(pocket)
      }))
    })
    .catch(err => {
      console.log("POPULAR ERROR" + err)
    })

})


module.exports = {
  path: "/api/populars", handler: app,
};
