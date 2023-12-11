import { Customermaster } from "../SQL/Report";

export const Get_Request = (e) => {
    const Body = `SELECT * FROM CUSTOMERMASTER`;

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
