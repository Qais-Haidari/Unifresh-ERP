const axios = require('axios')
const Orders = require('../../Model/EDI/Dominos/Order')
const Items = require('../../Model/EDI/Dominos/Item')


async function OrderByID(req, res) {
  let result = await Items.find({ OrderID: req.params.id });
  return result;
  }

  module.exports = OrderByID