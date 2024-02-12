const axios = require('axios');
const timeout = require('concurrent/lib/errors/timeout');

async function FourJourney(invoicenumber)  {
    // let res = [];
    let a = await axios
    .get(`http://unifresh-eta.integration.four.io/?order_number=${invoicenumber}`, { timeout: 5000 })
    .then((res) => {
        return res.data;
    }
    ).catch((err) => (console.log(err)));
    // console.log(a)
    return a;
  }

  module.exports = FourJourney