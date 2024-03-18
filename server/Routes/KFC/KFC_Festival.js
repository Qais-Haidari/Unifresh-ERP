const express = require("express");
const Router = express.Router();
const Get_Request = require("../../Utils/Report/KFC/KFC_Festival");

// GET ALL Users
Router.get("/KFC_Festival/:start/:end", async (req, res) => {
  res.send(await Get_Request(req.params.start, req.params.end));
});
module.exports = Router;
