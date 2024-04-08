const express = require("express");
const Router = express.Router();
const SchedulesNames = require("../../Utils/Report/Ostendo/SchedulesNames");
const MissingCustomerSchedules = require("../../Utils/Report/Ostendo/MissingCustomerSchedules");

const AccountingLinkMonitor_JournalHeader = require("../../Utils/Report/Ostendo/AccountingLinkMonitor_JournalHeader");
const AccountingLinkMonitor_JournalHeaderPurchase = require("../../Utils/Report/Ostendo/AccountingLinkMonitor_JournalHeaderPurchase");
const AccountingLinkMonitor_JournalHeaderSales = require("../../Utils/Report/Ostendo/AccountingLinkMonitor_JournalHeaderSales");
// Statment
const AccountingLinkMonitor_JournalHeader_Statment = require("../../Utils/Report/Ostendo/AccountingLinkMonitor_JournalHeader_Statment");
const AccountingLinkMonitor_JournalHeaderPurchase_Statment = require("../../Utils/Report/Ostendo/AccountingLinkMonitor_JournalHeaderPurchase_Statment");
const AccountingLinkMonitor_JournalHeaderSales_Statment = require("../../Utils/Report/Ostendo/AccountingLinkMonitor_JournalHeaderSales_Statment");
// Holding
const AccountingLinkMonitor_JournalHeader_HOLD = require("../../Utils/Report/Ostendo/AccountingLinkMonitor_JournalHeader_HOLD");
const AccountingLinkMonitor_JournalHeaderPurchase_HOLD = require("../../Utils/Report/Ostendo/AccountingLinkMonitor_JournalHeaderPurchase_HOLD");
const AccountingLinkMonitor_JournalHeaderSales_HOLD = require("../../Utils/Report/Ostendo/AccountingLinkMonitor_JournalHeaderSales_HOLD");

// Get Records
const AccountingLinkMonitor_JournalHeaderSales_Get = require("../../Utils/Report/Ostendo/AccountingLinkMonitor_JournalHeader_Get");


// GET ALL Users
Router.get("/SchedulesNames", async (req, res) => {
  res.send(await SchedulesNames());
});

Router.get("/MissingCustomerSchedules/:name", async (req, res) => {
  res.send(await MissingCustomerSchedules(req.params.name));
});

// ///////////////////////////////////////////////////////
Router.get("/AccountingLinkMonitor_JournalHeader", async (req, res) => { res.send(await AccountingLinkMonitor_JournalHeader(req.params.name)) });
Router.get("/AccountingLinkMonitor_JournalHeaderPurchase", async (req, res) => { res.send(await AccountingLinkMonitor_JournalHeaderPurchase(req.params.name)) });
Router.get("/AccountingLinkMonitor_JournalHeaderSales", async (req, res) => { res.send(await AccountingLinkMonitor_JournalHeaderSales(req.params.name))});
// Statment
Router.get("/AccountingLinkMonitor_JournalHeader_Statment", async (req, res) => { res.send(await AccountingLinkMonitor_JournalHeader_Statment(req.params.name)) });
Router.get("/AccountingLinkMonitor_JournalHeaderPurchase_Statment", async (req, res) => { res.send(await AccountingLinkMonitor_JournalHeaderPurchase_Statment(req.params.name)) });
Router.get("/AccountingLinkMonitor_JournalHeaderSales_Statment", async (req, res) => { res.send(await AccountingLinkMonitor_JournalHeaderSales_Statment(req.params.name))});
// Hold
Router.get("/AccountingLinkMonitor_JournalHeader_HOLD/:name", async (req, res) => { res.send(await AccountingLinkMonitor_JournalHeader_HOLD(req.params.name)) });
Router.get("/AccountingLinkMonitor_JournalHeaderPurchase_HOLD", async (req, res) => { res.send(await AccountingLinkMonitor_JournalHeaderPurchase_HOLD(req.params.name)) });
Router.get("/AccountingLinkMonitor_JournalHeaderSales_HOLD", async (req, res) => { res.send(await AccountingLinkMonitor_JournalHeaderSales_HOLD(req.params.name))});

// Change the Stauts of the Transctions in Local
Router.get("/AccountingLinkMonitor/Hold", async (req, res) => { res.send(await AccountingLinkMonitor_JournalHeaderSales_HOLD(req.params.name))});
Router.get("/AccountingLinkMonitor/Hold/Get", async (req, res) => { res.send(await AccountingLinkMonitor_JournalHeaderSales_Get(req.params.name))});

module.exports = Router;
