const express = require("express");
const app = express();

// app.post("/", (req, res) => {
//   console.log(req.query);
//   res.send("data from metrics.js");
// });





module.exports = {
  path: "/api/metrics", handler: app,
};
