const express = require("express");
const Router = express.Router();
const GetUser = require("../../Utils/Users/GetUser");
const CustomerOrderItems = require("../../Utils/OnlineOrdering/CustomerOrderItems");
const CustomerOrderSchedule = require("../../Utils/OnlineOrdering/OrderingSchedule");
const OrderDateCheck = require("../../Utils/OnlineOrdering/OrderDateCheck");
const OrderScheduleCheck = require("../../Utils/OnlineOrdering/OrderScheduleCheck");
const GetUserLatLot = require("../../Utils/Users/GetUserLatLot");
const FindTodayOrder = require("../../Utils/Users/FindTodayOrder");
const FourJourney = require("../../Controller/Customers/FourJourney");

// GET ALL Users
Router.get("/User/:user", async (req, res) => {
  res.send(await GetUser(req.params.user));
});

// GET User Order List
Router.get("/User/OrderItem/:user", async (req, res) => {
  res.send(await CustomerOrderItems(req.params.user));
});

// GET User Order Date Check
Router.get("/User/OrderDateCheck/:user", async (req, res) => {
  res.send(await OrderDateCheck(req.params.user));
});

// GET User Order Schedule Check
Router.get("/User/OrderScheduleCheck/:user", async (req, res) => {
  res.send(await OrderScheduleCheck(req.params.user));
});

// GET User Order Schedule
Router.get("/User/OrderItem/Schedules/:user", async (req, res) => {
  res.send(await CustomerOrderSchedule(req.params.user));
});

// GET User Lat and Lot
Router.get("/User/LatLot/:user", async (req, res) => {
  res.send(await GetUserLatLot(req.params.user));
});

// GET User Today Order
Router.get("/User/TodayOrder/:user", async (req, res) => {
  res.send(await FindTodayOrder(req.params.user));
});

// GET User Four Journey
Router.get("/User/FourJourney/:user", async (req, res) => {
  res.send(await FourJourney(req.params.user));
});

module.exports = Router;
