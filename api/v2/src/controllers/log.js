const fs = require("fs");

const logging = (req, res) => {
    res.sendStatus(204)

    fs.appendFile("./logs/logs.txt", req.body + "\n", e => {
        e !== null ? console.log(e) : null
    })
}


module.exports = {
    logging
}