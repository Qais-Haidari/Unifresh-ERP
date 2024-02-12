const express = require("express");
const Router = express.Router();
const ProcessOrder = require("../../Controller/Dominos/ProcessOrder");
const OrderByID = require("../../Controller/Dominos/OrderByID");
const ReadFile = require("../../Controller/Dominos/ReadFIle");


// Process Order
Router.get("/Orders/get", async (req, res) => {
    res.send(await ProcessOrder());
  });
// GET ORDER BY ID
  Router.get("/Orders/get/one/:id", async (req, res) => {
    res.send(await OrderByID(req, res));
  });
  Router.get("/Orders/readfile", async (req, res) => {
    // res.send(ProcessOrder());
    ReadFile()
  });
// GET ALL ORDER
// Router.get("/Orders", async (req, res) => {
//   res.send(await Get_Request());
// });
module.exports = Router;
