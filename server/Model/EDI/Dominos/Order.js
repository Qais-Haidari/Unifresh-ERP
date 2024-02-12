const mongoose = require("mongoose");

let Orders = new mongoose.Schema({
    OrderID: {
        type: String,
        required: true,
    },
    Customer: {
        type: String,
        required: true,
    },
    OrderNumber: {
        type: String,
        required: true,
    },
    OrderDate: {
        type: String,
        required: true,
    },
    SupplyStartDate: {
        type: String,
        required: true,
    },
    StoreNumber: {
        type: String,
        required: true,
    },
    StoreID: {
        type: String,
        required: true,
    },
    Date: {
        type: String,
        required: true,
    },
});

module.exports = Orders = mongoose.model("Orders", Orders);
