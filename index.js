const express = require("express");
const bodyParser = require("body-parser");
require("dotenv").config();

const app = express();
const port = process.env.PORT;

app.set("view engine", "ejs");
app.use("/mapbox-gl", express.static("./node_modules/mapbox-gl/dist"));
app.use(bodyParser.urlencoded({ extended: false }));

app.get("/", (req, res) => {
  const mascots = [
    { name: "Sammy", organization: "DigitalOcean", birth_year: 2012 },
    { name: "Tux", organization: "Linux", birth_year: 1996 },
    { name: "Moby Dock", organization: "Docker", birth_year: 2013 },
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
