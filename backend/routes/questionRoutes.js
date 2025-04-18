import express from 'express';
import sequelize from 'sequelize';
import Question from '../models/Question.js';

const router = express.Router();

// GET questions by difficulty - return 5 questions
router.get('/', async (req, res) => {
  const { difficulty } = req.query;
  try {
    const questions = await Question.findAll({
      where: { difficulty },
      order: sequelize.random(),
      limit: 5,
    });
    // Map to frontend expected format
    const formattedQuestions = questions.map(q => ({
      _id: q.id,
      question: q.question,
      options: q.options,
      difficulty: q.difficulty,
      correctAnswer: q.correctAnswer,
    }));
    res.json(formattedQuestions);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// POST new question (for admin)
router.post('/', async (req, res) => {
  try {
    const question = await Question.create(req.body);
    res.status(201).json(question);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export default router;
