const {getSeries} = require("../service/series")

const querySeries = (req, res) => {

    getSeries(req.query.q).then(data => {
        let pocket = []
        let i = 0
        data.forEach(element => {
            pocket[i] = [element.idx, element.name, element.year]
            i++
        })

        res.send(pocket);
    })

}


module.exports = {
    querySeries
}