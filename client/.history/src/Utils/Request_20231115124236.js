import { Customermaster } from "../SQL/Report";

export const Get_Request = (e) => {
    const Body = `SELECT * FROM CUSTOMERMASTER`;
    const requestEndpoint = `http://sw.unifresh.com.au:82/sqlquery/?apikey=Ytm1VIhM2ai7fewNDR1QpEypr%2FuqXBZvspibPCxoBoLiXyEA8DVaP2BcAiw6th%2Bvgj7Gcr%2FwuXPDWyCpABxO3FQLtzLlgOsh4YFHHNcCx55E4LUDYWA%3D&format=json`;
    const response = await fetch(requestEndpoint, {
      method: "POST",
      body: Body,
      headers: {
        "Content-Type": "application/json",
      },
    });
    // console.log(JSON.parse(JSON.stringify(response)));
    const jsonResponse = await response.json();
    // console.log(jsonResponse);
    console.log(jsonResponse);
};
