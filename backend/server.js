// Required modules
const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const mysql = require("mysql2");
require("dotenv").config();

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// MySQL connection setup
const db = mysql.createConnection({
  host: "localhost",
  user: "root", // Replace with your MySQL username
  password: "rithwikpro475", // Replace with your MySQL password
  database: "quiz_app",      // Replace with your database name
});

// Establish MySQL connection
db.connect((err) => {
  if (err) {
    console.error("Database connection error:", err);
    process.exit(1);
  }
  console.log("✅ Connected to MySQL database");
});

// Import routes
const authRoutes = require("./routes/authRoutes");
const questionsRoutes = require("./routes/questions");
app.use("/api/auth", authRoutes);
app.use("/api/questions", questionsRoutes);

// ✅ Get all quizzes
app.get("/api/quizzes", (req, res) => {
  const query = "SELECT quiz_id AS _id, title, description FROM quizzes";
  db.query(query, (err, results) => {
    if (err) {
      console.error("Error fetching quizzes:", err);
      return res.status(500).json({ error: "Failed to fetch quizzes" });
    }
    res.json(results);
  });
});

// ✅ Submit result (with duplicate prevention)
app.post("/api/submit-result", (req, res) => {
  console.log("Received /api/submit-result request body:", req.body);
  const { username, quiz_id, score, total_questions } = req.body;

  // Check for existing record with same username and quiz_id
  const checkSql = "SELECT * FROM results WHERE username = ? AND quiz_id = ?";
  db.query(checkSql, [username, quiz_id], (checkErr, checkResults) => {
    if (checkErr) {
      console.error("Error checking existing result:", checkErr);
      return res.status(500).json({ success: false, message: "Database error", error: checkErr.message });
    }
    console.log(`Checking duplicates for username: ${username}, quiz_id: ${quiz_id}`);
    console.log("Duplicate check results:", checkResults);
    if (checkResults.length > 0) {
      // Duplicate found, do not insert
      return res.status(409).json({ success: false, message: "Result already submitted for this quiz" });
    }
    // No duplicate, insert new record or update if duplicate exists
    const sql = `
      INSERT INTO results (username, quiz_id, score, total_questions)
      VALUES (?, ?, ?, ?)
      ON DUPLICATE KEY UPDATE
        score = VALUES(score),
        total_questions = VALUES(total_questions),
        created_at = CURRENT_TIMESTAMP
    `;
    db.query(sql, [username, quiz_id, score, total_questions], (err, result) => {
      if (err) {
        console.error("Error inserting/updating result:", err);
        return res.status(500).json({ success: false, message: "Database error", error: err.message });
      }
      console.log("Insert/update result success:", result);
      res.status(200).json({ success: true, message: "Result stored successfully" });
    });
  });
});


// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
