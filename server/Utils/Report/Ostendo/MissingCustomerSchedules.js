const MissingCustomerSchedules = async (name) => {
    let Report = `
    SELECT * FROM (select CM1.SYSUNIQUEID as "GRIDUNIQUEINDEX",
     CM1.customer,
     '${name}' as "SCHEDULENAME",
      SCHECK."FOUND", SCHECK.CUSTOMERGROUP  from customermaster CM1
      left join (select distinct CM.CUSTOMER,CSG.CUSTOMERGROUP, SC.SCHEDULENAME,
        1 as "FOUND" from uf_schedules sc join customerschedulegroups csg on (sc.grouping = csg."GROUP")
        JOIN CUSTOMERMASTER CM ON ( CSG.CUSTOMERGROUP = CM.CUSTOMER OR CSG.CUSTOMERGROUP = CM.ADDITIONALFIELD_1) 
        where schedulename = '${name}'  AND CM.CUSTOMERSTATUS = 'Active') SCHECK on CM1.CUSTOMER = SCHECK.CUSTOMER WHERE 
        CUSTOMERSTATUS = 'Active' and "FOUND" IS NULL) 
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
  module.exports = MissingCustomerSchedules;