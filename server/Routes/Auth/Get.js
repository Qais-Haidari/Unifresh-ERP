const express = require("express");
const Router = express.Router();
const WebLogin = require("../../Utils/Auth/WebLogin");
const CustomerSalesReport = require('../../Model/CustomerSalesReport');
const bcrypt = require('bcrypt')


// Process Order
Router.get("/Weblogin/Login/:username/:password", async (req, res) => {
    res.send(await WebLogin(req.params.username, req.params.password));
  });

  
  // Create Hash
// Router.post("/createhash", async (req, res) => {
//   const BeforeHash = `${req.body.username}/${req.body.pass}`;
//     const salt = bcrypt.genSaltSync(10);
//     const hash = bcrypt.hashSync(`${BeforeHash}`, salt);
//     const Link = new CustomerSalesReport({
//       ID: Math.floor(Math.random() * 100000),
//       Customer: 'Web Auth',
//       Hash: hash,
//       BeforeHash: BeforeHash
//     });
    
//     Link.save(function (err, result) {
//       if (err) {
//         console.log(err);
//       } else {
//         console.log("user Successfully Saved");
//       }
//     });
//     res.send(hash)
// });

module.exports = Router;
