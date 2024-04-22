import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import * as client from '../client'; // Assume this has the necessary methods to fetch quiz data
import "./QuizPreview.css";


interface Question {
    _id: string;
    quizId: string;
    title: string;
    textQuestion: string;
    questionType: string;
    choices: { answer: string; correct: boolean; }[];
    points: number;
}

function QuizPreview() {
  const { qid } = useParams();
  const navigate = useNavigate();
  const [questions, setQuestions] = useState<Question[]>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [question, setQuestion] = useState<Question>(
    {
        _id: "quest1",
        quizId: "Q101",
        title: "test question",
        textQuestion: "what is 1 + 1",
        questionType: "Multiple Choice",
        choices: [
            {"answer": "2", "correct": true},
            {"answer": "3", "correct": false}
        ],
        points: 2
    },
)

  useEffect(() => {
    async function fetchQuizQuestions() {
      try {
        const fetchedQuestions = await client.findQuestionsForQuiz(qid);
        setQuestions(fetchedQuestions);
      } catch (error) {
        console.error("Failed to fetch questions", error);
        // Handle the error appropriately
      }
    }

    fetchQuizQuestions();
  }, [qid]);

  const currentQuestion = questions[currentQuestionIndex];

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      // Handle the end of the quiz, e.g., navigate away or show results
      console.log('End of quiz');
      // navigate('/some-end-route'); // Uncomment this to navigate to the end route
    }
  };

  if (!currentQuestion) {
    return <div>Loading...</div>; // Or some loading indicator
  }

  return (
    <div className="quiz-container">
      <div className="quiz-preview">
        <h2>{currentQuestion.title} - {currentQuestion.points} pts</h2>
        <p>{currentQuestion.textQuestion}</p>
        {currentQuestion.choices.map((choice, index) => (
          <label key={index} className="answer-choice">
            <input type="radio" name="answer" value={choice.answer} /> {choice.answer}
          </label>
        ))}
        <button onClick={handleNextQuestion}>Next</button>
      </div>

      <div className="question-list">
        {questions.map((q, index) => (
          <div
            key={q._id}
            className={`question-title ${index === currentQuestionIndex ? 'current-question' : ''}`}
          >
            {q.title}
          </div>
        ))}
      </div>
    </div>
  );
//   return (
//     <div className="quiz-preview">
//       <h2>{currentQuestion.title} - {currentQuestion.points} pts</h2>
//       <p>{currentQuestion.textQuestion}</p>
//       {currentQuestion.choices.map((choice, index) => (
//         <label key={index} className="answer-choice">
//           <input type="radio" name="answer" value={choice.answer} /> {choice.answer}
//         </label>
//       ))}
//       <button onClick={handleNextQuestion}>Next</button>
//     </div>
//   );
}

export default QuizPreview;
