import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Dashboard.css";

const Dashboard = () => {
  const [quizzes, setQuizzes] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchQuizzes = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/quizzes", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setQuizzes(res.data);
      } catch (err) {
        console.log("Failed to fetch quizzes");
      }
    };

    fetchQuizzes();
  }, []);

  const startQuiz = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("username");
    navigate("/login");
  };

  return (
    <div className="dashboard">
      <button className="logout-button" onClick={handleLogout}>
        Logout
      </button>
      <h2 className="dashboard-title">Available Quizzes</h2>
      <div className="quiz-list">
        {quizzes.map((quiz) => (
          <div key={quiz._id} className="quiz-card">
            <h3>{quiz.title}</h3>
            <p>{quiz.description}</p>
            <button onClick={() => startQuiz(quiz._id)}>Start Quiz</button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
