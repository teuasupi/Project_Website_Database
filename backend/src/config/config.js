const mariadb = require('mariadb');

const pool = mariadb.createPool({
    host: process.env.HOSTDB,
    user: process.env.USERDB,
    password: process.env.PASSWORDDB,
    database: 'TEUAS',
    connectionLimit: 5
  });
  
module.exports = pool;