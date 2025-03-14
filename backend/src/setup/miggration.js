require('dotenv').config();
const mariadb = require('mariadb');

// const pool = require("../config/config");

async function migrate() {

  
const pool = mariadb.createPool({
  host: '127.0.0.1',
  user: 'root',
  password: 'root',
  port: 3306,
  database: 'TEUAS',
  connectionLimit: 5,
  acquireTimeout: 10000,
});

  let conn;
  try {
    conn = await pool.getConnection();
    console.log("Connected to MariaDB!");

    await pool.query('DROP TABLE IF EXISTS `Users`');
    await pool.query('DROP TABLE IF EXISTS `Articles`');
    await pool.query('DROP TABLE IF EXISTS `ArticleComments`');
    await pool.query('DROP TABLE IF EXISTS `Forums`');
    await pool.query('DROP TABLE IF EXISTS `ForumTopics`');
    await pool.query('DROP TABLE IF EXISTS `ForumReplies`');
    await pool.query('DROP TABLE IF EXISTS `JobPostings`');
    await pool.query('DROP TABLE IF EXISTS `Applications`');
    await pool.query('DROP TABLE IF EXISTS `Events`');
    await pool.query('DROP TABLE IF EXISTS `EventRegistrations`');

    // Users Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS Users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        email VARCHAR(255),
        password VARCHAR(255),
        fullName VARCHAR(255) NOT NULL,
        graduationYear INT,
        nim VARCHAR(50),
        major VARCHAR(100),
        phoneNumber VARCHAR(20),
        address TEXT,
        profilePhoto TEXT,
        role VARCHAR(50),
        currentCompany VARCHAR(100),
        position VARCHAR(100),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    // Articles Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS Articles (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        content TEXT,
        featuredImage TEXT,
        authorId INT,
        category VARCHAR(100),
        status VARCHAR(50),
        viewCount INT DEFAULT 0,
        FOREIGN KEY (authorId) REFERENCES Users(id),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    // ArticleComments Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS ArticleComments (
        id INT AUTO_INCREMENT PRIMARY KEY,
        articleId INT,
        userId INT,
        comment TEXT,
        FOREIGN KEY (articleId) REFERENCES Articles(id),
        FOREIGN KEY (userId) REFERENCES Users(id),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    // Forums Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS Forums (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        description TEXT,
        createdBy INT,
        isActive BOOLEAN,
        FOREIGN KEY (createdBy) REFERENCES Users(id),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    // ForumTopics Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS ForumTopics (
        id INT AUTO_INCREMENT PRIMARY KEY,
        forumId INT,
        title VARCHAR(255),
        content TEXT,
        createdBy INT,
        isPinned BOOLEAN,
        isClosed BOOLEAN,
        viewCount INT DEFAULT 0,
        FOREIGN KEY (forumId) REFERENCES Forums(id),
        FOREIGN KEY (createdBy) REFERENCES Users(id),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    // ForumReplies Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS ForumReplies (
        id INT AUTO_INCREMENT PRIMARY KEY,
        topicId INT,
        userId INT,
        content TEXT,
        isSolution BOOLEAN,
        FOREIGN KEY (topicId) REFERENCES ForumTopics(id),
        FOREIGN KEY (userId) REFERENCES Users(id),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    // JobPostings Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS JobPostings (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        companyName VARCHAR(255),
        location VARCHAR(255),
        jobType VARCHAR(100),
        description TEXT,
        requirements TEXT,
        salaryRange VARCHAR(100),
        contactEmail VARCHAR(255),
        contactPhone VARCHAR(20),
        applicationURL TEXT,
        postedBy INT,
        isActive BOOLEAN,
        deadline DATE,
        FOREIGN KEY (postedBy) REFERENCES Users(id),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    // Applications Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS Applications (
        id INT AUTO_INCREMENT PRIMARY KEY,
        jobPostingId INT,
        userId INT,
        resumeFile TEXT,
        coverLetter TEXT,
        FOREIGN KEY (jobPostingId) REFERENCES JobPostings(id),
        FOREIGN KEY (userId) REFERENCES Users(id),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    // Events Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS Events (
        id INT AUTO_INCREMENT PRIMARY KEY,
        title VARCHAR(255),
        description TEXT,
        eventDate DATE,
        location VARCHAR(255),
        isOnline BOOLEAN,
        onlineLink TEXT,
        featuredImage TEXT,
        organizerId INT,
        registrationRequest BOOLEAN,
        maxParticipants INT,
        FOREIGN KEY (organizerId) REFERENCES Users(id),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    // EventRegistrations Table
    await conn.query(`
      CREATE TABLE IF NOT EXISTS EventRegistrations (
        id INT AUTO_INCREMENT PRIMARY KEY,
        eventId INT,
        userId INT,
        attendanceStatus VARCHAR(100),
        notes TEXT,
        FOREIGN KEY (eventId) REFERENCES Events(id),
        FOREIGN KEY (userId) REFERENCES Users(id),
        createdAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updatedAt TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
      );
    `);

    console.log('Migration completed successfully.');
  } catch (err) {
    console.error('Migration failed:', err);
  } finally {
    if (conn) conn.end();
  }
}

migrate();