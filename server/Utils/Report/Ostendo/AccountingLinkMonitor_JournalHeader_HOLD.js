const MissingCustomerSchedules = async (name) => {
  console.log(name)
    let Report = `
    update journalheader set journalheader.TRANSACTIONSTATUS = 'Transaction Send' where journalheader.JOURNALNUMBER = ${name}
    `;
    const requestEndpoint = `http://sw.unifresh.com.au:82/executesql/?apikey=Ytm1VIhM2ai7fewNDR1QpEypr%2FuqXBZvspibPCxoBoLiXyEA8DVaP2BcAiw6th%2Bvgj7Gcr%2FwuXPDWyCpABxO3FQLtzLlgOsh4YFHHNcCx55E4LUDYWA%3D&format=json`;
    const response = await fetch(requestEndpoint, {
      method: "POST",
      body: Report,
      headers: {
        "Content-Type": "application/json",
      },
    });
    console.log(response)
    // const jsonResponse = await response.json();
    // return jsonResponse;
  };
  module.exports = MissingCustomerSchedules;
