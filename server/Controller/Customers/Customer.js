const axios = require('axios')
const Customer = require('../../SQL/Customers')

async function ProcessOrder() {
  let result = await Orders.find();
  return result;
  }

  module.exports = ProcessOrder