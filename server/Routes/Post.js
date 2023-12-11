const express = require("express");
const Router = express.Router();
const mongoose = require("mongoose");
const axios = require("axios");
const User = require("../Model/User");
const Department = require("../Model/Department");
const Task = require("../Model/Tasks");
const PrimaryTask = require("../Model/PrimaryTasks");
const PrimaryTaskAuth = require("../Model/PrimaryTaskAuth");
const multer = require("multer");
const TaskAuth = require("../Model/TaskAuth");
const moment = require("moment");
const { v4: uuidv4 } = require("uuid");

// Create User
Router.post("/createUser", (req, res) => {
  const NewUser = new User({
    Status: req.body.Status,
    ID: req.body.ID,
    First_Name: req.body.First_Name,
    Last_Name: req.body.Last_Name,
    Email: req.body.Email,
    Phone: req.body.Phone,
    Start_of_business: req.body.Start_of_business,
    End_of_business: req.body.End_of_business,
    Is_Admin: req.body.Is_Admin,
    Departments: req.body.Department,
    DepartmentsAdmin: req.body.DepartmentsAdmin,
  });

  NewUser.save(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log("user Successfully Saved");
    }
    res.send("data saved");
  });
});

// Create Department
Router.post("/createDepartment", (req, res) => {
  const NewDepartment = new Department({
    ID: req.body.ID,
    Department_ID: req.body.Department_ID,
    Department_Name: req.body.Department_Name,
    Email: req.body.Email,
    Start_of_Business: req.body.Start_of_business,
    End_of_Business: req.body.End_of_business,
  });
  NewDepartment.save(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log("Department Successfully Created");
    }
    res.send("data saved");
  });
});

Router.post("/UpdateDepartment/:id", (req, res) => {
  Department.findOneAndUpdate(
    {
      ID: req.params.id,
    },
    {
      Department_Name: req.body.Department_Name,
      Email: req.body.Email,
      Start_of_Business: req.body.Start_of_business,
      End_of_Business: req.body.End_of_business,
    }
  )
    .then((r) => res.send(r))
    .catch((err) => err);
});

