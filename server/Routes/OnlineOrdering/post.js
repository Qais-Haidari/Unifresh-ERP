const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const axios = require("axios");

const List = require('../../Model/OnlineOrder/List')
const Order = require('../../Model/OnlineOrder/Order')
const Log = require('../../Model/OnlineOrder/Log')


const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

// Create User
Router.post("/CreateOrder", (req, res) => {
    // console.log(req.body.OrderItems)
    const CreateOrder = new Order({
        OrderID: uuidv4(),
        Customer: req.body.customer,
        OrderDate: req.body.OrderDate,
        Date: moment()
    });
    console.log(CreateOrder)
      CreateOrder.save(function (err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log("Order Created");
        }
        // res.send("data saved");
      });
    for (let index = 0; index < req.body.OrderItems.length; index++) {
        const element = req.body.OrderItems[index];
        const CreateLine = new List({
            OrderID: uuidv4(),
            Customer: req.body.customer,
            ItemID: uuidv4(),
            OrderID: CreateOrder.OrderID,
            OrderedQuantity: element.Unit,
            SupplierItemCode: element.Itemcode
        });
        CreateLine.save(function (err, result) {
              if (err) {
                console.log(err);
            } else {
                console.log("Line Created");
          }
      });
    }
    res.send("data saved");

});

module.exports = Router;