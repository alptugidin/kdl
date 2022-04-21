const {getPopular} = require("../service/popular")


const queryPopular = (req, res) => {

    getPopular(req.query.q).then(response => {

        const pocket = []
        response[0].data.forEach(element => {
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


    }).catch(err => {
        console.log("err in controllers >> " + err)
    })
}

module.exports = {
    queryPopular
}