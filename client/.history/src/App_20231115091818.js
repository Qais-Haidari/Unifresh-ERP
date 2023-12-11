import React, { useEffect } from "react";
import { Route, Routes, redirect } from "react-router-dom";
import App from "./App_1";

export default function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<app_1 />} />
      </Routes>
    </div>
  );
}
