const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const axios = require("axios");
const User = require("../Model/User");
const Department = require("../Model/Department");
const Task = require("../Model/Tasks");
const TaskAuth = require("../Model/TaskAuth");
const PrimaryTasks = require("../Model/PrimaryTasks");
const PrimaryTaskAuth = require("../Model/PrimaryTaskAuth");

// Update Task Auth Value
Router.post("/AuthUpdateValue/:id/:taskid", (req, res) => {
  TaskAuth.findOneAndUpdate(
    { ID: req.params.id, Task_ID: req.params.taskid },
    {
      Value: req.body.Value,
      isUserSubmit: "Yes",
      SubmitDate: req.body.Date,
      ActionedBy: req.body.ActionedBy,
    }
  )
    .then((r) => {})
    .catch((err) => res.send(err));
  Task.findOneAndUpdate({ ID: req.params.taskid }, { Actioned: true })
    .then((r) => {
      res.send(r);
    })
    .catch((err) => res.send(err));
});

// Update Task Auth Yes No
Router.post("/AuthUpdateYes/:id/:taskid", (req, res) => {
  TaskAuth.findOneAndUpdate(
    { ID: req.params.id, Task_ID: req.params.taskid },
    {
      Value: req.body.Value,
      isUserSubmit: "Yes",
      SubmitDate: req.body.Date,
      ActionedBy: req.body.ActionedBy,
    }
  )
    .then((r) => {})
    .catch((err) => res.send(err));
  Task.findOneAndUpdate({ ID: req.params.taskid }, { Actioned: true })
    .then((r) => {
      res.send(r);
    })
    .catch((err) => res.send(err));
});

// Reject Task and add Feedback
Router.post("/AuthUpdateFeedback/:id/:taskid", (req, res) => {
  TaskAuth.findOneAndUpdate(
    { ID: req.params.id },
    {
      feedback: req.body.feeback,
      isUserSubmit: "NO",
      SubmitDate: req.body.Date,
    }
  )
    .then((r) => {})
    .catch((err) => res.send(err));
  Task.findOneAndUpdate({ ID: req.params.taskid }, { Actioned: false })
    .then((r) => {
      res.send(r);
    })
    .catch((err) => res.send(err));
});

// Approve Task
Router.post("/AuthUpdateApprove/:id/:taskid", async (req, res) => {
  const count = await TaskAuth.find({
    Task_ID: req.params.taskid,
    isAdminApproved: "NO",
  }).countDocuments();
  console.log(count);
  if (count === 1) {
    await Task.findOneAndUpdate(
      { ID: req.params.taskid },
      { is_task_done: true }
    );
  }
  TaskAuth.findOneAndUpdate(
    { ID: req.params.id },
    {
      isUserSubmit: "Yes",
      isAdminApproved: "Yes",
    }
  )
    .then((r) => {})
    .catch((err) => res.send(err));
  Task.findOneAndUpdate({ ID: req.params.taskid }, { Actioned: false })
    .then((r) => {
      res.send(r);
    })
    .catch((err) => res.send(err));
});

Router.post("/BuldUpdate", async (req, res) => {
  let IDs = req.body.IDs;
  var filtered = IDs.filter(function (el) {
    return el != null;
  });
  for (let index = 0; index < filtered.length; index++) {
    let Data = await Task.findOne({ ID: filtered[index] });
    Task.findOneAndUpdate(
      { ID: filtered[index] },
      {
        Short_description:
          req.body.Short_description !== ""
            ? req.body.Short_description
            : Data.Short_description,
        Summary: req.body.Summary !== "" ? req.body.Summary : Data.Summary,
        Priority: req.body.Priority !== "" ? req.body.Priority : Data.Priority,
        start_date_time:
          req.body.start_date_time !== ""
            ? req.body.start_date_time
            : Data.start_date_time,
        end_date_time:
          req.body.end_date_time !== ""
            ? req.body.end_date_time
            : Data.end_date_time,
        Tast_duration:
          req.body.Tast_duration !== ""
            ? req.body.Tast_duration
            : Data.Tast_duration,
        Task_Recurrence:
          req.body.Task_Recurrence !== ""
            ? req.body.Task_Recurrence
            : Data.Task_Recurrence,
        Assign_to_User:
          req.body.Assign_to_User !== ""
            ? req.body.Assign_to_User
            : Data.Assign_to_User,
        Assign_to_Department:
          req.body.Assign_to_Department !== ""
            ? req.body.Assign_to_Department
            : Data.Assign_to_Department,
        Escalated_to_User:
          req.body.Escalated_to_User !== ""
            ? req.body.Escalated_to_User
            : Data.Escalated_to_User,
        Escalated_to_Department:
          req.body.Escalated_to_Department !== ""
            ? req.body.Escalated_to_Department
            : Data.Escalated_to_Department,
        SMS_Notifiy:
          req.body.Email_SMS !== "" ? req.body.Email_SMS : Data.Email_SMS,
        Email_Notify:
          req.body.Email_Notify !== "" ? req.body.Email_Notify : false,
        Monday: req.body.Monday !== "" ? req.body.Monday : false,
        Thuesday: req.body.Thuesday !== "" ? req.body.Thuesday : false,
        Wednesday: req.body.Wednesday !== "" ? req.body.Wednesday : false,
        Thudesday: req.body.Thudesday !== "" ? req.body.Thudesday : false,
        Friday: req.body.Friday !== "" ? req.body.Friday : false,
        Saturday: req.body.Saturday !== "" ? req.body.Saturday : false,
        Sunday: req.body.Sunday !== "" ? req.body.Sunday : false,
      }
    )
      .then((r) => {})
      .catch((err) => res.send(err));
  }
});

