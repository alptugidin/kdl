const mongoose = require("mongoose")

mongoose.connection.once("open", (err, state) => {
    if (err) {
        console.log("Loading error : " + err)
    }
})

const connectDb = async () => {
    await mongoose.connect("mongodb://localhost:27017/kdramalike2")
}


module.exports = {
    connectDb
}

