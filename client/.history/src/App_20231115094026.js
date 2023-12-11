import React, { useEffect } from "react";
import { Route, Routes, redirect } from "react-router-dom";
import App1 from "./components/index";
import Layout from "./App_1";

export default function App() {
  return (
    <div className="">
      <Routes>
        <Layout>
          <Route path="/" element={<App1 />} />
        </Layout>
      </Routes>
    </div>
  );
}
