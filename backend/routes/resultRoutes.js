import express from 'express';
import { User, Answer, Result, Question } from '../models/index.js';

const router = express.Router();

router.post('/', async (req, res) => {
  const { name, difficulty, answers } = req.body;

  if (!name || !difficulty || !answers || !Array.isArray(answers)) {
    return res.status(400).json({
      success: false,
      message: 'Missing or invalid required fields: name, difficulty, or answers',
    });
  }

  try {
    // Find or create user
    let [user, created] = await User.findOrCreate({
      where: { name, difficulty },
      defaults: { name, difficulty },
    });

    // Calculate score
    let score = 0;
    for (const answer of answers) {
      const question = await Question.findByPk(answer.questionId);
      if (question && question.correctAnswer === answer.chosenAnswer) {
        score++;
      }
    }

    // Determine appreciation message
    let appreciation = '';
    const percentage = (score / answers.length) * 100;
    if (percentage >= 80) {
      appreciation = 'Excellent work!';
    } else if (percentage >= 60) {
      appreciation = 'Good job!';
    } else {
      appreciation = 'Keep practicing!';
    }

    // Save answers
    const answerRecords = answers.map(a => ({
      userId: user.id,
      questionId: a.questionId,
      chosenAnswer: a.chosenAnswer,
    }));
    await Answer.bulkCreate(answerRecords);

    // Save result
    const result = await Result.create({
      userId: user.id,
      difficulty,
      score,
      appreciation,
    });

    res.status(201).json({ success: true, data: result });
  } catch (error) {
    console.error('Error saving result:', error);
    res.status(500).json({ success: false, message: 'Server error' });
  }
});

// GET all results (top 20)
router.get('/', async (req, res) => {
  try {
    const results = await Result.findAll({
      order: [['score', 'DESC'], ['createdAt', 'DESC']],
      limit: 20,
      include: [{ model: User, attributes: ['name', 'difficulty'] }],
    });
    res.status(200).json({ success: true, count: results.length, data: results });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching results', error: error.message });
  }
});

// GET results by difficulty
router.get('/:difficulty', async (req, res) => {
  try {
    const results = await Result.findAll({
      where: { difficulty: req.params.difficulty },
      order: [['score', 'DESC'], ['createdAt', 'DESC']],
      limit: 10,
      include: [{ model: User, attributes: ['name'] }],
    });

    if (!results.length) {
      return res.status(404).json({ success: false, message: 'No results found for this difficulty' });
    }

    res.status(200).json({ success: true, data: results });
  } catch (error) {
    res.status(500).json({ success: false, message: 'Error fetching results', error: error.message });
  }
});

export default router;
