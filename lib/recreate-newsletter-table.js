const mysql = require("mysql2/promise");

async function recreateNewsletterTable() {
  let connection;
  try {
    // Create connection
    connection = await mysql.createConnection({
      host: "yamabiko.proxy.rlwy.net",
      port: 33209,
      user: "root",
      password: "pwdndRWDeTNdZCxLEmHhZfNhuQDmmlZz",
      database: "railway",
      ssl: {
        rejectUnauthorized: false,
      },
    });

    console.log("Connected to Railway database successfully!");

    // Drop the existing table
    try {
      await connection.query("DROP TABLE IF EXISTS newsletter_subscribers");
      console.log("Dropped existing newsletter_subscribers table");
    } catch (error) {
      console.error("Error dropping table:", error);
      throw error;
    }

    // Create the table with correct email length and index
    const createTableQuery = `
      CREATE TABLE newsletter_subscribers (
        id INT PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(255) NOT NULL,
        status ENUM('active', 'unsubscribed') NOT NULL DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        INDEX idx_email (email(191))
      )
    `;

    try {
      await connection.query(createTableQuery);
      console.log("Created new newsletter_subscribers table successfully");
    } catch (error) {
      console.error("Error creating table:", error);
      throw error;
    }

    console.log("Newsletter table recreation completed successfully!");
  } catch (error) {
    console.error("Error recreating newsletter table:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the recreation
recreateNewsletterTable()
  .then(() => {
    console.log("Newsletter table recreation complete");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Newsletter table recreation failed:", error);
    process.exit(1);
  });
