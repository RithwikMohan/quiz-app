import { DataTypes } from 'sequelize';
import sequelize from '../config/database.js';

const Answer = sequelize.define('Answer', {
  id: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
  chosenAnswer: {
    type: DataTypes.STRING,
    allowNull: false,
  },
}, {
  tableName: 'answers',
  timestamps: true,
});

export default Answer;
