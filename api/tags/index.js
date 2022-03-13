const express = require("express");
const app = express();
const mongoose = require("mongoose");

const Tags = mongoose.model("Tags", {
    tag: String,
})


app.use((req, res) => {
    // mongoose.connect("mongodb://kdramalike:aLp+905547528301aLp@localhost:27017/kdramalike?authSource=admin")
    mongoose.connect("mongodb://localhost:27017/kdramalike2")

        .then((r) => {
            const reqData = Object.values(req.query)[0]
            Tags.find({tag: {$regex: reqData, $options: "i"}}, (err, data) => {
                err ? console.log("TAG ERROR " + err) : null
                const pocket = []
                data.forEach(element => {
                    pocket.push(element.tag)
                })
                res.send(pocket)
            }).limit(10)
        })
        .catch(err => {
            console.log("TAG ERROR: " + err)
        })
})


module.exports = {
    path: "/api/tags", handler: app,
};
