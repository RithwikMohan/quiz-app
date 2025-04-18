import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Result = sequelize.define('Result', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  score: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  difficulty: {
    type: DataTypes.ENUM('easy', 'medium', 'hard'),
    allowNull: false,
  },
  appreciation: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'results',
  timestamps: true,
});

export default Result;
