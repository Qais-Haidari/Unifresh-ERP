const express = require("express");
const Router = express.Router();
const WebLogin = require("../../Utils/Auth/WebLogin");


// Process Order
Router.get("/Weblogin/Login/:username/:password", async (req, res) => {
    res.send(await WebLogin(req.params.username, req.params.password));
  });
module.exports = Router;
