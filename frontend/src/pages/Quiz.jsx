import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./Quiz.css";

const Quiz = () => {
  const { id: quizId } = useParams(); // Get quiz ID from URL params
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuestions = async () => {
      setLoading(true);
      setError(null);
      try {
        if (!quizId) {
          setError("Quiz ID is missing.");
          setLoading(false);
          return;
        }

        const response = await axios.get(`http://localhost:5000/api/questions/${quizId}`);
        setQuestions(response.data);
        setLoading(false);
      } catch (err) {
        if (err.response && err.response.status === 404) {
          setError("No questions found for this quiz.");
        } else {
          setError("Error fetching questions.");
        }
        setLoading(false);
      }
    };
    
    fetchQuestions();
  }, [quizId]);

  const handleAnswer = (selectedOption) => {
    const current = questions[currentQuestion];
    if (current.correct_option === selectedOption) {
      setScore(score + 1);
    }
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      const username = localStorage.getItem("username");
      navigate("/result", { state: { score: score + 1, totalQuestions: questions.length, username: username, quizId: quizId } });
    }
  };

  if (loading) {
    return <div>Loading questions...</div>;
  }

  if (error) {
    return <div>{error}</div>;
  }

  const current = questions[currentQuestion];

  return (
    <div className="quiz-container">
      <h2 className="quiz-question">{current.question_text}</h2>
      <div className="quiz-options">
        <button className="quiz-option-button" onClick={() => handleAnswer("A")}>{current.option_a}</button>
        <button className="quiz-option-button" onClick={() => handleAnswer("B")}>{current.option_b}</button>
        <button className="quiz-option-button" onClick={() => handleAnswer("C")}>{current.option_c}</button>
        <button className="quiz-option-button" onClick={() => handleAnswer("D")}>{current.option_d}</button>
      </div>
    </div>
  );
};

export default Quiz;
