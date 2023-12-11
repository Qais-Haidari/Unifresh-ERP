const mongoose = require("mongoose");

let Department = new mongoose.Schema({
  ID: {
    type: Number,
    required: true,
  },
  Department_Name: {
    type: String,
    required: true,
  },
  Department_ID: {
    type: Number,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Start_of_Business: {
    type: String,
    required: true,
  },
  End_of_Business: {
    type: String,
    required: true,
  },

});

module.exports = Department = mongoose.model("departments", Department);
