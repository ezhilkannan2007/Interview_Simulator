const mysql = require('mysql2/promise');
require('dotenv').config();

const {
  DB_HOST = '127.0.0.1',
  DB_PORT = '3306',
  DB_USER = 'root',
  DB_PASSWORD = 'haripratha@2013',
  DB_NAME = 'ai_interview_simulator',
  DB_CONNECTION_LIMIT = '10',
} = process.env;

const pool = mysql.createPool({
  host: DB_HOST,
  port: Number(DB_PORT),
  user: DB_USER,
  password: DB_PASSWORD,
  database: DB_NAME,
  waitForConnections: true,
  connectionLimit: Number(DB_CONNECTION_LIMIT),
  queueLimit: 0,
});

const verifyConnection = async () => {
  try {
    const connection = await pool.getConnection();
    connection.release();
    console.log('MySQL connection pool established');
  } catch (error) {
    console.error('Unable to establish MySQL connection', error);
    throw error;
  }
};

verifyConnection().catch((error) => {
  console.error('MySQL initialization failed, shutting down to avoid inconsistent state', error);
  process.exit(1);
});

pool.on('error', (error) => {
  console.error('MySQL pool encountered an error', error);
});

module.exports = pool;
