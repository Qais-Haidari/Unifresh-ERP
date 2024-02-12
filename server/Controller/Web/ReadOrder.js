const axios = require('axios')
const Orders = require('../../Model/OnlineOrder/Order')

async function OrderList() {
  let result = await Orders.find();
  return result;
  }

  module.exports = OrderList