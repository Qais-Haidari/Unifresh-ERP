async function ReadFile() {
const fs = require("fs");
const path = require("path");
const puppeteer = require("puppeteer");
let Client = require("ssh2-sftp-client");
const nodemailer = require("nodemailer");
const excelToJson = require("convert-excel-to-json");
const { v4: uuidv4 } = require("uuid");
const { off } = require("process");
const readTextFile = require("read-text-file");
const JsonFind = require("json-find");
var cron = require("node-cron");
var parser = require("xml2json-light");
const { XMLParser, XMLBuilder, XMLValidator } = require("fast-xml-parser");
const { join } = require("path");
const convert = require("xml-js");
const axios = require('axios')
const moment = require('moment')

// 0 = Spinach
// 1 = Onions Red
// 2 = Mushrooms
// 3 = Capsicum
// 4 = Tomato Fresh
// 5 = Spring Onion

const UserDetail = {
	98705 : ["Dominos Reynella"],
	98717 : ["Dominos Port Adelaide"],
	98707 : ["Dominos West Lakes"],
	98115 : ["Dominos Broken Hill"],
	98741 : ["Dominos Munno Para"],
	98720 : ["Dominos Mt Gambier"],
	98715 : ["Dominos Nailsworth"],
	98441 : ["Dominos Karama"],
	98708 : ["Dominos Hove"],
	98479 : ["Dominos Coolalinga"],
	98730 : ["Dominos Renmark"],
	98461 : ["Dominos Palmerston"],
	98710 : ["Dominos Plympton"],
	98746 : ["Dominos Seaford"],
	98727 : ["Dominos Blackwood"],
	98726 : ["Dominos Port Lincoln"],
	98743 : ["Dominos Port Pirie NEW"],
	98714 : ["Dominos Aberfoyle Park"],
	98721 : ["Dominos Mt Barker"],
	98725 : ["Dominos Port Augusta"],
	98703 : ["Dominos Gillies Plains"],
	98464 : ["Dominos Darwin City"],
	98702 : ["Dominos Newton"],
	98463 : ["Dominos Casuarina"],
	98712 : ["Dominos Tranmere"],
	98738 : ["Dominos Glenelg"],
	98475 : ["Dominos Millner"],
	98804 : ["Dominos Mildura"],
	98711 : ["Dominos Golden Grove"],
	98709 : ["Dominos Fulham"],
	98729 : ["Dominos Hallett Cove"],
	98700 : ["Dominos Aldinga"],
	97701 : ["Dominos Munno Para West"],
	98718 : ["Dominos Hollywood Plaza"],
	98722 : ["Dominos Modbury"],
	98748 : ["Dominos Ingle Farm"],
	98737 : ["Dominos Victor Harbour"],
	98719 : ["Dominos Murray Bridge"],
	98728 : ["Dominos Adelaide City"],
	98732 : ["Dominos Whyalla"],
	98731 : ["Dominos Gawler"],
	98740 : ["Dominos Mawson Lakes"],
	98704 : ["Dominos Elizabeth SOUTH"],
	98713 : ["Dominos Pasadena"],
	98716 : ["Dominos Woodville Park"],
	97702 : ["Dominos Nuriootpa"],
	97700 : ["Dominos Hindmarsh"],
	98747 : ["Dominos St Peters"],
	97766 : ["Dominos Angle Vale"],
	98701 : ["Dominos Malvern"],
	98744 : ["Dominos Glenunga"],
	98735 : ["Dominos Brooklyn Park"],
};
console.log('as')
  const transporter = nodemailer.createTransport({
    host: "smtp.office365.com",
    port: "587",
    secureConnection: true,
    tls: { ciphers: "SSLv3" },
    auth: {
      user: "CustomerService@unifresh.com.au",
      pass: "Yourself1",
    },
  });
  class SFTPClient {
    constructor() {
      this.client = new Client();
    }

    async connect(options) {
      console.log(`Connecting to ${options.host}:${options.port}`);
      try {
        await this.client.connect(options);
      } catch (err) {
        console.log("Failed to connect:", err);
      }
    }

    async disconnect() {
      await this.client.end();
    }
    async listFiles(remoteDir, fileGlob) {
      console.log(`Listing ${remoteDir} ...`);
      let fileObjects;
      try {
        fileObjects = await this.client.list(remoteDir, fileGlob);
      } catch (err) {
        console.log("Listing failed:", err);
      }
      const fileNames = [];
      for (const file of fileObjects) {
        if (file.type === "d") {
          console.log(
            `${new Date(file.modifyTime).toISOString()} PRE ${file.name}`
          );
        } else {
          console.log(
            `${new Date(file.modifyTime).toISOString()} ${file.size} ${
              file.name
            }`
          );
        }

        fileNames.push(file.name);
      }
      return fileNames;
    }
    async uploadFile(localFile, remoteFile) {
      console.log(`Uploading ${localFile} to ${remoteFile} ...`);
      try {
        await this.client.put(localFile, remoteFile);
      } catch (err) {
        console.error("Uploading failed:", err);
      }
    }
    async uploadFileFast(localFile, remoteFile) {
      console.log(`Uploading ${localFile} to ${remoteFile} ...`);
      try {
        await this.client.fastPut(localFile, remoteFile);
      } catch (err) {
        console.error("Uploading failed:", err);
      }
    }

    async downloadFile(remoteFile, localFile) {
      console.log(`Downloading ${remoteFile} to ${localFile} ...`);
      try {
        await this.client.get(remoteFile, localFile);
      } catch (err) {
        console.error("Downloading failed:", err);
      }
    }

    async deleteFile(remoteFile) {
      console.log(`Deleting ${remoteFile}`);
      try {
        await this.client.delete(remoteFile);
      } catch (err) {
        console.error("Deleting failed:", err);
      }
    }
  }
  const host = "sftpdev.unifresh.com.au";
  const port = "22";
  const username = "domediuser";
  const password = "domediuser#@!";
  const client = new SFTPClient();
  await client.connect({ host, port, username, password });
  const data = await client.listFiles("./uploads");
  const filename = data[0];
  if (filename == undefined) {
    await client.disconnect();
    var mailOptions = {
        from: "CustomerService@unifresh.com.au",
        to: "qais.kazimi@unifresh.com.au technology@unifresh.com.au",
        subject: "Dominos Order With Empty Order FIle",
        text: `No File Found`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
  } else {
    console.log(path.join(__dirname) + '../../Files/Dominos')
    await client.downloadFile(
      `./uploads/${filename}`,
      path.join(__dirname) + `/Files/${filename}`
    );

    let storeid;
    let orders;
    let a = fs.readFileSync(path.join(__dirname) + `/Files/${filename}`);
    // let a = fs.readFileSync(a);
    const parser = new XMLParser();
    let jObj = parser.parse(a);

    if (jObj.PO.POItems == undefined) {
    //   await fs.rename(
    //     `./Orders/Inbound/${filename}`,
    //     `./Orders/missing list/${filename}`,
    //     () => {
    //       console.log("success");
    //     }
    //   );

    //   await client.deleteFile(`./uploads/${filename}`);

      var mailOptions = {
        from: "CustomerService@unifresh.com.au",
        to: "qais.kazimi@unifresh.com.au technology@unifresh.com.au",
        subject: "Dominos Order With Empty Order FIle",
        text: `Empty: ${filename}\nOrder File Name: ${filename}`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      return;
    }

    const StoreID = jObj.PO.Store.StoreNo;
    let OrderDate = jObj.PO.SupplyStartDate.replace(/\-/g, "");
    const Orders = jObj.PO.POItems.POItem;
    const OrderNumber = jObj.PO.OrderNumber;
    const OrderDates = jObj.PO.OrderDate;
    const SupplyStartDate = jObj.PO.SupplyStartDate;
    const StoreNumber = jObj.PO.Store.StoreNo;

    if (
      StoreID == "98463" ||
      StoreID == "98464" ||
      StoreID == "98461" ||
      StoreID == "98479" ||
      StoreID == "98441" ||
      StoreID == "98475"
    ) {
      let b = OrderDate.replace(/\-/g, "").slice(-2);
      let g = Number(b) - 3;
      let filtered;
      if (b < 10) {
        filtered = OrderDate.slice(0, 6) + 0 + g;
      } else {
        filtered = OrderDate.slice(0, 6) + g;
      }
      OrderDate = filtered.replace(/\-/g, "");
    }

    if (
      StoreID == "98115" ||
      StoreID == "98726" ||
      StoreID == "98804" ||
      StoreID == "98743" ||
      StoreID == "98732" ||
      StoreID == "98725"
    ) {
      let b = OrderDate.replace(/\-/g, "").slice(-2);
      let g = Number(b) - 1;
      let filtered;
      if (b < 10) {
        filtered = OrderDate.slice(0, 6) + 0 + g;
      } else {
        filtered = OrderDate.slice(0, 6) + g;
      }
      OrderDate = filtered.replace(/\-/g, "");
    }

    let masterarr = [];
    let Mushrooms = [];
    let Onions_Red = [];
    let Capsicum = [];
    let Tomato_Fresh = [];
    let Spinach = [];
    let SPring_Onion = [];

    if (Orders.length == undefined) {
      if (Orders.SupplierItemDescription == "Tomato Fresh") {
        Tomato_Fresh.push({
          Quentity: Orders.OrderedQuantity,
          SupplierItemCode: Orders[index].SupplierItemCode,
        });
      } else if (Orders.SupplierItemDescription == "Capsicum") {
        Capsicum.push({
          Quentity: Orders.OrderedQuantity,
          SupplierItemCode: Orders[index].SupplierItemCode,
        });
      } else if (Orders.SupplierItemDescription == "Mushrooms") {
        Mushrooms.push({
          Quentity: Orders.OrderedQuantity,
          SupplierItemCode: Orders[index].SupplierItemCode,
        });
      } else if (Orders.SupplierItemDescription == "Onions Red") {
        Onions_Red.push({
          Quentity: Orders.OrderedQuantity,
          SupplierItemCode: Orders[index].SupplierItemCode,
        });
      } else if (Orders.SupplierItemDescription == "Spinach") {
        Spinach.push({
          Quentity: Orders.OrderedQuantity,
          SupplierItemCode: Orders[index].SupplierItemCode,
        });
      } else if (Orders.SupplierItemDescription == "Spring Onion") {
        SPring_Onion.push({
          Quentity: Orders.OrderedQuantity,
          SupplierItemCode: Orders[index].SupplierItemCode,
        });
      } else {
      }
    } else {
      for (let index = 0; index < Orders.length; index++) {
        if (Orders[index].SupplierItemDescription == "Tomato Fresh") {
          masterarr.push({
            Name: 'Tomato Fresh',
            Quentity: Orders[index].OrderedQuantity,
            SupplierItemCode: Orders[index].SupplierItemCode,
          });
        } else if (Orders[index].SupplierItemDescription == "Capsicum") {
          masterarr.push({
            Name: 'Capsicum',
            Quentity: Orders[index].OrderedQuantity,
            SupplierItemCode: Orders[index].SupplierItemCode,
          });
        } else if (Orders[index].SupplierItemDescription == "Mushrooms") {
          masterarr.push({
            Name: 'Mushrooms',
            Quentity: Orders[index].OrderedQuantity,
            SupplierItemCode: Orders[index].SupplierItemCode,
          });
        } else if (Orders[index].SupplierItemDescription == "Onions Red") {
          masterarr.push({
            Name: 'Onions Red',
            Quentity: Orders[index].OrderedQuantity,
            SupplierItemCode: Orders[index].SupplierItemCode,
          });
        } else if (Orders[index].SupplierItemDescription == "Spinach") {
          masterarr.push({
            Name: 'Spinach',
            Quentity: Orders[index].OrderedQuantity,
            SupplierItemCode: Orders[index].SupplierItemCode,
          });
        } else if (Orders[index].SupplierItemDescription == "Spring Onion") {
          masterarr.push({
            Name: 'Spring Onion',
            Quentity: Orders[index].OrderedQuantity,
            SupplierItemCode: Orders[index].SupplierItemCode,
          });
        } else {
        }
      }
    }

    const authdetail = JsonFind(UserDetail).checkKey(StoreID);
    if (authdetail === false) {
      var mailOptions = {
        from: "CustomerService@unifresh.com.au",
        to: "qais.kazimi@unifresh.com.au",
        subject: "Unifresh Ordering",
        text: `Store Number is wrong: File Name: ${filename}`,
      };
      transporter.sendMail(mailOptions, function (error, info) {
        if (error) {
          console.log(error);
        } else {
          console.log("Email sent: " + info.response);
        }
      });
      return;
    }else {
        axios
      .post("http://localhost:5000/CreateOrder", {
        "id": uuidv4(),
        "Customer": authdetail[0],
        "OrderNumber": OrderNumber,
        "OrderDate": OrderDates,
        "SupplyStartDate": SupplyStartDate,
        "StoreNumber": StoreNumber,
        "StoreID": StoreID,
        "Date": moment(),
        "MasterArr": masterarr
      })
      .then((res) => {
        window.location.reload();
      })
      .catch((err) => {});




      // let masterline = `http://sw.unifresh.com.au:8855/?script=onlineorderingtester&customer=${authdetail[0]}&requireddate=16/01/2024&ponum=123456789&notes=test&`;
      // for (let index = 0; index < masterarr.length; index++) {
      //   const element = masterarr[index];
      //   let line = `ItemCode=${element.SupplierItemCode}&qty=${element.Quentity}&`;
      //   masterline += line
      // }
      // axios
      // .get(masterline)
      // .then((res) => {
      //   const a = JSON.parse(convert.xml2json(res.data, { compact: true }));
      //   if (a.xml.complete._text == 'YES') {
      //     // var mailOptions = {
      //     //   from: "CustomerService@unifresh.com.au",
      //     //   to: "qais.kazimi@unifresh.com.au",
      //     //   subject: "Unifresh Ordering",
      //     //   text: `Invoice Number: ${a.xml.invoice._text} \n Completed: ${a.xml.complete._text} \n Order Date: ${OrderDate} \n Customer: ${authdetail[0]}`,
      //     // };
      //     // transporter.sendMail(mailOptions, function (error, info) {
      //     //   if (error) {
      //     //     console.log(error);
      //     //   } else {
      //     //     console.log("Email sent: " + info.response);
      //     //   }
      //     // });
      //     // fs.rename(
      //     //   `./Orders/Inbound/${filename}`,
      //     //   `./Orders/outbound/${filename}`,
      //     //   () => {
      //     //     console.log("success");
      //     //   }
      //     // );
      //     // client.deleteFile(`./uploads/${filename}`);
      //   }else {
      //     var mailOptions = {
      //       from: "CustomerService@unifresh.com.au",
      //       to: "qais.kazimi@unifresh.com.au",
      //       subject: `Unifresh Ordering ${authdetail[0]}`,
      //       text: `Customer: ${authdetail[0]} \n ${res.data}`,
      //     };
      //     transporter.sendMail(mailOptions, function (error, info) {
      //       if (error) {
      //         console.log(error);
      //       } else {
      //         console.log("Email sent: " + info.response);
      //       }
      //     });
      //   }
      //   console.log(res.data)
      // })
      // .catch((err) => (document.body.innerHTML = err));
    }
  }
}
  module.exports = ReadFile