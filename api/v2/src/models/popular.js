const mongoose = require("mongoose")

const Popular = mongoose.model("Popular", {
    popYear: String,
    data: []
})

module.exports = {
    Popular
}


