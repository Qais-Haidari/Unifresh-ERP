const express = require("express");
const Router = express.Router();
// const ProcessOrder = require("../../Controller/");
const ReadOrder = require("../../Controller/Web/ReadOrder");
const OrderByID = require("../../Controller/Web/OrderByID");


// Process Order
Router.get("/WebOrders/get", async (req, res) => {
    res.send(await ReadOrder());
  });

  // GET Web ORDER BY ID
  Router.get("/WebOrders/get/one/:id", async (req, res) => {
    res.send(await OrderByID(req, res));
  });
module.exports = Router;
