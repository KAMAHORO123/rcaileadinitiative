const mysql = require("mysql2/promise");

async function initializeDatabase() {
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

    // Create tables
    const tables = [
      // Users table
      `CREATE TABLE IF NOT EXISTS users (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(500) NOT NULL,
        email VARCHAR(1000) NOT NULL UNIQUE,
        password VARCHAR(500) NOT NULL,
        role ENUM('admin', 'member', 'volunteer') NOT NULL DEFAULT 'member',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`,

      // Events table
      `CREATE TABLE IF NOT EXISTS events (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(500) NOT NULL,
        description LONGTEXT,
        date DATE NOT NULL,
        time TIME NOT NULL,
        location VARCHAR(500) NOT NULL,
        image_url VARCHAR(1000),
        created_by INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES users(id)
      )`,

      // Donations table
      `CREATE TABLE IF NOT EXISTS donations (
        id INT PRIMARY KEY AUTO_INCREMENT,
        donor_name VARCHAR(500) NOT NULL,
        email VARCHAR(1000) NOT NULL,
        amount DECIMAL(20,2) NOT NULL,
        payment_method VARCHAR(100) NOT NULL,
        status ENUM('pending', 'completed', 'failed') NOT NULL DEFAULT 'pending',
        transaction_id VARCHAR(500),
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`,

      // Contact messages table
      `CREATE TABLE IF NOT EXISTS contact_messages (
        id INT PRIMARY KEY AUTO_INCREMENT,
        name VARCHAR(500) NOT NULL,
        email VARCHAR(1000) NOT NULL,
        subject VARCHAR(500) NOT NULL,
        message LONGTEXT NOT NULL,
        status ENUM('new', 'read', 'replied') NOT NULL DEFAULT 'new',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`,

      // Gallery table
      `CREATE TABLE IF NOT EXISTS gallery (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(500) NOT NULL,
        description LONGTEXT,
        image_url VARCHAR(1000) NOT NULL,
        category VARCHAR(100),
        uploaded_by INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (uploaded_by) REFERENCES users(id)
      )`,

      // Volunteers table
      `CREATE TABLE IF NOT EXISTS volunteers (
        id INT PRIMARY KEY AUTO_INCREMENT,
        user_id INT,
        skills LONGTEXT,
        availability LONGTEXT,
        status ENUM('pending', 'approved', 'rejected') NOT NULL DEFAULT 'pending',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id)
      )`,

      // Programs table
      `CREATE TABLE IF NOT EXISTS programs (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(500) NOT NULL,
        description LONGTEXT,
        image_url VARCHAR(1000),
        status ENUM('active', 'inactive') NOT NULL DEFAULT 'active',
        created_by INT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (created_by) REFERENCES users(id)
      )`,

      // Program participants table
      `CREATE TABLE IF NOT EXISTS program_participants (
        id INT PRIMARY KEY AUTO_INCREMENT,
        program_id INT,
        user_id INT,
        status ENUM('enrolled', 'completed', 'dropped') NOT NULL DEFAULT 'enrolled',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (program_id) REFERENCES programs(id),
        FOREIGN KEY (user_id) REFERENCES users(id)
      )`,

      // News/Updates table
      `CREATE TABLE IF NOT EXISTS news (
        id INT PRIMARY KEY AUTO_INCREMENT,
        title VARCHAR(500) NOT NULL,
        content LONGTEXT NOT NULL,
        image_url VARCHAR(1000),
        author_id INT,
        status ENUM('draft', 'published') NOT NULL DEFAULT 'draft',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
        FOREIGN KEY (author_id) REFERENCES users(id)
      )`,

      // Newsletter subscribers table
      `CREATE TABLE IF NOT EXISTS newsletter_subscribers (
        id INT PRIMARY KEY AUTO_INCREMENT,
        email VARCHAR(1000) NOT NULL UNIQUE,
        status ENUM('active', 'unsubscribed') NOT NULL DEFAULT 'active',
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      )`,
    ];

    // Execute each table creation query
    for (const table of tables) {
      try {
        await connection.query(table);
        console.log("Table created successfully");
      } catch (error) {
        console.error("Error creating table:", error);
        throw error;
      }
    }

    // Create default admin user if not exists
    try {
      const [adminExists] = await connection.query(
        "SELECT * FROM users WHERE email = ?",
        ["admin@ileadinitiative.org"]
      );

      if (!Array.isArray(adminExists) || adminExists.length === 0) {
        await connection.query(
          "INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)",
          ["Admin User", "admin@ileadinitiative.org", "admin123", "admin"]
        );
        console.log("Default admin user created");
      }
    } catch (error) {
      console.error("Error creating admin user:", error);
      throw error;
    }

    console.log("Database initialization completed successfully!");
  } catch (error) {
    console.error("Error initializing database:", error);
    throw error;
  } finally {
    if (connection) {
      await connection.end();
    }
  }
}

// Run the initialization
initializeDatabase()
  .then(() => {
    console.log("Database setup complete");
    process.exit(0);
  })
  .catch((error) => {
    console.error("Database setup failed:", error);
    process.exit(1);
  });
