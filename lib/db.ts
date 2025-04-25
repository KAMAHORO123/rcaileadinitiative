import mysql from 'mysql2/promise';

// Parse the connection URL
const connectionString = "mysql://root:pwdndRWDeTNdZCxLEmHhZfNhuQDmmlZz@yamabiko.proxy.rlwy.net:33209/railway";
const url = new URL(connectionString);

// Create a connection pool
const pool = mysql.createPool({
  host: url.hostname,
  port: parseInt(url.port),
  user: url.username,
  password: url.password,
  database: url.pathname.substring(1), // Remove the leading slash
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0,
  ssl: {
    rejectUnauthorized: false // Required for Railway's SSL connection
  }
});

export default pool; 