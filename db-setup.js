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
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      name VARCHAR(100) NOT NULL,
      email VARCHAR(100) UNIQUE NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `);

  console.log("Database ready!");
  await connection.end();
}

setup().catch(console.error);
