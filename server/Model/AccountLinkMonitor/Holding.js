const mongoose = require("mongoose");

let Holding = new mongoose.Schema({
  ID: {
    type: String,
    required: true,
  },
  TransactionID: {
    type: String,
    required: true,
  },
  Status: {
    type: String,
    required: true,
  },
  Date: {
    type: String,
    required: true,
  },
  List: {
    type: String,
    required: true,
  },
  Actioner: {
    type: String,
    required: true,
  },
  JOURNALDESCRIPTION: {
    type: String,
    required: true,
  },
});

module.exports = Holding = mongoose.model("Holdings", Holding);
