const mongoose = require("mongoose");

let logweb = new mongoose.Schema({
    ItemID: {
        type: String,
        required: true,
    },
    OrderID: {
        type: String,
        required: true,
    },
    Tries: {
        type: Number,
        required: true,
    },
    SuccessText: {
        type: String,
        required: true,
    },
    FailedText: {
        type: String,
        required: true,
    },
    Date: {
        type: String,
        required: true,
    },
});

module.exports = logweb = mongoose.model("logweb", logweb);
