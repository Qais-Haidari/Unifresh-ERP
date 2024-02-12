const express = require("express");
const Router = express.Router();
const ViewDocuments = require('../../Utils/OnlineOrdering/ViewDocuments');
const invoice = require('../../Utils/OnlineOrdering/Invoice');
const CustomerOrderingSchedule = require('../../Utils/OnlineOrdering/CustomerOrderingSchedule');
const OrderItem = require('../../Utils/OnlineOrdering/ETA/OrderItem');
const GetCustomerName = require('../../Utils/OnlineOrdering/ETA/GetCustomerName');


// View Documents
Router.get("/ViewDocuments/:limit/:username", async (req, res) => {
  res.send(await ViewDocuments(req.params.limit, req.params.username));
});

// View Document -> Invoices
Router.get("/invoices/:invoice", async (req, res) => {
  res.send(await invoice(req.params.invoice));
});

// View Document -> Invoices
Router.get("/ordering/Schedules/:username", async (req, res) => {
  res.send(await CustomerOrderingSchedule(req.params.username));
});

// ONLINE ORDERING -> ETA
Router.get("/ordering/ETA/:ordernum", async (req, res) => {
  res.send(await OrderItem(req.params.ordernum));
});

// ONLINE ORDERING -> Get Customer Name
Router.get("/ordering/customer/:customer", async (req, res) => {
  res.send(await GetCustomerName(req.params.customer));
});

module.exports = Router;
