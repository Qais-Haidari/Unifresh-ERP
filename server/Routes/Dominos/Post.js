const express = require("express");
const Router = express.Router();
const CreateOrder = require("../../Controller/Dominos/CreateOrder");


// CREATE DOMINOS ORDER
Router.post("/CreateOrder", async (req, res) => {
  res.send(await CreateOrder(req, res));
});
module.exports = Router;
