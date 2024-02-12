const axios = require('axios')

async function ProcessOrder() {
    let result = await Orders.find();
    return result;
  }

  module.exports = ProcessOrder


  // let masterline = `http://sw.unifresh.com.au:8855/?script=onlineorderingtester&customer=${authdetail[0]}&requireddate=16/01/2024&ponum=123456789&notes=test&`;
      // for (let index = 0; index < masterarr.length; index++) {
      //   const element = masterarr[index];
      //   let line = `ItemCode=${element.SupplierItemCode}&qty=${element.Quentity}&`;
      //   masterline += line
      // }