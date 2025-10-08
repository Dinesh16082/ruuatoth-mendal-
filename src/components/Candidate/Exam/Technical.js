import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import "./Technical.css";

const Technical = () => {
  const [questions, setQuestions] = useState([]);
  const [answers, setAnswers] = useState({});
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [timeLeft, setTimeLeft] = useState(900); // 15 minutes = 900 seconds

  const { companyid, opening } = useParams();
  const navigate = useNavigate();

  // Fetch technical questions
  useEffect(() => {
    setLoading(true);
    axios
      .post(
        `http://localhost:8000/auth/technical-questions/`,
        { company_id: companyid, opening_id: opening },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        setQuestions(res.data.questions || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [companyid, opening]);

  // Timer countdown
  useEffect(() => {
    if (loading) return;
    if (timeLeft <= 0) {
      handleSubmit(true); // auto-submit when time runs out
      return;
    }
    const timer = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timer);
  }, [timeLeft, loading]);

  const handleOptionChange = (qId, option) => {
    setAnswers((prev) => ({ ...prev, [qId]: option }));
  };

  const handleSubmit = (auto = false) => {
    // Fill unanswered with "F" if auto-submit
    const finalAnswers = { ...answers };
    if (auto) {
      questions.forEach((_, idx) => {
        if (!finalAnswers[idx]) {
          finalAnswers[idx] = "F";
        }
      });
    }

    const allAnswered = questions.every((_, idx) => finalAnswers[idx]);
    if (!allAnswered && !auto) {
      alert("Please answer all questions before submitting.");
      return;
    }

    setSubmitting(true);

    const formattedAnswers = questions.map((q, idx) => ({
      question_text: q.question,
      option_a: q.option_a,
      option_b: q.option_b,
      option_c: q.option_c,
      option_d: q.option_d,
      correct_answer: q.answer,
      selected_option: finalAnswers[idx] || "F",
      company_id: companyid,
      test_type: "Technical",
      opening_id: opening,
    }));

    axios
      .post(
        `http://localhost:8000/auth/submit-test`,
        {
          answers: formattedAnswers,
          test_type: "Technical",
          company_id: companyid,
          opening_id: opening,
        },
        { withCredentials: true, headers: { "Content-Type": "application/json" } }
      )
      .then((res) => {
        if (auto) {
          alert(`⏰ Time is up! You scored ${res.data.score} out of ${res.data.total}`);
        } else {
          alert(`You scored ${res.data.score} out of ${res.data.total}`);
        }
        navigate("/candidate-dashboard"); // ✅ always redirect after submit
        setSubmitting(false);
      })
      .catch((err) => {
        console.error(err);
        setSubmitting(false);
      });
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading technical questions...</p>
      </div>
    );
  }

  // Format timer MM:SS
  const minutes = Math.floor(timeLeft / 60);
  const seconds = timeLeft % 60;

  return (
    <div className="technical-container">
      <div className="technical-header">
        <h2 className="technical-title">Technical Assessment</h2>

        {/* Timer */}
        <div className="timer">
          Time Left: {minutes}:{seconds.toString().padStart(2, "0")}
        </div>

        <div className="progress-bar">
          <div
            className="progress-fill"
            style={{ width: `${(Object.keys(answers).length / questions.length) * 100}%` }}
          ></div>
        </div>
        <p className="progress-text">
          {Object.keys(answers).length} of {questions.length} questions answered
        </p>
      </div>

      <div className="questions-container">
        {questions.map((q, idx) => (
          <div key={idx} className="question-card">
            <div className="question-number">Question {idx + 1}</div>
            <p className="question-text">{q.question}</p>

            <div className="options-container">
              {["A", "B", "C", "D"].map((opt) => (
                <label
                  key={opt}
                  className={`option-label ${answers[idx] === opt ? "selected" : ""}`}
                >
                  <input
                    type="radio"
                    name={`q-${idx}`}
                    value={opt}
                    checked={answers[idx] === opt}
                    onChange={() => handleOptionChange(idx, opt)}
                    className="option-input"
                  />
                  <div className="option-content">
                    <span className="option-letter">{opt}</span>
                    <span className="option-text">{q[`option_${opt.toLowerCase()}`]}</span>
                  </div>
                  <div className="option-check"></div>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      <div className="submit-container">
        <button
          onClick={() => handleSubmit(false)}
          disabled={submitting}
          className={`submit-button ${submitting ? "submitting" : ""}`}
        >
          <span className="submit-text">
            {submitting ? "Submitting..." : "Submit Technical Test"}
          </span>
          {submitting && <div className="submit-spinner"></div>}
        </button>
      </div>
    </div>
  );
};

export default Technical;
