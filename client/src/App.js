import React from "react";
import { Route, Routes } from "react-router-dom";
import App1 from "./components/index";
import Reports from "./components/report";
import Ccustomermissingschedule from "./components/Reports/Ccustomermissingschedule";
import OrderForWrongDate from "./components/Reports/OrderForWrongDate";
import ShadowOrderCheck from "./components/Reports/ShadowOrderCheck";
import OrderMatrix from "./components/Reports/OrderMatrix";
import AccountingLinkMonitor from "./components/Reports/AccountingLinkMonitor";
import CutOfTimeChanges from "./components/Reports/CutOfTimeChanges";
import FailedOrder from "./components/Reports/FailedOrder";
import ReportKFCVendor from "./components/Reports/ReportKFCVendor";
import DominosIndex from "./components/Orders/Dominos/Home";
import DominosItems from "./components/Orders/Dominos/Items";
import WebIndex from "./components/Orders/Web/Home";
import WebItems from "./components/Orders/Web/Items";
import CustomerIndex from "./components/Customers/index";
import CustomerSchedules from "./components/Customers/Schedules";
import PrintIndex from "./components/Print/Index";
import Payments from "./components/AccountLinkMontor/Payments";
import PaymentsHolding from "./components/AccountLinkMontor/Payments_Holding";
import Purchase from "./components/AccountLinkMontor/Purchase";
import Sales from "./components/AccountLinkMontor/Sales";
import Orderindex from "./components/OnlineOrder/index";
import ViewDocuments from "./components/OnlineOrder/ViewDocuments";
import OrderingSchedules from "./components/OnlineOrder/OrderingSchedules";
import PlaceOrder from "./components/OnlineOrder/PlaceOrder";
import Invoice from "./components/OnlineOrder/Invoice";
import TodayETA from "./components/OnlineOrder/TodayETA";
import WebLogin from "./components/Auth/WebLogin";
import DasbhoardIndex from "./components/Dashboard/index";
import Test from "./components/OnlineOrder/Test";
import PrintLabels from "./components/PrintLabels/index";
import OrderMatrixIndex from "./components/Customers/OrderMatrix/index";
import OrderMatrixDashboard from "./components/Customers/OrderMatrix/Dashboard";

import OrderMatrixMatrix from "./components/Customers/OrderMatrix/Pages/Matrix";
import OrderMatrixProfile from "./components/Customers/OrderMatrix/Pages/Profile";
import OrderMatrixShadow from "./components/Customers/OrderMatrix/Pages/Shadow";
import SendSalesReport from "./components/Reports/SendSalesReport";


export default function App() {
   if( !localStorage.getItem("WebLogin")) {
      return <WebLogin />;
  } else {
    return (
      <div className="">
        <Routes>
          <Route path="/" element={<App1 />} />
          {/* REPORTS */}
          <Route path="/reports" element={<Reports />} />
          <Route path="/reports/Ccustomermissingschedule" element={<Ccustomermissingschedule />} />
          <Route path="/reports/orderforwrongdate" element={<OrderForWrongDate />} />
          <Route path="/reports/ShadowOrderCheck" element={<ShadowOrderCheck />} />
          <Route path="/reports/AccountingLinkMonitor" element={<AccountingLinkMonitor />} />
          <Route path="/reports/OrderMatrix" element={<OrderMatrix />} />
          <Route path="/reports/CutOfTimeChanges" element={<CutOfTimeChanges />} />
          <Route path="/reports/FailedOrder" element={<FailedOrder />} />
          <Route path="/reports/ReportKFCVendor" element={<ReportKFCVendor />} />
          <Route path="/reports/SendSalesReport" element={<SendSalesReport />} />
          <Route path="/Order/Dominos" element={<DominosIndex />} />
          {/* WEB */}
          <Route path="/Order/weborder" element={<WebIndex />} />
          <Route path="/Order/Web/Item/:id" element={<WebItems />} />
          {/*  */}
          <Route path="/Order/Dominos/Item/:id" element={<DominosItems />} />
          <Route path="/Customers/index" element={<CustomerIndex />} />
          <Route path="/Customers/Schedules/:id" element={<CustomerSchedules />} />

          {/* Account Link Monitor */}
          <Route path="/AccountLinkMonitor/Payments" element={<Payments />} />
          <Route path="/AccountLinkMonitor/Payments_Holding" element={<PaymentsHolding />} />
          <Route path="/AccountLinkMonitor/Sales" element={<Sales />} />
          <Route path="/AccountLinkMonitor/Purcahse" element={<Purchase />} />

          {/* ONLINE ORDER */}
          <Route path="/orderOnline" element={<Orderindex />} />
          <Route
            path="/orderOnline/viewDocuments"
            element={<ViewDocuments />}
          />
          <Route
            path="/orderOnline/OrderingSchedules"
            element={<OrderingSchedules />}
          />
          <Route path="/orderOnline/PlaceOrder" element={<PlaceOrder />} />
          <Route path="/orderOnline/Invoice/:invoice" element={<Invoice />} />
          <Route path="/orderOnline/TodayETA" element={<TodayETA />} />
          <Route path="/dashboard" element={<DasbhoardIndex />} />

          {/* print */}
          <Route path="/Print/index" element={<PrintIndex />} />
          <Route path="/Print/Label" element={<PrintLabels />} />
          
          
          {/* Order Matrix */}
          <Route path="/OrderMatrix/index" element={<OrderMatrixIndex />} />
          <Route path="/OrderMatrix/dashboard" element={<OrderMatrixDashboard />} />
          <Route path="/OrderMatrix/Matrix" element={<OrderMatrixMatrix />} />
          <Route path="/OrderMatrix/Profile" element={<OrderMatrixProfile />} />
          <Route path="/OrderMatrix/Shadow" element={<OrderMatrixShadow />} />

          <Route path="/AAA" element={<Test />} />
        </Routes>
      </div>
    );
  }
}
