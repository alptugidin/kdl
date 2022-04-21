const {getCalculate} = require("../service/calc")

const queryCalculate = (req, res) => {

    getCalculate().then(data => {
        const sendingData = {
            len: data.length
        }
        res.send(sendingData)
    })

}


module.exports = {queryCalculate}