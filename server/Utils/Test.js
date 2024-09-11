let subway = [
  {
      "CUSTOMER": "Subway Marsden Park NSW 71172"
  },
  {
      "CUSTOMER": "NSW Test Subway 1"
  },
  {
      "CUSTOMER": "Subway Glendenning NSW 47693"
  },
  {
      "CUSTOMER": "Subway Swansea NSW 32658"
  },
  {
      "CUSTOMER": "Subway North Strathfield NSW 43415"
  },
  {
      "CUSTOMER": "NSW Subway Test 8101 123458101"
  },
  {
      "CUSTOMER": "NSW Subway Test 8007 123458007"
  },
  {
      "CUSTOMER": "NSW Subway Test 8009 123458009"
  },
  {
      "CUSTOMER": "NSW Subway Test 8011 123458011"
  },
  {
      "CUSTOMER": "NSW Subway Test 8013 123458013"
  },
  {
      "CUSTOMER": "NSW Subway Test 8015 123458015"
  },
  {
      "CUSTOMER": "NSW Subway Test 8102 123458102"
  },
  {
      "CUSTOMER": "Subway Lidcombe NSW 47301"
  },
  {
      "CUSTOMER": "NSW Subway Test 8103 123458103"
  },
  {
      "CUSTOMER": "Subway Stanhope Gardens NSW 30450"
  },
  {
      "CUSTOMER": "Subway Westfield Liverpool  NSW 21619"
  },
  {
      "CUSTOMER": "Subway Roselands NSW 24711"
  },
  {
      "CUSTOMER": "Subway Rockdale NSW 36153"
  },
  {
      "CUSTOMER": "Subway Baulkham Hills NSW 26545"
  },
  {
      "CUSTOMER": "Subway Westfield Parramatta L5 NSW 23280"
  },
  {
      "CUSTOMER": "Subway Kings Park NSW 36413"
  },
  {
      "CUSTOMER": "Subway Arndell Park NSW 37378"
  },
  {
      "CUSTOMER": "Subway Plumpton NSW 43063"
  },
  {
      "CUSTOMER": "Subway Circa Norwest NSW 48273"
  },
  {
      "CUSTOMER": "Subway Kings Cross NSW 43032"
  },
  {
      "CUSTOMER": "Subway Sydney Int Airport NSW 33566"
  },
  {
      "CUSTOMER": "Subway Emerton NSW 63452"
  },
  {
      "CUSTOMER": "Subway Narellan NSW 35916"
  },
  {
      "CUSTOMER": "NSW Subway Test 8201 NSW 123458201.1"
  },
  {
      "CUSTOMER": "Subway Blacktown NSW 26546"
  },
  {
      "CUSTOMER": "Subway Druit St NSW 36214"
  },
  {
      "CUSTOMER": "Subway Regents Park NSW 57452"
  },
  {
      "CUSTOMER": "Subway Clarence NSW St 25739"
  },
  {
      "CUSTOMER": "Subway Rouse Hill NSW 43262"
  },
  {
      "CUSTOMER": "Subway Eastern Creek NSW 65635"
  },
  {
      "CUSTOMER": "Subway Seven Hills Plaza NSW 28929"
  },
  {
      "CUSTOMER": "Subway Blaxland NSW 29329"
  },
  {
      "CUSTOMER": "Subway The Ponds NSW 65052"
  },
  {
      "CUSTOMER": "Subway Woodcroft NSW 30595"
  },
  {
      "CUSTOMER": "Subway Westfield Parramatta L1 NSW 38969"
  },
  {
      "CUSTOMER": "Subway Kings Langley NSW 53201"
  },
  {
      "CUSTOMER": "Subway Broadway NSW 16981"
  },
  {
      "CUSTOMER": "Subway Smithfield NSW 27045"
  },
  {
      "CUSTOMER": "Subway Church St NSW 21556"
  },
  {
      "CUSTOMER": "Subway Nepean NSW 28495"
  },
  {
      "CUSTOMER": "Subway Southlands NSW 48469"
  },
  {
      "CUSTOMER": "Subway Quakers Hill NSW 35478"
  },
  {
      "CUSTOMER": "Subway Warners Bay Newcastle NSW 34589"
  },
  {
      "CUSTOMER": "Subway Emu Plains NSW 36162"
  },
  {
      "CUSTOMER": "Subway Miranda NSW 35632"
  },
  {
      "CUSTOMER": "Subway Dural NSW 54306"
  },
  {
      "CUSTOMER": "Subway Bonnyrigg NSW 30803"
  },
  {
      "CUSTOMER": "Subway Minto Mall NSW 60614"
  },
  {
      "CUSTOMER": "Subway DFO Homebush NSW 24931"
  },
  {
      "CUSTOMER": "Subway Glenmore Village NSW 73590"
  },
  {
      "CUSTOMER": "Subway Dapto Mall NSW 36888"
  },
  {
      "CUSTOMER": "Subway Dapto NSW 33036"
  },
  {
      "CUSTOMER": "Subway Gosford Imperial NSW 66501"
  }
]


// const Report = `
  
// `;

const Get_Request = async (e) => {
    let res = [];
    console.log(subway.length)
    for (let index = 0; index < subway.length; index++) {
        const element = subway[index].CUSTOMER;
        const requestEndpoint = `http://sw.unifresh.com.au:82/sqlquery/?apikey=Ytm1VIhM2ai7fewNDR1QpEypr%2FuqXBZvspibPCxoBoLiXyEA8DVaP2BcAiw6th%2Bvgj7Gcr%2FwuXPDWyCpABxO3FQLtzLlgOsh4YFHHNcCx55E4LUDYWA%3D&format=json`;
        const response = await fetch(requestEndpoint, {
          method: "POST",
          body: `select * from UF_CUST_SCHEDULES WHERE CUSTOMER = '${element}'`,
          headers: {
            "Content-Type": "application/json",
          },
        });
        const jsonResponse = await response.json();
        res[index] = jsonResponse;
        console.log(res)
    }
};
module.exports = Get_Request;