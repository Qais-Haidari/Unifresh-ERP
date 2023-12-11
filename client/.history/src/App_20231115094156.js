import React, { useEffect } from "react";
import { Route, Routes, redirect } from "react-router-dom";
import App1 from "./components/index";
import Layout from "./App";

export default function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<App1 />} />
      </Routes>
    </div>
  );
}
