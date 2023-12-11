const express = require("express");
const Router = express.Router();
const Get_Request = require("../Utils/Request");
const OrderForWrongDate = require("../Utils/OrderForWrongDate");
const ShadowOrderCheck = require("../Utils/ShadowOrderCheck");
const IPCA_V3 = require("../Utils/IPCA_V3");

// GET ALL Users
Router.get("/MissedSalesOrder", async (req, res) => {
  res.send(await Get_Request());
});

Router.get("/OrderForWrongDate", async (req, res) => {
  res.send(await OrderForWrongDate());
});

Router.get("/ShadowOrderCheck", async (req, res) => {
  res.send(await ShadowOrderCheck());
});

Router.get("/IPCA_V3/:start/:end", async (req, res) => {
  res.send(await IPCA_V3(req.params.start, req.params.end));
});
module.exports = Router;
