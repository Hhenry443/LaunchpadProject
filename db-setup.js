// setup.js
const mysql = require("mysql2/promise");

async function setup() {
  // Connect WITHOUT a database first
  const connection = await mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "root",
  });

  // Create the database if it doesn't exist
  await connection.query("CREATE DATABASE IF NOT EXISTS synoptic");
  await connection.query("USE synoptic");

  // Create all the tables
  await connection.query(`
    CREATE TABLE IF NOT EXISTS foodbanks (
      fb_id INT AUTO_INCREMENT PRIMARY KEY,
      fb_name VARCHAR(200) NOT NULL,
      fb_description VARCHAR(250) NOT NULL,
      fb_lat FLOAT NOT NULL,
      fb_lng FLOAT NOT NULL
    )
  `);

  await connection.query(`
    CREATE TABLE IF NOT EXISTS allotments (
      a_id INT AUTO_INCREMENT PRIMARY KEY,
      a_name VARCHAR(200) NOT NULL,
      a_description VARCHAR(250) NOT NULL,
      a_lat FLOAT NOT NULL,
      a_lng FLOAT NOT NULL
    )
  `);

  await connection.query(`
  CREATE TABLE IF NOT EXISTS allotment_items (
    ai_id INT AUTO_INCREMENT PRIMARY KEY,
    ai_a_id INT NOT NULL,
    ai_item VARCHAR(200) NOT NULL,
    ai_quantity INT NOT NULL,
    FOREIGN KEY (ai_a_id) REFERENCES allotments(a_id) ON DELETE CASCADE ON UPDATE CASCADE
  )
`);

  console.log("Database ready!");
  await connection.end();
}

setup().catch(console.error);
