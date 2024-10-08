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

// RETURN REPORT FROM SCRIPT
const ReturnScriptData = require("../../Utils/ReturnScriptData");

// OSTENDO USRS
const OstendoUsers = require("../../Utils/Report/Ostendo/OstendoUsers");

// Schedules Change
const ScheduleChanges = require("../../Utils/Report/Ostendo/ScheduleChanges");
const ScheduleChangesName = require("../../Utils/Report/Ostendo/ScheduleChangesName");
// Failed Order Report
const FailedOrderReport = require("../../Utils/Report/Ostendo/FailedOrderReport");

// EDI CUSTOMER DETAIL
const EDICustomerDetail = require("../../Utils/Report/Ostendo/EDICustomerDetail");
const EDICustomerCred = require("../../Utils/Report/Ostendo/EDICustomerCred");

// EDI CUSTOMER DETAIL ORDER SCHEDULES
const EDICustomerScheduleDetail = require("../../Utils/Report/Ostendo/EDICustomerScheduleDetail");

const CustomerList = require("../../Utils/Report/Ostendo/CustomerList");
const CustomerInvoice = require("../../Utils/Report/Ostendo/CustomerInvoice");
const Flash_List = require("../../Utils/Report/Ostendo/Flash_List");

// NILORDER CHECK
const NILORDER_Check = require("../../Utils/Report/Ostendo/NILORDER_Check");

// GET ALL Users
Router.get("/SchedulesNames", async (req, res) => { res.send(await SchedulesNames()) });
Router.get("/MissingCustomerSchedules/:name", async (req, res) => { res.send(await MissingCustomerSchedules(req.params.name)) });

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


// Change Customer Schedules BULK
Router.get("/Schedule/Change/CutOfTime/:name/:time", async (req, res) => { res.send(await ScheduleChanges(req.params.name, req.params.time))});
Router.get("/Schedule/Change/Customers/:state", async (req, res) => { res.send(await ScheduleChangesName(req.params.state))});

// Failed Order Report
Router.get("/Web/Failed/:date", async (req, res) => { res.send(await FailedOrderReport(req.params.date))});

// RETUNR THE SCRIPTS DATA
Router.get("/Script/data/return/:scripts", async (req, res) => { res.send(await ReturnScriptData(req.params.scripts))});

// OSTENDO USERS
Router.get("/users/ostnedo", async (req, res) => { res.send(await OstendoUsers())});

// NILORDER CHECK
Router.get("/Order/nilordercheck/:customer/:start/:end", async (req, res) => { res.send(await NILORDER_Check(req.params.customer, req.params.start, req.params.end))});



// EDI ROUTES

// GET CUSTOMER DEATILS [ USERNAME CUSTOMEREMAIL ]
Router.get("/EDI/CUSTOMER/DETAIL/:StoreNumber", async (req, res) => { res.send(await EDICustomerDetail(req.params.StoreNumber))});
// GET CUSTOMER DEATILS [ ORDER SCHEDULES ]
Router.get("/EDI/CUSTOMER/SCHEDULE/DETAIL/:customer", async (req, res) => { res.send(await EDICustomerScheduleDetail(req.params.customer))});
// GET CUSTOMER DETAIL [ CUSTOMER LIST ]
Router.get("/EDI/CUSTOMER/CUSTOMERLIST/:customer", async (req, res) => { res.send(await CustomerList(req.params.customer))});
// GET INVOICE DETAILS
Router.get("/EDI/CUSTOMER/INVOICE/:number", async (req, res) => { res.send(await CustomerInvoice(req.params.number))});


// FLASH SOFTWARE SUPPORT

// List of Items
Router.get("/FLASH/ITEMS/LIST", async (req, res) => { res.send(await Flash_List())});
module.exports = Router;