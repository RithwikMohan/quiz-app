const express = require("express");
const router = express.Router();
const db = require("../config/db");
; // adjust if your DB connection is elsewhere

// Route: GET /api/questions/:quizId
router.get("/:quizId", (req, res) => {
  const { quizId } = req.params;

  const query = "SELECT * FROM questions WHERE quiz_id = ?";
  db.query(query, [quizId], (err, questions) => {
    if (err) {
      console.error("Error fetching questions:", err);
      return res.status(500).json({ message: "Server error" });
    }
    if (questions.length === 0) {
      return res.status(404).json({ message: "No questions found." });
    }
    res.json(questions);
  });
});

module.exports = router;
