const mongoose = require("mongoose");

let PrimaryTaskAuth = new mongoose.Schema({
  ID: {
    type: String,
    required: true,
  },
  Task_ID: {
    type: String,
    required: true,
  },
  Type: {
    type: String,
    required: true,
  },
  MinValue: {
    type: String,
    required: false,
  },
  MaxValue: {
    type: String,
    required: false,
  },
  ExptectedValue: {
    type: String,
    required: false,
  },
  Questions: {
    type: String,
    required: true,
  },
  Date: {
    type: String,
    required: true,
  },
  User: {
    type: String,
    required: false,
  },
  Department: {
    type: String,
    required: false,
  },
  EsUser: {
    type: String,
    required: false,
  },
  EsDepartment: {
    type: String,
    required: false,
  },
  feedback: {
    type: String,
    required: false,
  },
  SubmitDate: {
    type: String,
    required: false,
  },
  ActionedBy: {
    type: String,
    required: false,
  },
  Approve: {
    type: Boolean,
    required: false,
    default: false,
  },
  Approve_By: {
    type: String,
    required: false,
  },
});

module.exports = PrimaryTaskAuth = mongoose.model(
  "primarytaskauths",
  PrimaryTaskAuth
);
