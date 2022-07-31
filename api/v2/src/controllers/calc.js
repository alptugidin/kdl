const {getCalculate} = require("../service/calc")

const queryCalculate = (req, res) => {
    getCalculate().then(data => {

        const allData = data
        const selectedData = data.find(e => e.idx === req.query.q)

        const queryName = selectedData.name;
        const queryTags = selectedData.tags;
        const queryTagsCount = selectedData.tags.length;
        let pocketRaw = [];
        let i = 0;
        let k = 0;
        let sum = 0;

        allData.forEach((element) => {
            const name = element.name;
            const tagCount = element.tags.length;
            const year = element.year;
            const summary = element.summary;
            const summaryLink = element.summaryLink;
            const video = element.video;
            const title = element.title;
            const idx = element.idx;
            const commonTags = []
            queryTags.forEach((element1) => {

                allData[i].tags.forEach((element2) => {
    
                    if (element1[0] === element2[0]) {
                        k++;
                        sum += element2[1]
                        commonTags.push(element1[0])
                    }
                });
            });

            const co2 = (k + sum) / ((queryTagsCount + tagCount) / 2)
            pocketRaw[i] = [co2.toFixed(2), name, year, summary, summaryLink, video, title, idx, commonTags];

            i++
            k = 0
            sum = 0
        });

        pocketRaw.sort((a, b) => b[0] - a[0]);
        let pocket = pocketRaw.slice(0, 91); 
        pocket.push(selectedData); 

        res.send(pocket)
    })
        .catch(err => {
            res.send(404)
        })

}


module.exports = {queryCalculate}
