require('dotenv').config();

const mariadb = require('mariadb');

const pool = mariadb.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  port: 3306,
  database: 'TEUAS',
  connectionLimit: 5,
  acquireTimeout: 10000,
});
  
module.exports = pool;

async function testConnection() {
  let conn;
  try {
    conn = await pool.getConnection();
    console.log("✅ Connected to MariaDB!");
  } catch (err) {
    console.error("❌ Connection failed:", err);
  } finally {
    if (conn) conn.end();
  }
}

testConnection();