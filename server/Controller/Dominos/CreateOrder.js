const Order = require('../../Model/EDI/Dominos/Order')
const Items = require('../../Model/EDI/Dominos/Item')
const { v4: uuidv4 } = require("uuid");

function CreateOrder(req, res) {
    const CreateOrders = new Order({
        OrderID: req.body.id,
        Customer: req.body.Customer,
        OrderNumber: req.body.OrderNumber,
        OrderDate: req.body.OrderDate,
        SupplyStartDate: req.body.SupplyStartDate,
        StoreNumber: req.body.StoreNumber,
        StoreID: req.body.StoreID,
        Date: req.body.Date,
      });
      CreateOrders.save(function (err, result) {
        if (err) {
          console.log(err);
        } else {
          console.log("CreateOrders Successfully Created");
        //   res.send();
        }
      });
      for (let index = 0; index < req.body.MasterArr.length; index++) {
        const element = req.body.MasterArr[index]
        console.log(element)
        const CreateItems = new Items({
          OrderID: CreateOrders.OrderID,
          ItemID: uuidv4(),
          OrderedQuantity: element.Quentity,
          SupplierItemCode: element.SupplierItemCode,
          SupplierItemName: element.Name,
          Date: req.body.Date,
        });
        CreateItems.save(function (err, result) {
          if (err) {
            console.log(err);
          } else {
            console.log("CreateItems Successfully Created");
          //   res.send();
          }
        });
      }

      res.send('Success Order Placed')
  }

  module.exports = CreateOrder