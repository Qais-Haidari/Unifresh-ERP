import React, { useEffect } from "react";
import { Route, Routes, redirect } from "react-router-dom";
import App1 from "./components/index";
import Reports from "./components/report";
import MOR from "./components/Reports/MissedSaleOrder";
import OrderForWrongDate from "./components/Reports/OrderForWrongDate";
import ShadowOrderCheck from "./components/Reports/ShadowOrderCheck";

import DominosIndex from "./components/Orders/Dominos/Home";
import DominosItems from "./components/Orders/Dominos/Items";


import WebIndex from "./components/Orders/Web/Home";
import WebItems from "./components/Orders/Web/Items";

import CustomerIndex from "./components/Customers/index";
import CustomerSchedules from "./components/Customers/Schedules";

// ONLINE ORDER
import Orderindex from "./components/OnlineOrder/index";
import ViewDocuments from "./components/OnlineOrder/ViewDocuments";
import OrderingSchedules from "./components/OnlineOrder/OrderingSchedules";
import PlaceOrder from "./components/OnlineOrder/PlaceOrder";
import Invoice from "./components/OnlineOrder/Invoice";
import TodayETA from "./components/OnlineOrder/TodayETA";

// Auth
import WebLogin from "./components/Auth/WebLogin";

// Dashboard
import DasbhoardIndex from "./components/Dashboard/index";

import Test from './components/OnlineOrder/Test'

export default function App() {

  if (!localStorage.getItem('WebLogin')) {
    return(
      <WebLogin />
    )
  }else {
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
          <Route
            path="/Order/Dominos"
            element={<DominosIndex />}
          />
          {/* WEB */}
          <Route
            path="/Order/weborder"
            element={<WebIndex />}
          />
          <Route
            path="/Order/Web/Item/:id"
            element={<WebItems />}
          />
          {/*  */}
          <Route
            path="/Order/Dominos/Item/:id"
            element={<DominosItems />}
          />
          <Route
            path="/Customers/index"
            element={<CustomerIndex />}
          />
          <Route
            path="/Customers/Schedules/:id"
            element={<CustomerSchedules />}
          />
          {/* ONLINE ORDER */}
          <Route
            path="/orderOnline"
            element={<Orderindex />}
          />
          <Route
            path="/orderOnline/viewDocuments"
            element={<ViewDocuments />}
          />
          <Route
            path="/orderOnline/OrderingSchedules"
            element={<OrderingSchedules />}
          />
          <Route
            path="/orderOnline/PlaceOrder"
            element={<PlaceOrder />}
          />
          <Route
            path="/orderOnline/Invoice/:invoice"
            element={<Invoice />}
          />
          <Route
            path="/orderOnline/TodayETA"
            element={<TodayETA />}
          />
          <Route
            path="/dashboard"
            element={<DasbhoardIndex />}
          />


          <Route
            path="/AAA"
            element={<Test />}
          />
        </Routes>
      </div>
    );
  }
}

// else if(!localStorage.getItem('AdminLogin')) {
//   return (
//     <p>Admin Login</p>
//   )   
// }