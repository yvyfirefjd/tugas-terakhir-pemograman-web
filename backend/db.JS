// db.js — koneksi PostgreSQL menggunakan Pool
const { Pool } = require("pg");
require("dotenv").config();

const pool = new Pool({
  host:     process.env.DB_HOST     || "localhost",
  port:     process.env.DB_PORT     || 5432,
  database: process.env.DB_NAME     || "nihongo_db",
  user:     process.env.DB_USER     || "postgres",
  password: process.env.DB_PASSWORD || "password",
});

// Test koneksi saat startup
pool.connect((err, client, release) => {
  if (err) {
    console.error("❌ Gagal koneksi ke PostgreSQL:", err.message);
  } else {
    console.log("✅ Terhubung ke PostgreSQL");
    release();
  }
});

module.exports = pool;