// create Task
Router.post("/createTask", async (req, res) => {
  let AddMoreReq = [];
  if (req.body.OnceOFF == false) {
    const AddNumber = req.body.TaskNumber;
    const HourMins = req.body.Tast_duration;
    var time = req.body.start_date_time.split(" ")[1];
    var hours = Number(time.split(":")[0]);
    var minutes = Number(time.split(":")[1]);
    var AMPM = req.body.start_date_time.split(" ")[2];
    let EndTime = moment(hours + ":" + minutes + " " + AMPM, ["h:mm A"])
      .add(AddNumber, HourMins)
      .format("HH:mm");
    let startTime = moment(hours + ":" + minutes + " " + AMPM, [
      "h:mm A",
    ]).format("HH:mm");
    let Date = req.body.start_date_time.split(" ")[0];
    const Assign_to_User = req.body.Assign_to_User;
    const Assign_to_Department = req.body.Assign_to_Department;
    const Escalated_to_User = req.body.Escalated_to_User;
    const Escalated_to_Department = req.body.Escalated_to_Department;
    // let oldtask_ = await Task.findOne({
    //   start_time: { $gt: EndTime },
    //   Assign_to_User: Assign_to_User,
    // }).sort("start_time");
    // if (oldtask_.start_time - 1 == EndTime) {
    //   console.log("Matched");
    // }
    // let oldtask = await Task.find({
    //   start_time: { $gt: EndTime },
    //   Assign_to_User: Assign_to_User,
    // });
    // for (let index = 0; index < oldtask.length; index++) {
    //   let NewEnd = moment(oldtask[index].end_time, ["HHmm"])
    //     .add(AddNumber, HourMins)
    //     .format("HH:mm");
    //   let NewStart = moment(oldtask[index].start_time, ["HHmm"])
    //     .add(AddNumber, HourMins)
    //     .format("HH:mm");
    //   await Task.findOneAndUpdate(
    //     { ID: oldtask[index].ID },
    //     { end_time: NewEnd, start_time: NewStart }
    //   );
    // }
    const NewTask = new Task({
      ID: uuidv4(),
      // Duration: `${AddNumber}`,
      Short_description: req.body.Short_description,
      Summary: req.body.Summary,
      Priority: req.body.Priority,
      start_date_time: Date,
      end_date_time: Date,
      Task_Recurrence: req.body.Task_Recurrence,
      Assign_to_User: req.body.Assign_to_User,
      Assign_to_Department: req.body.Assign_to_Department,
      Escalated_to_User: req.body.Escalated_to_User,
      Escalated_to_Department: req.body.Escalated_to_Department,
      Email_Notify: req.body.Email_Notify,
      SMS_Notifiy: req.body.Email_SMS,
      end_time: EndTime,
      start_time: startTime,
      Monday: req.body.Monday,
      Thuesday: req.body.Thuesday,
      Wednesday: req.body.Wednesday,
      Thudesday: req.body.Thudesday,
      Friday: req.body.Friday,
      Saturday: req.body.Saturday,
      Sunday: req.body.Sunday,
      Task_Date: req.body.Date,
      Approve_By: req.body.ApproveBy,
    });
    NewTask.save(function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log("Task Successfully Created");
      }
    });
    for (let index = 0; index < req.body.MoreReq.length; index++) {
      Object.assign(req.body.MoreReq[index][0], {
        ID: uuidv4(),
        Task_ID: NewTask.ID,
      });
    }
    const TaskAuths = new TaskAuth({
      ID: uuidv4(),
      Task_ID: NewTask.ID,
      Type: req.body.Type,
      MinValue: req.body.MinValue,
      MaxValue: req.body.MaxValue,
      ExptectedValue: req.body.ExptectedValue,
      Questions: req.body.Questions,
      User: Assign_to_User,
      Department: Assign_to_Department,
      Date: Date,
      EsUser: Escalated_to_User,
      EsDepartment: Escalated_to_Department,
      Approve_By: req.body.ApproveBy,
    });
    TaskAuths.save(function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log("Task Auth Successfully Created");
      }
    });
    for (let index1 = 0; index1 < req.body.MoreReq.length; index1++) {
      TaskAuth.create(req.body.MoreReq[index1][0]);
    }
    for (let index = 0; index < req.body.MoreReq.length; index++) {
      delete req.body.MoreReq[index][0].Task_ID;
    }
    // @@@@@@@@@@@@@@@@@@@@@@@
    // PRIMARY TASKS
    const PrimaryNewTask = new PrimaryTask({
      ID: uuidv4(),
      // Duration: `${AddNumber}`,
      Short_description: req.body.Short_description,
      Summary: req.body.Summary,
      Priority: req.body.Priority,
      start_date_time: Date,
      end_date_time: Date,
      Task_Recurrence: req.body.Task_Recurrence,
      Assign_to_User: req.body.Assign_to_User,
      Assign_to_Department: req.body.Assign_to_Department,
      Escalated_to_User: req.body.Escalated_to_User,
      Escalated_to_Department: req.body.Escalated_to_Department,
      Email_Notify: req.body.Email_Notify,
      SMS_Notifiy: req.body.Email_SMS,
      end_time: EndTime,
      start_time: startTime,
      Monday: req.body.Monday,
      Thuesday: req.body.Thuesday,
      Wednesday: req.body.Wednesday,
      Thudesday: req.body.Thudesday,
      Friday: req.body.Friday,
      Saturday: req.body.Saturday,
      Sunday: req.body.Sunday,
      Task_Date: req.body.Date,
    });
    PrimaryNewTask.save(function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log("Task Successfully Created");
      }
      // res.send("Task Successfully Created");
    });
    const PrimaryTaskAuths = new PrimaryTaskAuth({
      ID: uuidv4(),
      Task_ID: PrimaryNewTask.ID,
      Type: req.body.Type,
      MinValue: req.body.MinValue,
      MaxValue: req.body.MaxValue,
      ExptectedValue: req.body.ExptectedValue,
      Questions: req.body.Questions,
      User: Assign_to_User,
      Department: Assign_to_Department,
      Date: Date,
      EsUser: Escalated_to_User,
      EsDepartment: Escalated_to_Department,
      ApproveBy: req.body.ApproveBy,
    });
    PrimaryTaskAuths.save(function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log("Task Auth Successfully Created");
      }
      res.send("Task Successfully Created");
    });
    for (let index = 0; index < req.body.MoreReq.length; index++) {
      Object.assign(req.body.MoreReq[index][0], {
        Task_ID: PrimaryTaskAuths.ID,
      });
    }
    for (let index1 = 0; index1 < req.body.MoreReq.length; index1++) {
      PrimaryTaskAuth.create(req.body.MoreReq[index1][0]);
    }
  } else {
    const AddNumber = req.body.TaskNumber;
    const HourMins = req.body.Tast_duration;
    var time = req.body.start_date_time.split(" ")[1];
    var hours = Number(time.split(":")[0]);
    var minutes = Number(time.split(":")[1]);
    var AMPM = req.body.start_date_time.split(" ")[2];
    let EndTime = moment(hours + ":" + minutes + " " + AMPM, ["h:mm A"])
      .add(AddNumber, HourMins)
      .format("HH:mm");
    let startTime = moment(hours + ":" + minutes + " " + AMPM, [
      "h:mm A",
    ]).format("HH:mm");
    let Date = req.body.start_date_time.split(" ")[0];
    const Assign_to_User = req.body.Assign_to_User;
    const Assign_to_Department = req.body.Assign_to_Department;
    const Escalated_to_User = req.body.Escalated_to_User;
    const Escalated_to_Department = req.body.Escalated_to_Department;
    // let oldtask_ = await Task.findOne({
    //   start_time: { $gt: EndTime },
    //   Assign_to_User: Assign_to_User,
    // }).sort("start_time");
    // console.log(EndTime);
    // console.log(oldtask_.start_time);
    // if (oldtask_.start_time - 1 == EndTime) {
    //   console.log("Matched");
    // }
    // let oldtask = await Task.find({
    //   start_time: { $gt: EndTime },
    //   Assign_to_User: Assign_to_User,
    // });
    // for (let index = 0; index < oldtask.length; index++) {
    //   let NewEnd = moment(oldtask[index].end_time, ["HHmm"])
    //     .add(AddNumber, HourMins)
    //     .format("HH:mm");
    //   let NewStart = moment(oldtask[index].start_time, ["HHmm"])
    //     .add(AddNumber, HourMins)
    //     .format("HH:mm");
    //   await Task.findOneAndUpdate(
    //     { ID: oldtask[index].ID },
    //     { end_time: NewEnd, start_time: NewStart }
    //   );
    // }
    const NewTask = new Task({
      ID: uuidv4(),
      // Duration: `${AddNumber}`,
      Short_description: req.body.Short_description,
      Summary: req.body.Summary,
      Priority: req.body.Priority,
      start_date_time: Date,
      end_date_time: Date,
      Task_Recurrence: req.body.Task_Recurrence,
      Assign_to_User: req.body.Assign_to_User,
      Assign_to_Department: req.body.Assign_to_Department,
      Escalated_to_User: req.body.Escalated_to_User,
      Escalated_to_Department: req.body.Escalated_to_Department,
      Email_Notify: req.body.Email_Notify,
      SMS_Notifiy: req.body.Email_SMS,
      end_time: EndTime,
      start_time: startTime,
      Monday: req.body.Monday,
      Thuesday: req.body.Thuesday,
      Wednesday: req.body.Wednesday,
      Thudesday: req.body.Thudesday,
      Friday: req.body.Friday,
      Saturday: req.body.Saturday,
      Sunday: req.body.Sunday,
      Task_Date: req.body.Date,
      Approve_By: req.body.ApproveBy,
    });
    NewTask.save(function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log("Task Successfully Created");
      }
    });
    const TaskAuths = new TaskAuth({
      ID: uuidv4(),
      Task_ID: NewTask.ID,
      Type: req.body.Type,
      MinValue: req.body.MinValue,
      MaxValue: req.body.MaxValue,
      ExptectedValue: req.body.ExptectedValue,
      Questions: req.body.Questions,
      User: Assign_to_User,
      Department: Assign_to_Department,
      Date: Date,
      EsUser: Escalated_to_User,
      EsDepartment: Escalated_to_Department,
      Approve_By: req.body.ApproveBy,
    });
    TaskAuths.save(function (err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log("Task Auth Successfully Created");
      }
    });
    for (let index = 0; index < req.body.MoreReq.length; index++) {
      Object.assign(req.body.MoreReq[index][0], {
        Task_ID: TaskAuths.ID,
      });
    }
    for (let index1 = 0; index1 < req.body.MoreReq.length; index1++) {
      TaskAuth.create(req.body.MoreReq[index1][0]);
    }
    res.send("Task Successfully Created");
  }
});

