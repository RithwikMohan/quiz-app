// src/pages/Result.jsx
import React from 'react';
import { useLocation, Link } from 'react-router-dom';

const Result = () => {
  const location = useLocation();
  const { score, totalQuestions, appreciation } = location.state || { score: 0, totalQuestions: 0, appreciation: '' };
  const percentage = (score / totalQuestions) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md p-10 text-center">
      <h2 className="text-3xl font-bold text-gray-800 mb-6">Quiz Results</h2>
      <p className="text-xl text-gray-700 mb-4">
        You scored <span className="font-semibold text-blue-600">{score}</span> out of {totalQuestions}!
      </p>
      <p className="text-lg text-gray-600 mb-8">
        (<span className="font-bold text-green-500">{percentage.toFixed(2)}%</span>)
      </p>
      <div className="mb-8">
        {appreciation ? (
          <p className="text-xl font-semibold text-green-600">{appreciation}</p>
        ) : (
          <>
            {percentage >= 80 && <p className="text-xl font-semibold text-green-600">Excellent work!</p>}
            {percentage >= 60 && percentage < 80 && <p className="text-xl font-semibold text-yellow-500">Good job!</p>}
            {percentage < 60 && <p className="text-xl font-semibold text-red-500">Keep practicing!</p>}
          </>
        )}
      </div>
      <Link
        to="/"
        className="bg-green-500 hover:bg-green-700 text-white font-bold py-3 px-6 rounded-full text-lg transition duration-300 focus:outline-none focus:shadow-outline"
      >
        Play Again?
      </Link>
    </div>
  );
};

export default Result;
