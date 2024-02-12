const WebLogin = async (username, password) => {
    let Report = `SELECT CUSTOMERMASTER.CUSTOMER,ADDITIONALFIELD_62 as CAN_ADD_ITEM FROM CUSTOMERMASTER where customerstatus = 'Active' and CUSTOMERMASTER.CUSTOMER_WEBUSERNAME = '${username}' and CUSTOMERMASTER.CUSTOMER_WEBPASS = '${password}'`;
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
  module.exports = WebLogin;