Router.post("/Priamry/createTask", (req, res) => {
  const PrimaryTaskAuths = new PrimaryTaskAuth({
    ID: uuidv4(),
    Task_ID: req.body.Task_ID,
    Type: req.body.Type,
    MinValue: req.body.MinValue,
    MaxValue: req.body.MaxValue,
    ExptectedValue: req.body.ExptectedValue,
    Questions: req.body.Questions,
    User: req.body.Assign_to_User,
    Date: req.body.Date,
    Department: req.body.Assign_to_Department,
    EsUser: req.body.Escalated_to_User,
    EsDepartment: req.body.Escalated_to_Department,
  });
  PrimaryTaskAuths.save(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log("Task Auth Successfully Created");
      res.send(result);
    }
  });
});
Router.post("/TaskAuth/createTask", (req, res) => {
  const TaskAuths = new TaskAuth({
    ID: uuidv4(),
    Task_ID: req.body.Task_ID,
    Type: req.body.Type,
    MinValue: req.body.MinValue,
    MaxValue: req.body.MaxValue,
    ExptectedValue: req.body.ExptectedValue,
    Questions: req.body.Questions,
    User: req.body.Assign_to_User,
    Date: req.body.Date,
    Department: req.body.Assign_to_Department,
    EsUser: req.body.Escalated_to_User,
    EsDepartment: req.body.Escalated_to_Department,
    ApproveBy: req.body.ApproveBy,
  });
  TaskAuths.save(function (err, result) {
    if (err) {
      console.log(err);
    } else {
      console.log("Task Auth Successfully Created");
      res.send(result);
    }
  });
});

module.exports = Router;
