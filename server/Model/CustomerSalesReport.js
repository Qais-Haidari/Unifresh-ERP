const mongoose = require("mongoose");

let CustomerSalesReport = new mongoose.Schema({
  ID: {
    type: String,
    required: true,
  },
  Customer: {
    type: String,
    required: true,
  },
  Hash: {
    type: String,
    required: true,
  },
  BeforeHash: {
    type: String,
    required: true,
  }
});

module.exports = Department = mongoose.model("CustomerSalesReports", CustomerSalesReport);
