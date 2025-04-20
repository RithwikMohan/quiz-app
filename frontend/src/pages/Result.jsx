import React, { useEffect, useCallback, useRef, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Result.css";

const Result = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const isSubmitting = useRef(false);
  const hasSubmittedRef = useRef(false);
  const [submissionStatus, setSubmissionStatus] = useState(null);

  const score = location.state?.score ?? 0; // Default to 0 if score is not provided
  const totalQuestions = location.state?.totalQuestions || 5;
  const username = location.state?.username;
  const quizId = location.state?.quizId;

  const getCompliment = () => {
    if (score === totalQuestions) return "Excellent work! 🔥";
    if (score >= totalQuestions * 0.6) return "Good job! Keep going! 💪";
    return "Don’t worry, keep practicing! 😊";
  };

  const submitResult = useCallback(async () => {
    if (hasSubmittedRef.current || !username || quizId === undefined) return;

    try {
      const submissionKey = `submitted_${username}_${quizId}`;
      if (localStorage.getItem(submissionKey)) {
        setSubmissionStatus("Result already submitted.");
        hasSubmittedRef.current = true;
        return;
      }

      isSubmitting.current = true;

      const payload = {
        username,
        quiz_id: quizId,
        score,
        total_questions: totalQuestions,
      };

      console.log("📤 Submitting result:", payload);
      await axios.post("http://localhost:5000/api/submit-result", payload);

      localStorage.setItem(submissionKey, "true");
      setSubmissionStatus("✅ Result submitted successfully!");
      hasSubmittedRef.current = true;
    } catch (error) {
      console.error("❌ Error submitting result:", error.response?.data || error.message);
      setSubmissionStatus("❌ Failed to submit result.");
    } finally {
      isSubmitting.current = false;
    }
  }, [username, score, totalQuestions, quizId]);

  useEffect(() => {
    submitResult();
  }, [submitResult]);

  const goToDashboard = () => {
    navigate("/dashboard");
  };

  return (
    <div className="result-container">
      <h2>Your Score: {score} / {totalQuestions}</h2>
      <p className="compliment">{getCompliment()}</p>

      {isSubmitting.current ? (
        <p className="submission-status">Submitting your result...</p>
      ) : (
        submissionStatus && <p className="submission-status">{submissionStatus}</p>
      )}

      <button onClick={goToDashboard} disabled={isSubmitting.current}>
        Back to Dashboard
      </button>
    </div>
  );
};

export default Result;
