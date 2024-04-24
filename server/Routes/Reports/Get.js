const express = require("express");
const Router = express.Router();
const KFCYUM = require("../../Utils/Report/KFC/KFCVendors/KFCYUM");

// KFC YUM
Router.get("/KFC/YUM/:start/:end", async (req, res) => {
  res.send(await KFCYUM(req.params.start, req.params.end));
});

module.exports = Router;
