import React from "react";
import Layout from "../../Layout";
import { Get_Request } from "../../Utils/Request";
import { Customermaster } from "../../SQL/Report";

export default function MissedSaleOrder() {
  Get_Request();
  return <Layout>report</Layout>;
}
