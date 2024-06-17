const MissingCustomerSchedules = async (customer) => {
    let Report = `

    select ADDITIONALFIELD_21, ADDITIONALFIELD_7, ADDITIONALFIELD_1, ITEMCODE, ITEMDESCRIPTION, ITEMBARCODE from ITEMMASTER where ITEMMASTER.ITEMCATEGORY = 'WV'
    
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
    return jsonResponse
  };
  module.exports = MissingCustomerSchedules;