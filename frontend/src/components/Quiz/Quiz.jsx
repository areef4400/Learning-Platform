import React, { useState } from 'react';
import "./Quiz.css";
import { useLocation, useNavigate } from 'react-router-dom';

export function Quiz() {
  const location = useLocation();
  const navigate = useNavigate();
  const { quiz = [], courseName } = location.state || {};

  const [answers, setAnswers] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [score, setScore] = useState(0);

  const handleChange = (questionIndex, optionKey) => {
    setAnswers(prev => ({ ...prev, [questionIndex]: optionKey }));
  };

  const handleSubmit = async () => {
    let correct = 0;
    quiz.forEach((q, idx) => {
      if (answers[idx] === q.answer) correct++;
    });

    const percent = (correct / quiz.length) * 100;
    setScore(percent.toFixed(2));
    setSubmitted(true);

    if (percent >= 75) {
      try {
        const res = await fetch('http://localhost:3000/aval/cc/user/addToCom', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            email: localStorage.getItem('userName'),
            course: courseName
          })
        });

        const data = await res.json();
        if (res.ok) {
          alert(`Quiz passed! 🎉 Course "${courseName}" marked as completed.`);
        } else {
          alert('Passed, but failed to add to completed courses.');
        }
      } catch (err) {
        alert('Error while marking course as completed.');
      }
    } else {
      alert(`You scored ${percent}%. Minimum 75% required to complete the course.`);
    }

    navigate('/explore');
  };

  return (
    <div className="quiz-container">
      <h1>Quiz for : {courseName}</h1>
      {quiz.map((q, idx) => (
        <div key={idx} className="question-box">
          <p><strong>Q{idx + 1}:</strong> {q.question}</p>
          {Object.entries(q.options).map(([key, value]) => (
            <label key={key} className="option">
              <input
                type="radio"
                name={`q-${idx}`}
                value={key}
                checked={answers[idx] === key}
                onChange={() => handleChange(idx, key)}
                disabled={submitted}
              />
              {key}. {value}
            </label>
          ))}
        </div>
      ))}
      {!submitted && (
        <button onClick={handleSubmit} className="submit-btn">
          Submit Quiz
        </button>
      )}
      {submitted && <p className="result-text">You scored: {score}%</p>}
    </div>
  );
}

export default Quiz;
