import moment from "moment";

export function MomentDate() {
  let date = new Date();
  let Dates = moment(date).format("YYYY-MM-DD");
  return Dates;
}

export function getCurrentDate() {
  let date = new Date();
  let day = date.getDay();
  let month = date.getMonth();
  let year = date.getFullYear();
  let houre = date.getHours();
  let mins = date.getMinutes();
  let seconds = date.getSeconds();
  return `${year}-${month}-${day}, ${houre}:${mins}:${seconds}`;
}

export function getCurrentDateDashbaord() {
  let date = new Date();
  let day = date.getDay();
  let month = date.getMonth();
  let year = date.getFullYear();
  return `${year}-${month}-${day}`;
}

export function getCurrentTimeDashboard() {
  var CurrentDate = moment().format("HH:mm A");
  return CurrentDate;
}

export function getCurrentTimeDashboard__() {
  var CurrentDate = moment().format("HH:mm");
  return CurrentDate;
}

export function removeDuplicates(arr) {
  return arr.filter((item,
      index) => arr.indexOf(item) === index);
}