//jshint esversion: 6
var today = new Date();

const options = {
  weekday: "long",
  year: "numeric",
  month: "long",
  day: "numeric",
};

var time=today.toLocaleTimeString("en-us",{hour: '2-digit', minute: '2-digit',hour12:"true"});
today = today.toLocaleDateString("en-us", options);
document.querySelector("#client-date").innerHTML = today+", "+time;
