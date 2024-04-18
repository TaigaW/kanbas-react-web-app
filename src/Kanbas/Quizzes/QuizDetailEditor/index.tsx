import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { saveQuiz, saveAndPublishQuiz } from '../reducer';
import { findQuizByName, createQuiz } from '../client';

const QuizDetailEditor: React.FC = () => {
  const navigate = useNavigate();
  const [quizTitle, setQuizTitle] = useState('');
  const [timeLimit, setTimeLimit] = useState('');
  const [shuffleAnswers, setShuffleAnswers] = useState(true);
  const [allowMultipleAttempts, setAllowMultipleAttempts] = useState(false);
  const [timeLimitEnabled, setTimeLimitEnabled] = useState(false);
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [availableFromDate, setAvailableFromDate] = useState<Date | null>(null);
  const [untilDate, setUntilDate] = useState<Date | null>(null);

  const handleSave = async () => {
    const quizData = {
      title: quizTitle,
      // other quiz details
    };
  
    // try {
    //   const response = await fetch('http://localhost:4000/api/quizzes', {
    //     method: 'POST',
    //     headers: {
    //       'Content-Type': 'application/json'
    //     },
    //     body: JSON.stringify(quizData)
    //   });
  
    //   if (!response.ok) {
    //     throw new Error('Network response was not ok');
    //   }
  
    //   const savedQuiz = await response.json();
    //   navigate(`/quiz-details/${savedQuiz._id}`); 
    // } catch (error) {
    //   console.error("Failed to save the quiz", error);
    //   // Handle errors here
    // }

    navigate(`/quiz-details/:quizId`); // Replace [quizId] with actual quiz ID
  };

  const handleSaveAndPublish = () => {
    // Code to save and publish the quiz
    // ...

    navigate('/quiz-list');
  };

  const handleCancel = () => {
    navigate('/quiz-list');
  };

  return (
    <div className="quiz-details">
      <div className="tabs">
        <button className="tab">Details</button>
        <button className="tab">Questions</button>
      </div>
      <input
        type="text"
        className="quiz-title-input"
        placeholder="Unnamed Quiz"
        value={quizTitle}
        onChange={(e) => setQuizTitle(e.target.value)}
      />
      <div className="quiz-instructions">
        Quiz Instructions: Edit View Insert Format Tools Table
      </div>
      <textarea className="quiz-description-input" />

      <label htmlFor="quiz-type-select">Quiz Type</label>
      <select
        id="quiz-type-select"
        className="quiz-type-select"
        defaultValue="Graded Quiz"
      >
        <option value="Graded Quiz">Graded Quiz</option>
        <option value="Practice Quiz">Practice Quiz</option>
        <option value="Graded Survey">Graded Survey</option>
        <option value="Ungraded Survey">Ungraded Survey</option>
      </select>

      <label htmlFor="assignment-group-select">Assignment Group</label>
      <select
        id="assignment-group-select"
        className="assignment-group-select"
        defaultValue="Quizzes"
      >
        <option value="Quizzes">Quizzes</option>
        <option value="Assignments">Assignments</option>
        <option value="Exams">Exams</option>
        <option value="Projects">Projects</option>
      </select>

      <div className="options-section">
        <label>
          <input
            type="checkbox"
            checked={shuffleAnswers}
            onChange={() => setShuffleAnswers(!shuffleAnswers)}
          />
          Shuffle Answers
        </label>
        <label>
          <input
            type="checkbox"
            checked={timeLimitEnabled}
            onChange={() => setTimeLimitEnabled(!timeLimitEnabled)}
          />
          Time Limit
        </label>
        {timeLimitEnabled && (
          <input
            type="text"
            className="time-limit-input"
            placeholder="Minutes"
            value={timeLimit}
            onChange={(e) => setTimeLimit(e.target.value)}
          />
        )}
        <label>
          <input
            type="checkbox"
            checked={allowMultipleAttempts}
            onChange={() => setAllowMultipleAttempts(!allowMultipleAttempts)}
          />
          Allow Multiple Attempts
        </label>
      </div>
      <div className="assignment-section" style={{ border: '1px solid #ccc', padding: '10px', marginTop: '20px' }}>
        <label>Assign to</label>
        <input type="text" placeholder="Everyone" />

        <label>Due</label>
        <DatePicker
          selected={dueDate}
          onChange={(date: Date) => setDueDate(date)}
          className="date-picker"
        />

        <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '10px' }}>
          <div>
            <label>Available from</label>
            <DatePicker
              selected={availableFromDate}
              onChange={(date: Date) => setAvailableFromDate(date)}
              className="date-picker"
            />
          </div>
          <div>
            <label>Until</label>
            <DatePicker
              selected={untilDate}
              onChange={(date: Date) => setUntilDate(date)}
              className="date-picker"
            />
          </div>
        </div>

        <button className="add-button" onClick={() => {/* handle add action */}}>
          + Add
        </button>
      </div>
      <div className="buttons-container">
        <button className="button cancel-button" onClick={handleCancel}>Cancel</button>
        <button className="button save-publish-button" onClick={handleSaveAndPublish}>Save & Publish</button>
        <button className="button save-button" onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default QuizDetailEditor;
