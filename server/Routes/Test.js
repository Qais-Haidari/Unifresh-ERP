const express = require("express");
const Router = express.Router();
const Test = require("../Utils/Test");

// GET ALL Users
Router.get("/Test", async (req, res) => {
  res.send(await Test());
});
module.exports = Router;
