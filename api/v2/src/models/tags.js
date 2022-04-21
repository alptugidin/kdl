const mongoose = require("mongoose");
const Tags = mongoose.model("Tags", {
    tag: String,
})

module.exports = {
    Tags
}


