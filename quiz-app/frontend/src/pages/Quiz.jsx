import React, { useState, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

const Quiz = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const difficulty = queryParams.get('difficulty') || 'easy';
  const playerName = queryParams.get('name') || 'Player';

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [answers, setAnswers] = useState([]);

  useEffect(() => {
    // Fetch questions from backend
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`http://localhost:5000/api/questions?difficulty=${difficulty}`);
        if (!response.ok) {
          throw new Error('Failed to fetch questions');
        }
        const data = await response.json();
        setQuestions(data);
      } catch (error) {
        console.error('Error fetching questions:', error);
      }
    };
    fetchQuestions();
  }, [difficulty]);

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value);
  };

  const handleNextQuestion = async () => {
    if (selectedOption === null) return;

    // Save answer for current question
    const currentQ = questions[currentQuestion];
    setAnswers(prev => [
      ...prev,
      {
        questionId: currentQ._id,
        chosenAnswer: selectedOption,
      },
    ]);

    if (currentQuestion < questions.length - 1) {
      setSelectedOption(null);
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Final submission to backend
      try {
        const response = await fetch('http://localhost:5000/api/results', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: playerName,
            difficulty: difficulty,
            answers: [...answers, { questionId: questions[currentQuestion]._id, chosenAnswer: selectedOption }],
          }),
        });
        const resultData = await response.json();
        if (resultData.success) {
          navigate('/result', {
            state: {
              score: resultData.data.score,
              totalQuestions: questions.length,
              appreciation: resultData.data.appreciation,
            },
          });
        } else {
          console.error('Error from backend:', resultData.message);
        }
      } catch (error) {
        console.error('Error saving result:', error);
      }
    }
  };

  if (questions.length === 0) {
    return <div className="text-center mt-20">Loading questions...</div>;
  }

  return (
    <div className="max-w-xl mx-auto mt-20 bg-white rounded-2xl shadow-xl p-8 border border-gray-200">
      <h2 className="text-2xl text-gray-800 font-bold mb-4 text-center">
        {difficulty.charAt(0).toUpperCase() + difficulty.slice(1)} Quiz — Question {currentQuestion + 1} of {questions.length}
      </h2>
      <p className="text-lg text-gray-600 mb-2 text-center">Player: <span className="font-semibold">{playerName}</span></p>
      <p className="text-xl font-semibold text-gray-700 mb-8 text-center">
        {questions[currentQuestion].question}
      </p>
      <div className="space-y-4">
        {questions[currentQuestion].options.map((option, index) => (
          <label
            key={index}
            className={`flex items-center rounded-lg border p-4 cursor-pointer transition duration-200 ${
              selectedOption === option
                ? 'bg-blue-100 border-blue-500'
                : 'border-gray-300 hover:bg-gray-50'
            }`}
          >
            <input
              type="radio"
              name="answer"
              value={option}
              checked={selectedOption === option}
              onChange={handleOptionChange}
              className="mr-3 focus:ring-blue-500 h-5 w-5 text-blue-600 border-gray-300"
            />
            <span className="text-gray-800 text-lg">{option}</span>
          </label>
        ))}
      </div>
      <button
        onClick={handleNextQuestion}
        disabled={selectedOption === null}
        className={`mt-10 w-full py-3 rounded-full font-semibold text-white transition duration-300 focus:outline-none ${
          selectedOption === null
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-blue-600 hover:bg-blue-700'
        }`}
      >
        {currentQuestion === questions.length - 1 ? 'Finish Quiz' : 'Next Question'}
      </button>
    </div>
  );
};

export default Quiz;
