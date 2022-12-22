//jshint esversion: 6
require("dotenv").config();

const express = require("express");

const bodyParser = require("body-parser");

const app = express();
app.use(bodyParser.urlencoded({
  extended: true
}));

const https = require("https");

app.use(express.static("public"));

app.set("view engine", "ejs");

const appId = process.env.APP_ID;


app.get("/", function(req, res) {
  res.sendFile(__dirname + "/views/index.html");
});

app.post("/", function(req, res) {
  city = req.body.city;

  function capitalise(city) {
    return city.charAt(0).toUpperCase() + city.slice(1);
  }
  city = city.split(" ").map(capitalise).join(" ");
  https.get("https://api.openweathermap.org/data/2.5/weather?q=" + city + "&appid=" + appId + "&units=metric", function(response) {
    response.on("data", function(data) {
      weatherData = JSON.parse(data);
      if (weatherData.cod === "404") {
        res.redirect("error");
      } else {
        temperature = weatherData.main.temp;
        description = weatherData.weather[0].description;
        description = description.split(" ").map(capitalise).join(" ");
        id = weatherData.weather[0].icon;
        imgWeb = "https://openweathermap.org/img/wn/" + id + "@2x.png";
        res.redirect("/result");
      }
    });
  });
});

app.get("/result", function(req, res) {
  res.render("result", {
    city: city,
    temperature: temperature,
    description: description,
    imgWeb: imgWeb,
  });
});

app.get("/error", function(req, res) {
  res.send("Error. City not found. Please check your spelling of the city.");
});


app.listen(process.env.PORT || 3000, function() {
  console.log("hello there.");
});
