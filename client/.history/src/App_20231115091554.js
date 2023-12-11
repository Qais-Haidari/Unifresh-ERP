import React, { useEffect } from "react";
import { Route, Routes, redirect } from "react-router-dom";
import MainPage from "./Mainpage";

export default function App() {
  return (
    <div className="">
      <Routes>
        <Route path="/" element={<MainPage />} />
        {/* <Route path="/admin" element={<Admin />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/leaderboard" element={<Leaderboard />} />
          <Route path="/tasklist" element={<Tasklist />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/viewtask/:TaskID" element={<Viewtask />} />
          <Route path="/Report" element={<Report />} />
          <Route path="/Customize" element={<Customize />} />
          <Route path="/Countdown" element={<Countdown />} /> */}

        {/* Admin Components Link */}
        {/* <Route path="/createDepartment" element={<CreateDepartment />} />
          <Route path="/UpdateDepartment/:id" element={<UpdateDepartment />} />
          <Route path="/createTask" element={<CreateTask />} />
          <Route path="/createTask/update/:id" element={<UpdateTask />} />
          <Route path="/createUser" element={<CreateUser />} />
          <Route path="/UpdateUser/:id" element={<UpdateUser />} /> */}

        {/* CUstomise components Link */}
        {/* <Route path="/Customize/BulkUpdate" element={<BulkUpdate />} />
          <Route path="/Customize/OldTask" element={<OldTask />} />
          <Route path="/tasktimemanagment" element={<TaskTimeManagment />} /> */}

        {/* Primary Tasks */}
        {/* <Route path="/PrimaryTask" element={<Primarytask />} />
          <Route
            path="/PrimaryTask/update/:id"
            element={<PrimarytaskUpdate />}
          /> */}
        {/* <Route
            path="/PrimaryTaskAuth/update/:id"
            element={<PrimaryTaskAuthUpdate />}
          /> */}
        {/* ADVANCE DASHBAORD */}
        {/* <Route path="AdvanceDashboard" element={<Advance />} /> */}
        {/* <Route path="AdvanceDashboard/:id" element={<Advance />} /> */}
      </Routes>
    </div>
  );
}
