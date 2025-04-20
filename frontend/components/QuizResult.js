import React, { useState } from "react";
import axios from "axios";

const QuizResult = ({ userId, quizId, score }) => {
  const [message, setMessage] = useState("");

  const handleSubmit = async () => {
    try {
      const response = await axios.post("http://localhost:5000/api/submit-quiz", {
        user_id: userId,
        quiz_id: quizId,
        score: score,
      });
      setMessage(response.data); // "Quiz results saved successfully."
    } catch (error) {
      setMessage("Error saving quiz results.");
    }
  };

  return (
    <div>
      <button onClick={handleSubmit}>Submit Results</button>
      {message && <p>{message}</p>}
    </div>
  );
};

export default QuizResult;
