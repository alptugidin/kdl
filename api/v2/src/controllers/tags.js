const {getTags} = require("../service/tags")

const queryTags = (req, res) => {
    getTags(req.query.q).then(data => {
        const pocket = []
        data.forEach(element => {
            pocket.push(element.tag)
        })
        res.send(pocket)
    })
}


module.exports = {
    queryTags
}