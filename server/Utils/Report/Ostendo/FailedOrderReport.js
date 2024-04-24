const MissingCustomerSchedules = async (date) => {
    let Report = `
    SELECT 
    cast(:date as date) as "QueryDate",
    cast(TS as timestamp) as "TS",

    UF_AUTOORDER_LOG.log_text,UF_AUTOORDER_LOG.log_type ,UF_AUTOORDER_LOG.SYSUNIQUEID FROM UF_AUTOORDER_LOG where
    (
    upper(LOG_TEXT) LIKE upper(:cust||'%') or 
    upper(LOG_TEXT) LIKE upper('%'||:cust) or 
    :cust is null
    )

    and ( :date is null or cast(TS as date)  = cast(:date as date) )


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
    // console.log(response)
    return jsonResponse
  };
  module.exports = MissingCustomerSchedules;