import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql2/promise";
import dotenv from "dotenv";
dotenv.config();

const app = express();
const port = process.env.PORT;

// Create the connection to database
const connection = await mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PSSWRD,
  database: process.env.DB_NAME,
});

app.set("view engine", "ejs");
app.use("/mapbox-gl", express.static("./node_modules/mapbox-gl/dist"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(express.static("public"));

// Home page
app.get("/", (req, res) => {
  res.render("pages/home");
});

// Map Page
app.get("/map", async (req, res) => {
  try {
    const [foodbankMarkers, foodbankFields] = await connection.query(
      "SELECT * FROM `foodbanks`",
    );

    const [allotmentMarkers, allotmentFields] = await connection.query(
      "SELECT * FROM `allotments`",
    );

    res.render("pages/map", {
      mapboxToken: process.env.MAPBOX_TOKEN,
      foodbankMarkers: foodbankMarkers,
      allotmentMarkers: allotmentMarkers,
    });

    console.log(foodbankMarkers); // results contains rows returned by server
  } catch (err) {
    console.error("DB error:", err); // more visible than console.log
  }
});

// Allotment Offerings
app.get("/allotment-offer", (req, res) => {
  res.render("pages/offer");
});

// Allotment Board
app.get("/allotment-board", (req, res) => {
  res.render("pages/board");
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
