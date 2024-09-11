const express = require("express");
const Router = express.Router();
const nodemailer = require("nodemailer");
const { render, Html } = require('@react-email/components')
const CustomerSalesReport = require('../../../Model/CustomerSalesReport');
// const EmailTempalte = require('../../../Utils/Template/Email');


Router.get('/', (req, res) => {
  const hash = new URLSearchParams(req.originalUrl).get('/API/v/1/?name');
  CustomerSalesReport.findOne({ Hash: hash }).then((r) => {
    // res.send(r)
    res.writeHead(302, {
      Location: `http://localhost:3000/#/Customers/index/?name=${hash}`
    });
    res.end()
}).catch((err) => err);
})


Router.post('/hash/', (req, res) => {
  CustomerSalesReport.findOne({ Hash: req.body.hash }).then((r) => {res.send(r)}).catch((err) => err);
})

// GET ALL Users
Router.post("/SendSalesReport", async (req, res) => {
  const transporter = nodemailer.createTransport({
      host: "smtp.office365.com",
      port: "587",
      secureConnection: true,
      tls: { ciphers: "SSLv3" },
      auth: {
        user: "CustomerService@unifresh.com.au",
        pass: "ypzgnwhfgqnrzcbm",
      },
    })
    var mailOptions = {
      from: "CustomerService@unifresh.com.au",
      to: "qais.kazimi@unifresh.com.au",
      subject: "Unifresh Ordering",
      text: `
      Customer: ${req.body.BeforeHash.split('/')[0]}
      Start Date: ${req.body.BeforeHash.split('/')[3]}
      End Date: ${req.body.BeforeHash.split('/')[4]}
      Link: http://localhost:5000/API/v/1/?name=${req.body.Hash}`,
    };
    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("Email sent: " + info.response);
      }
    })
    const Link = new CustomerSalesReport({
      ID: req.body.ID,
      Customer: req.body.Customer,
      Hash: req.body.Hash,
      BeforeHash: req.body.BeforeHash
    });
    
    Link.save(function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log("user Successfully Saved");
      }
    });
    res.send('rs')
  });

module.exports = Router;
