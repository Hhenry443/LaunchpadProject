const express = require("express");
const bodyParser = require("body-parser");
const mysql = require("mysql2/promise");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.set("view engine", "ejs");
app.use("/mapbox-gl", express.static("./node_modules/mapbox-gl/dist"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  const markers = [
    { name: "Bobs Food Bank", lng: 52.481866, lat: -1.922431 },
    { name: "All Hope Food Bank", lng: 52.481657, lat: -1.920542 },
    { name: "No Mouths Unfed", lng: 52.480592, lat: -1.921476 },
  ];

  const tagline =
    "No programming concept is complete without a cute animal mascot.";

  res.render("pages/index", {
    mascots: mascots,
    tagline: tagline,
  });
});

app.get("/hello", (req, res) => {
  res.send("This is the request to Hello!");
});

// about page
app.get("/about", (req, res) => {
  res.render("pages/about");
});

app.get("/map", (req, res) => {
  res.render("pages/map", { mapboxToken: process.env.MAPBOX_TOKEN });
});

app.get("/hello/:name", (req, res) => {
  const routeParameter = req.params;
  const name = routeParameter.name;
  // or const name = req.params.name
  res.send(`Hello ${name}, welcome to my NodeJS application!`);
});

// Home page
app.get("/", (req, res) => {
  const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    database: "test",
  });

  // execute will internally call prepare and query
  connection.execute(
    "SELECT * FROM `tbl_foodbanks`",
    function (err, results, fields) {
      console.log(results); // results contains rows returned by server
      console.log(fields); // fields contains extra meta data about results, if available

      // Close the connection
      connection.end();
    },
  );

  res.render("pages/home");
});

// Map Page
app.get("/map", (req, res) => {
  // Get the food banks for the markers
  const markers = [
    { name: "Bobs Food Bank", lng: 52.481866, lat: -1.922431 },
    { name: "All Hope Food Bank", lng: 52.481657, lat: -1.920542 },
    { name: "No Mouths Unfed", lng: 52.480592, lat: -1.921476 },
  ];

  res.render("pages/map", {
    markers: markers,
  });
});

// Allotment notice board
app.get("/allotment/notices", (req, res) => {
  res.render("pages/notices");
});

// Allotment offering form
app.get("/allotment/offer", (req, res) => {
  res.render("pages/offering");
});

app.get("/form", (req, res) => {
  res.sendFile(__dirname + "/public/form.html", (err) => {
    if (err) console.log(err);
  });
});

app.post("/form", (req, res) => {
  const fname = req.body.fname;
  const lname = req.body.lname;

  res.send("Hello, " + fname + " " + lname);
});

app.listen(port, () => {
  console.log(`myapp is listening on port ${port}!`);
});
