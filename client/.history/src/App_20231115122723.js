import React, { useEffect } from "react";
import { Route, Routes, redirect } from "react-router-dom";
import App1 from "./components/index";
import Reports from "./components/report";

export default function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<App1 />} />
        {/* REPORTS */}
        <Route path="/reports" element={<Reports />} />
        <Route path="/reports/missedorderreport" element={<Reports />} />
      </Routes>
    </div>
  );
}
