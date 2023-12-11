const mongoose = require("mongoose");

let User = new mongoose.Schema({
  Status: {
    type: String,
    required: true,
    default: "Active",
  },
  ID: {
    type: Number,
    required: true,
  },
  First_Name: {
    type: String,
    required: true,
  },
  Last_Name: {
    type: String,
    required: true,
  },
  Email: {
    type: String,
    required: true,
  },
  Phone: {
    type: Number,
    required: true,
  },
  Start_of_business: {
    type: String,
    required: true,
  },
  End_of_business: {
    type: String,
    required: true,
  },
  Is_Admin: {
    type: Boolean,
    required: true,
  },
  Departments: {
    type: String,
    require: true,
  },
  DepartmentsAdmin: {
    type: String,
    require: false,
  },
});

module.exports = User = mongoose.model("Users", User);
