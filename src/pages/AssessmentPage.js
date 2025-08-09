// src/pages/AssessmentPage.js
import React, { useState, useContext } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import './AssessmentPage.css'; // We'll create this CSS file next

const questions = [
  { text: "Feeling nervous, anxious, or on edge" },
  { text: "Not being able to stop or control worrying" },
  { text: "Worrying too much about different things" },
  { text: "Trouble relaxing" },
  { text: "Being so restless that it is hard to sit still" },
  { text: "Becoming easily annoyed or irritable" },
  { text: "Feeling afraid, as if something awful might happen" }
];

const options = [
  { text: "Not at all", value: 0 },
  { text: "Several days", value: 1 },
  { text: "More than half the days", value: 2 },
  { text: "Nearly every day", value: 3 }
];

const getResultCategory = (score) => {
  if (score <= 4) return 'Minimal';
  if (score <= 9) return 'Mild';
  if (score <= 14) return 'Moderate';
  return 'Severe';
};

const AssessmentPage = () => {
  const [answers, setAnswers] = useState(Array(questions.length).fill(null));
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleAnswer = (questionIndex, value) => {
    const newAnswers = [...answers];
    newAnswers[questionIndex] = value;
    setAnswers(newAnswers);
  };

  const handleSubmit = async () => {
    if (answers.includes(null)) {
      alert("Please answer all questions.");
      return;
    }

    const score = answers.reduce((total, ans) => total + ans, 0);
    const resultCategory = getResultCategory(score);

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const assessmentData = { quizType: 'GAD-7', score, resultCategory };

      // Send to your backend
      await axios.post('/api/assessments', assessmentData, config);

      // Redirect to results page, passing the results in state
      navigate('/results', { state: { score, resultCategory } });
    } catch (error) {
      console.error("Error submitting assessment:", error);
      alert("Could not submit your assessment. Please try again.");
    }
  };

  return (
    <div className="assessment-container">
      <h1>Mental Wellness Assessment (GAD-7)</h1>
      <p>Over the last 2 weeks, how often have you been bothered by the following problems?</p>
      <div className="questions-list">
        {questions.map((q, qIndex) => (
          <div key={qIndex} className="question-card">
            <p className="question-text">{qIndex + 1}. {q.text}</p>
            <div className="options-group">
              {options.map((opt, oIndex) => (
                <button
                  key={oIndex}
                  className={`option-button ${answers[qIndex] === opt.value ? 'selected' : ''}`}
                  onClick={() => handleAnswer(qIndex, opt.value)}
                >
                  {opt.text}
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>
      <button className="submit-button" onClick={handleSubmit}>
        See My Results
      </button>
    </div>
  );
};

export default AssessmentPage;