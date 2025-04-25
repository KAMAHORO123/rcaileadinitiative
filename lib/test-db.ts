import mysql from 'mysql2/promise';

export async function testDatabaseConnection() {
  try {
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
      database: process.env.DB_NAME || 'rca_ilead',
    });

    // Test the connection
    await connection.connect();
    console.log('Database connection successful');

    // Test the newsletter_subscribers table
    const [rows] = await connection.query('SHOW TABLES LIKE "newsletter_subscribers"');
    if (Array.isArray(rows) && rows.length === 0) {
      console.log('Creating newsletter_subscribers table...');
      await connection.query(`
        CREATE TABLE IF NOT EXISTS newsletter_subscribers (
          id INT PRIMARY KEY AUTO_INCREMENT,
          email VARCHAR(255) NOT NULL UNIQUE,
          status ENUM('active', 'unsubscribed') NOT NULL DEFAULT 'active',
          created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
          updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
        )
      `);
      console.log('newsletter_subscribers table created');
    }

    await connection.end();
    return true;
  } catch (error) {
    console.error('Database connection error:', error);
    return false;
  }
} 