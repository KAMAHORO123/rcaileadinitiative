import fs from 'fs';
import path from 'path';
import mysql from 'mysql2/promise';

async function initializeDatabase() {
  try {
    // Create connection without database
    const connection = await mysql.createConnection({
      host: process.env.DB_HOST || 'localhost',
      user: process.env.DB_USER || 'root',
      password: process.env.DB_PASSWORD || '',
    });

    // Create database if not exists
    await connection.query('CREATE DATABASE IF NOT EXISTS rca_ilead');
    await connection.query('USE rca_ilead');

    // Create donations table
    await connection.query(`
      CREATE TABLE IF NOT EXISTS donations (
        id INT PRIMARY KEY AUTO_INCREMENT,
        donor_name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL,
        amount DECIMAL(10,2) NOT NULL,
        payment_method VARCHAR(50) NOT NULL,
        status ENUM('pending', 'completed', 'failed') NOT NULL DEFAULT 'pending',
        transaction_id VARCHAR(255),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create users table for admin access
    await connection.query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(255) NOT NULL,
        email VARCHAR(255) NOT NULL UNIQUE,
        password VARCHAR(255) NOT NULL,
        role ENUM('admin', 'member') NOT NULL DEFAULT 'member',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )
    `);

    // Create admin user if not exists
    const [adminExists] = await connection.query(
      'SELECT * FROM users WHERE email = ?',
      ['admin@rcailead.org']
    );

    if (!adminExists.length) {
      // In a real application, you would hash the password
      await connection.query(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        ['Admin', 'admin@rcailead.org', 'admin123', 'admin']
      );
    }

    console.log('Database initialized successfully');
    await connection.end();
  } catch (error) {
    console.error('Error initializing database:', error);
    throw error;
  }
}

// Run the initialization
initializeDatabase()
  .then(() => {
    console.log('Database setup complete');
    process.exit(0);
  })
  .catch((error) => {
    console.error('Database setup failed:', error);
    process.exit(1);
  }); 