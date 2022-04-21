const mongoose = require("mongoose")

mongoose.connection.once("open", () => {
    console.log("DB WORKING...")
})

const connectDb = async () => {
    await mongoose.connect("mongodb://localhost:27017/kdramalike2")
}


module.exports = {
    connectDb
}

