const mongoose = require("mongoose");

let Items = new mongoose.Schema({
    ItemID: {
        type: String,
        required: true,
    },
    OrderID: {
        type: String,
        required: true,
    },
    OrderedQuantity: {
        type: String,
        required: true,
    },
    SupplierItemCode: {
        type: String,
        required: true,
    },
    SupplierItemName: {
        type: String,
        required: true,
    },
    Date: {
        type: String,
        required: true,
    },
});

module.exports = Items = mongoose.model("Items", Items);
