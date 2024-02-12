const axios = require('axios')
// const Orders = require('../../Model/EDI/Dominos/Order')
const list = require('../../Model/OnlineOrder/List')


async function OrderByID(req, res) {
  let result = await list.find({ OrderID: req.params.id });
  return result;
  }

  module.exports = OrderByID