// Rollover
Router.post("/rollover/:id/:time", async (req, res) => {
  const newDate = req.params.time.split(" ")[0];
  const newTime = await Task.findOne({ ID: req.params.id }).select(
    "start_date_time"
  );
  Task.findOneAndUpdate(
    {
      ID: req.params.id,
    },
    {
      is_task_rollovered: true,
      is_task_done: false,
      start_date_time: req.params.time,
      Task_Date: req.params.time,
    }
  )
    .then((r) => res.send(r))
    .catch((err) => err);
});

// Task Update
Router.post("/createTask/update/:id", (req, res) => {
  console.log(req.body);
  Task.findOneAndUpdate(
    {
      ID: req.params.id,
    },
    {
      Short_description: req.body.Short_description,
      Summary: req.body.Summary,
      Priority: req.body.Priority,
      TaskNumber: req.body.TaskNumber,
      Tast_duration: req.body.Tast_duration,
      Assign_to_User: req.body.Assign_to_User,
      Assign_to_Department: req.body.Assign_to_Department,
      Escalated_to_User: req.body.Escalated_to_User,
      Escalated_to_Department: req.body.Escalated_to_Department,
      Email_Notify: req.body.Email_Notify,
      SMS_Notifiy: req.body.SMS_Notifiy,
      Task_Recurrence: req.body.Task_Recurrence,
      Monday: req.body.Monday,
      Thuesday: req.body.Thuesday,
      Wednesday: req.body.Wednesday,
      Thudesday: req.body.Thuesday,
      Friday: req.body.Friday,
      Saturday: req.body.Saturday,
      Sunday: req.body.Sunday,
      start_date_time: req.body.StartDate,
      end_date_time: req.body.EndDate,
      start_time: req.body.StartTime,
      end_time: req.body.EndTime,
    }
  )
    .then((r) => res.send(r))
    .catch((err) => err);
});

// PRIMARY TASKS
// Task Update
Router.post("/PrimaryTask/update/:id", (req, res) => {
  PrimaryTasks.findOneAndUpdate(
    {
      ID: req.params.id,
    },
    {
      Short_description: req.body.Short_description,
      Summary: req.body.Summary,
      Priority: req.body.Priority,
      TaskNumber: req.body.TaskNumber,
      Tast_duration: req.body.Tast_duration,
      Assign_to_User: req.body.Assign_to_User,
      Assign_to_Department: req.body.Assign_to_Department,
      Escalated_to_User: req.body.Escalated_to_User,
      Escalated_to_Department: req.body.Escalated_to_Department,
      Email_Notify: req.body.Email_Notify,
      SMS_Notifiy: req.body.SMS_Notifiy,
      Task_Recurrence: req.body.Task_Recurrence,
      Monday: req.body.Monday,
      Thuesday: req.body.Thuesday,
      Wednesday: req.body.Wednesday,
      Thudesday: req.body.Thuesday,
      Friday: req.body.Friday,
      Saturday: req.body.Saturday,
      Sunday: req.body.Sunday,
      StartDate: req.body.StartDate,
      EndDate: req.body.EndDate,
      StartTime: req.body.StartTime,
      EndTime: req.body.EndTime,
      Approve_By: req.body.Approve_By,
    }
  )
    .then((r) => console.log("message"))
    .catch((err) => err);

  PrimaryTaskAuth.updateMany(
    { Task_ID: req.params.id },
    { $set: { Approve_By: req.body.Approve_By } }
  )
    .then((r) => res.send(r))
    .catch((err) => err);
});
// Task Auth Update
Router.post("/PrimaryTaskAuth/update/:id", (req, res) => {
  // console.log(req.params.id);
  // console.log(req.body);
  PrimaryTaskAuth.findOneAndUpdate(
    {
      ID: req.params.id,
    },
    {
      Type: req.body.Type,
      MinValue: req.body.Min,
      MaxValue: req.body.Max,
      ExptectedValue: req.body.Expected,
      Questions: req.body.Question,
    }
  )
    .then((r) => res.send(r))
    .catch((err) => err);
});
// Update User
Router.post("/CreateUser/update/:id", (req, res) => {
  User.findOneAndUpdate(
    {
      ID: req.params.id,
    },
    {
      First_Name: req.body.First_Name,
      Last_Name: req.body.Last_Name,
      Email: req.body.Email,
      Phone: req.body.Phone,
      Start_of_business: req.body.Start_of_business,
      End_of_business: req.body.End_of_business,
      Is_Admin: req.body.Is_Admin,
      Departments: req.body.Department,
      DepartmentsAdmin: req.body.DepartmentAdmin,
    }
  )
    .then((r) => res.send(r))
    .catch((err) => err);
});

module.exports = Router;
