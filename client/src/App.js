import React, { useEffect } from "react";
import { Route, Routes, redirect } from "react-router-dom";
import App1 from "./components/index";
import Reports from "./components/report";
import MOR from "./components/Reports/MissedSaleOrder";
import OrderForWrongDate from "./components/Reports/OrderForWrongDate";
import ShadowOrderCheck from "./components/Reports/ShadowOrderCheck";

export default function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<App1 />} />
        {/* REPORTS */}
        <Route path="/reports" element={<Reports />} />
        <Route path="/reports/missedorderreport" element={<MOR />} />
        <Route
          path="/reports/orderforwrongdate"
          element={<OrderForWrongDate />}
        />
        <Route
          path="/reports/ShadowOrderCheck"
          element={<ShadowOrderCheck />}
        />
      </Routes>
    </div>
  );
}
