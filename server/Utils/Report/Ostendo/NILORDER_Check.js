const NILOrderCheck = async (customer, start, end) => {
    let Report = `
        select COUNT(*) from SALESHEADER WHERE SALESHEADER.CUSTOMER = '${customer}' 
        and INVOICEDTOTALAMOUNT < 0 and ORDERDATE between current_date-${start} and current_date-${end};
    `;
    const requestEndpoint = `http://sw.unifresh.com.au:82/sqlquery/?apikey=Ytm1VIhM2ai7fewNDR1QpEypr%2FuqXBZvspibPCxoBoLiXyEA8DVaP2BcAiw6th%2Bvgj7Gcr%2FwuXPDWyCpABxO3FQLtzLlgOsh4YFHHNcCx55E4LUDYWA%3D&format=json`;
    const response = await fetch(requestEndpoint, {
      method: "POST",
      body: Report,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonResponse = await response.json();
    return jsonResponse;
  };
  module.exports = NILOrderCheck;