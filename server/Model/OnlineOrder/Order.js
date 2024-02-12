const mongoose = require("mongoose");

let Ordersweb = new mongoose.Schema({
    OrderID: {
        type: String,
        required: true,
    },
    Customer: {
        type: String,
        required: true,
    },
    OrderDate: {
        type: String,
        required: true,
    },
    Date: {
        type: String,
        required: true,
    },
});

module.exports = Ordersweb = mongoose.model("Orderswebs", Ordersweb);
