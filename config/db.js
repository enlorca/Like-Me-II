const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  user: process.env.DB_USER,
  host: process.env.DB_HOST,
  database: process.env.DB_DATABASE,
  password: process.env.DB_PASSWORD,
  port: process.env.DB_PORT,
  allowExitOnIdle: true,
});

pool.on("connect", () => {
  console.log("PostgreSQL pool conectado");
});

pool.on("error", (err) => {
  console.error("Error inesperado en cliente de PostgreSQL", err);
  throw err;
});

const getData = async () => {
  const res = await pool.query("Select NOW()");
  console.log(res.rows);
  return res.rows;
};

module.exports = { pool, getData };
