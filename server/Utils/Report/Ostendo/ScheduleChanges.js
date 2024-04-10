const MissingCustomerSchedules = async (name, time) => {
    let Report = `
    SELECT customermaster.CUSTOMER FROM customermaster where customermaster.DELIVERYSTATE = '${name}' and customermaster.CUSTOMERSTATUS = 'Active'
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
    for (let index = 0; index < jsonResponse.length; index++) {
        const element = jsonResponse[index].CUSTOMER;
        let Report = `
        update UF_CUST_SCHEDULES set UF_CUST_SCHEDULES.CUTOFFTIME = '${time}' WHERE UF_CUST_SCHEDULES.CUSTOMER = '${element}'
        `;
    const requestEndpoint = `http://sw.unifresh.com.au:82/sqlquery/?apikey=Ytm1VIhM2ai7fewNDR1QpEypr%2FuqXBZvspibPCxoBoLiXyEA8DVaP2BcAiw6th%2Bvgj7Gcr%2FwuXPDWyCpABxO3FQLtzLlgOsh4YFHHNcCx55E4LUDYWA%3D&format=json`;
    const response = await fetch(requestEndpoint, {
      method: "POST",
      body: Report,
      headers: {
        "Content-Type": "application/json",
      },
    });
    const jsonResponses = await response.json();
    console.log(jsonResponses)
    }
  };
  module.exports = MissingCustomerSchedules;