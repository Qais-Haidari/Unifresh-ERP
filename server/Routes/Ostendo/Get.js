const express = require("express");
const Router = express.Router();
const SchedulesNames = require("../../Utils/Report/Ostendo/SchedulesNames");
const MissingCustomerSchedules = require("../../Utils/Report/Ostendo/MissingCustomerSchedules");
const AccountingLinkMonitor_JournalHeader = require("../../Utils/Report/Ostendo/AccountingLinkMonitor_JournalHeader");
const AccountingLinkMonitor_JournalHeaderPurchase = require("../../Utils/Report/Ostendo/AccountingLinkMonitor_JournalHeaderPurchase");
const AccountingLinkMonitor_JournalHeaderSales = require("../../Utils/Report/Ostendo/AccountingLinkMonitor_JournalHeaderSales");

// GET ALL Users
Router.get("/SchedulesNames", async (req, res) => {
  res.send(await SchedulesNames());
});

Router.get("/MissingCustomerSchedules/:name", async (req, res) => {
  res.send(await MissingCustomerSchedules(req.params.name));
});


// ///////////////////////////////////////////////////////
Router.get("/AccountingLinkMonitor_JournalHeader", async (req, res) => {
  res.send(await AccountingLinkMonitor_JournalHeader(req.params.name));
});

Router.get("/AccountingLinkMonitor_JournalHeaderPurchase", async (req, res) => {
  res.send(await AccountingLinkMonitor_JournalHeaderPurchase(req.params.name));
});

Router.get("/AccountingLinkMonitor_JournalHeaderSales", async (req, res) => {
  res.send(await AccountingLinkMonitor_JournalHeaderSales(req.params.name));
});
module.exports = Router;
