const express = require("express");
const Router = express.Router();
const Holder = require('../../Model/AccountLinkMonitor/Holding')
const { v4: uuidv4 } = require("uuid");
const moment = require("moment");

Router.post("/AccountLink/Holder", (req, res) => {
    const NewUser = new Holder({
        ID: uuidv4(),
        TransactionID: req.body.TraID,
        Status: req.body.status,
        Date: moment(),
        List: req.body.list,
        Actioner: req.body.user,
        JOURNALDESCRIPTION: req.body.JOURNALDESCRIPTION
    });
  
    NewUser.save(function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log("user Successfully Saved");
      }
      res.send("data saved");
    });
  });


module.exports = Router;
