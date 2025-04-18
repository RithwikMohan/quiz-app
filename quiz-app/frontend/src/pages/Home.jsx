import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Home = () => {
  const [name, setName] = useState('');
  const [difficulty, setDifficulty] = useState('easy');
  const navigate = useNavigate();

  const handleStartQuiz = () => {
    navigate(`/quiz?name=${encodeURIComponent(name)}&difficulty=${difficulty}`);
  };

  const isNameValid = name.trim().length >= 3;

  return (
    <div className="flex flex-col items-center justify-center mt-24 text-center px-4">
      <h1 className="text-5xl font-bold text-gray-800 mb-8">Welcome to the Quiz App</h1>
      <p className="text-lg text-gray-600 mb-8">Test your knowledge and see how you score!</p>

      <input
        type="text"
        placeholder="Enter your name (min 3 letters)"
        value={name}
        onChange={(e) => setName(e.target.value)}
        className="mb-6 px-6 py-3 text-lg border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 text-center"
      />

      <select
        value={difficulty}
        onChange={(e) => setDifficulty(e.target.value)}
        className="mb-8 px-6 py-3 text-lg border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 w-64 text-center"
      >
        <option value="easy">Easy</option>
        <option value="medium">Medium</option>
        <option value="hard">Hard</option>
      </select>

      <button
        onClick={handleStartQuiz}
        disabled={!isNameValid}
        className={`${
          isNameValid ? 'bg-blue-600 hover:bg-blue-700' : 'bg-gray-400 cursor-not-allowed'
        } text-white font-bold py-4 px-8 rounded-full text-xl transition duration-300`}
      >
        Start Quiz
      </button>
    </div>
  );
};

export default Home;
