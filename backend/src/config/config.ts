import * as dotenv from 'dotenv';
dotenv.config();

import * as mariadb from 'mariadb';

const pool: mariadb.Pool = mariadb.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  port: 3306,
  database: 'TEUAS',
  connectionLimit: 5,
  acquireTimeout: 10000,
});

export default pool;

async function testConnection(): Promise<void> {
  let conn: mariadb.PoolConnection | undefined;
  try {
    conn = await pool.getConnection();
    console.log('✅ Connected to MariaDB!');
  } catch (err) {
    console.error('❌ Connection failed:', err);
  } finally {
    if (conn) conn.end();
  }
}

testConnection();
