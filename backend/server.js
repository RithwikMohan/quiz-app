import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import sequelize from './config/database.js';
import './models/index.js'; // Import models and associations

import questionRoutes from './routes/questionRoutes.js';
import resultRoutes from './routes/resultRoutes.js';

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

app.use('/api/questions', questionRoutes);
app.use('/api/results', resultRoutes);

const PORT = process.env.PORT || 5000;

sequelize.authenticate()
  .then(() => {
    console.log('✅ MySQL connected');
    return sequelize.sync({ alter: true }); // Update schema to match models
  })
  .then(() => {
    app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
  })
  .catch((error) => {
    console.error('MySQL connection error:', error.message);
  });
