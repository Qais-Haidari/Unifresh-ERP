import React from "react";
import Layout from "../../Layout";
import { Get_Request } from "../../Utils/Request";

export default function MissedSaleOrder() {
  Get_Request();
  return <Layout>report</Layout>;
}
