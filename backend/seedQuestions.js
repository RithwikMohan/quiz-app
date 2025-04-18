import sequelize from './config/database.js';
import Question from './models/Question.js';

const sampleQuestions = [
  {
    question: 'What is the capital of France?',
    options: ['Paris', 'London', 'Berlin', 'Madrid'],
    correctAnswer: 'Paris',
    difficulty: 'easy',
  },
  {
    question: 'Which planet is known as the Red Planet?',
    options: ['Earth', 'Mars', 'Jupiter', 'Saturn'],
    correctAnswer: 'Mars',
    difficulty: 'easy',
  },
  {
    question: 'What is the chemical symbol for Gold?',
    options: ['Au', 'Ag', 'Gd', 'Go'],
    correctAnswer: 'Au',
    difficulty: 'medium',
  },
  {
    question: 'Who wrote "To Kill a Mockingbird"?',
    options: ['Harper Lee', 'Mark Twain', 'Ernest Hemingway', 'F. Scott Fitzgerald'],
    correctAnswer: 'Harper Lee',
    difficulty: 'medium',
  },
  {
    question: 'What is the derivative of sin(x)?',
    options: ['cos(x)', '-cos(x)', 'sin(x)', '-sin(x)'],
    correctAnswer: 'cos(x)',
    difficulty: 'hard',
  },
  {
    question: 'In which year did the Berlin Wall fall?',
    options: ['1987', '1989', '1991', '1993'],
    correctAnswer: '1989',
    difficulty: 'hard',
  },
];

async function seed() {
  try {
    await sequelize.authenticate();
    console.log('Database connected.');

    await sequelize.sync({ force: false }); // Do not drop tables

    for (const q of sampleQuestions) {
      await Question.create(q);
    }

    console.log('Sample questions seeded successfully.');
    process.exit(0);
  } catch (error) {
    console.error('Error seeding questions:', error);
    process.exit(1);
  }
}

seed();
