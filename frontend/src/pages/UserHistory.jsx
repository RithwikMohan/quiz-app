import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./UserHistory.css";

const UserHistory = () => {
  const [history, setHistory] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const res = await axios.get("http://localhost:5000/api/users/history", {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("token")}`,
          },
        });
        setHistory(res.data);
      } catch (err) {
        console.log("Error fetching user history");
      }
    };

    fetchHistory();
  }, []);

  const viewResults = (quizId) => {
    navigate(`/quiz/${quizId}`);
  };

  return (
    <div className="user-history">
      <h2>Your Quiz History</h2>
      {history.length === 0 ? (
        <p>No quiz attempts found</p>
      ) : (
        <div className="history-list">
          {history.map((item) => (
            <div key={item.quizId} className="history-card">
              <p>Quiz: {item.quizTitle}</p>
              <p>Score: {item.score}</p>
              <p>Date: {new Date(item.date).toLocaleDateString()}</p>
              <button onClick={() => viewResults(item.quizId)}>View Results</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default UserHistory;
