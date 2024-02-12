const axios = require('axios')
const Orders = require('../../Model/EDI/Dominos/Order')

async function ProcessOrder() {
  let result = await Orders.find();
  return result;
  }

  module.exports = ProcessOrder