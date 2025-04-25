import pool from './db';

async function testConnection() {
  try {
    const connection = await pool.getConnection();
    console.log('Successfully connected to the database!');
    
    // Test query
    const [rows] = await connection.query('SELECT 1 as test');
    console.log('Test query result:', rows);
    
    connection.release();
  } catch (error) {
    console.error('Error connecting to the database:', error);
  } finally {
    // Close the pool
    await pool.end();
  }
}

testConnection(); 