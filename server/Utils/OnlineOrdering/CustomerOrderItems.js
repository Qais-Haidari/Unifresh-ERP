const CustomerOrderSchedule = async (username) => {
    let Report = `
    select GET_CUSTOMERLISTANDPRICES.*, customermaster.additionalfield_51, customermaster.additionalfield_52, customermaster.additionalfield_53, customermaster.additionalfield_59 from customermaster, GET_CUSTOMERLISTANDPRICES('${username}') where customermaster.CUSTOMER = '${username}'
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
  module.exports = CustomerOrderSchedule;
  