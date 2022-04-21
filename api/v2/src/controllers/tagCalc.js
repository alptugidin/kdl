const {getTagCalc} = require("../service/tagCalc")

const queryTagCalc = (req, res) => {
    getTagCalc(req.query.q).then(data => {
        const page = Number(req.query.page)
        let start = 0
        let stop = 0

        if (page === 1) {
            start = 0
            stop = 60
        } else {
            start = page * 60 - 60
            stop = page * 60
        }

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


        arr.push(data.length)
        res.send(arr)


    })
}

module.exports = {
    queryTagCalc
}