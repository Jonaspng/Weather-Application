//jshint esversion: 6
var today = new Date();

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

today = today.toLocaleDateString("en-us", options);
document.querySelector("#client-date").innerHTML = today;
