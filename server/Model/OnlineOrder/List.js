const mongoose = require("mongoose");

let Itemsweb = new mongoose.Schema({
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
    }
});

module.exports = Itemsweb = mongoose.model("Itemsweb", Itemsweb);
