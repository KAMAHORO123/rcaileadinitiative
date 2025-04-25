import mysql from 'mysql2/promise';
import pool from './db';

export async function truncateNewsletterSubscribers() {
  try {
    // Get a connection from the pool
    const connection = await pool.getConnection();
    
    try {
      // Truncate the table
      await connection.query('TRUNCATE TABLE newsletter_subscribers');
      console.log('Newsletter subscribers table truncated successfully');
      return true;
    } catch (error) {
      console.error('Error truncating newsletter subscribers table:', error);
      return false;
    } finally {
      // Release the connection back to the pool
      connection.release();
    }
  } catch (error) {
    console.error('Error getting database connection:', error);
    return false;
  }
}

export async function getNewsletterSubscribers() {
  try {
    const [rows] = await pool.query('SELECT * FROM newsletter_subscribers');
    return rows;
  } catch (error) {
    console.error('Error fetching newsletter subscribers:', error);
    return [];
  }
}

export async function addNewsletterSubscriber(email: string) {
  try {
    await pool.query(
      'INSERT INTO newsletter_subscribers (email) VALUES (?)',
      [email]
    );
    return true;
  } catch (error) {
    console.error('Error adding newsletter subscriber:', error);
    return false;
  }
}

export async function removeNewsletterSubscriber(email: string) {
  try {
    await pool.query(
      'DELETE FROM newsletter_subscribers WHERE email = ?',
      [email]
    );
    return true;
  } catch (error) {
    console.error('Error removing newsletter subscriber:', error);
    return false;
  }
} 