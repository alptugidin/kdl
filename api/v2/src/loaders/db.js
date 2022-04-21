const mongoose = require("mongoose")

mongoose.connection.once("open", (err, state) => {
    if (err) {
        console.log("Loading error : " + err)
    }
})

const connectDb = async () => {
    await mongoose.connect(process.env.CURRENT_DB)
}


module.exports = {
    connectDb
}

