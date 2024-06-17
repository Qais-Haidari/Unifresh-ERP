const MissingCustomerSchedules = async (customer) => {
    let Report = `

    SELECT
  LISTLINES.LINECODE, 
  ITEMMASTER.ITEMDESCRIPTION as "LINEDESCRIPTION"
  FROM 
  LISTMASTER, 
  LISTLINES, 
  ITEMMASTER, 
  CUSTOMERMASTER 
  WHERE 
  LISTLINES.LINECODE = ITEMMASTER.ITEMCODE and 
  LISTMASTER.LISTCODE = LISTLINES.LISTCODE and 
  LISTMASTER.LISTLINKEDNAME = CUSTOMERMASTER.CUSTOMER and
  LISTMASTER.LISTSTATUS = 'Active' and 
  LISTMASTER.LISTLINKEDNAME = '${customer}'
  order by upper(ITEMMASTER.ITEMDESCRIPTION)
    
    `;
    const requestEndpoint = `http://sw.unifresh.com.au:82/sqlquery/?apikey=Ytm1VIhM2ai7fewNDR1QpEypr%2FuqXBZvspibPCxoBoLiXyEA8DVaP2BcAiw6th%2Bvgj7Gcr%2FwuXPDWyCpABxO3FQLtzLlgOsh4YFHHNcCx55E4LUDYWA%3D&format=json`;
    const response = await fetch(requestEndpoint, {
      method: "POST",
      body: Report,
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(response)
    const jsonResponse = await response.json();
    return jsonResponse
  };
  module.exports = MissingCustomerSchedules;