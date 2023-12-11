const mongoose = require("mongoose");

let TaskAuth = new mongoose.Schema({
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
  Attachment: {
    type: String,
    required: false,
    default: "NO",
  },
  AttachmentPath: {
    type: String,
    required: false,
    default: "",
  },
  Value: {
    type: String,
    required: false,
    default: "",
  },
  Date: {
    type: String,
    required: true,
  },
  isAdminApproved: {
    type: String,
    required: false,
    default: "NO",
  },
  isUserSubmit: {
    type: String,
    required: false,
    default: "NO",
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

module.exports = TaskAuth = mongoose.model("taskauths", TaskAuth);
