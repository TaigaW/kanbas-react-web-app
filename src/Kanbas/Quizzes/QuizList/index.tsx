import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { findQuizzesForCourse, deleteQuiz } from '../client'; // This should be your API call file
import './QuizList.css';
import * as client from "../client";

interface Quiz {
  _id: string,
  name: string,
  description: string,
  course: string,
  quizType: string,
  shuffleAnswers: boolean,
  assignmentGroup: string,
  timeLimit: boolean,
  minutes: number,
  allowMultipleAttemps: boolean,
  due: string,
  published: boolean,
  available: string,
  until: string,
  points: number
}

function QuizList() {
  const { cid } = useParams();
  const navigate = useNavigate();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [error, setError] = useState('');
  const [showDropdown, setShowDropdown] = useState(false);
  const [quiz, setQuiz] = useState({
    name: "Quiz One",
    quizType: "Graded Quiz",
    points: 0,
    assignmentGroup: "Quizzes",
    shuffleAnswers: "Yes",
    timeLimit: "20 Minutes",
    allowMultipleAttemps: "No",
    dueDate: "",
    published: false,
    showCorrect: false,
    accessCode: "",
    oneQuestion: true,
    webCam: false,
    lockAfter: false,
    for: "everyone",
    available: "2024-04-20",
    until: "2024-04-22"

  });

  const toggleDropdown = () => setShowDropdown(!showDropdown);

  const calcPoints = async (quizId: any) => {
    const questions = await client.findQuestionsForQuiz(quizId)
    const totalPoints = questions.reduce((acc: any, question: any) => acc + question.points, 0);
    return totalPoints
  }

  

  useEffect(() => {
    async function fetchQuizzes() {
      try {
        const fetchedQuizzes = await findQuizzesForCourse(cid);
        setQuizzes(fetchedQuizzes);

        const quizzesWithPoints = await Promise.all(fetchedQuizzes.map(async (quiz: { _id: any; }) => {
          const points = await calcPoints(quiz._id);
          return { ...quiz, points: points };
        }));
        setQuizzes(quizzesWithPoints);
        
      } catch (error) {
        console.error("Failed to fetch quizzes", error);
        setError('Failed to fetch quizzes');
      }
    }

    fetchQuizzes();
  }, [cid]);

 
  const handleDelete = async (quizId: any) => {
    console.log("delete")
    console.log(quizId)
    try {
        await client.deleteQuiz(quizId);
        setQuizzes(quizzes.filter((quiz: { _id: any; }) => quiz._id !== quizId));
    } catch (error) {
        console.error("Failed to delete the quiz", error);
        setError('Failed to delete the quiz');
    }
  };

  const handlePublish = async (quiz: any) => {
    const newQuizData = quiz;
    newQuizData.published = !quiz.published
    const response = await client.updateQuiz(newQuizData)
  };
  
  const handleAddQuiz = async () => {
    try {
        const newQuizData = {

          name: "",
          description: "",
          course: cid,
          quizType: "Graded Quiz",
          shuffleAnswers: true,
          assignmentGroup: "Quiz",
          timeLimit: true,
          minutes: 20,
          allowMultipleAttemps: false,
          due: "",
          published: true,
          showCorrect: false,
          accessCode: "",
          oneQuestion: true,
          webCam: false,
          lockAfter: false,
          for: "everyone",
          available: "",
          until: ""

        };
        const newQuiz = await client.createQuiz(cid, newQuizData);
        console.log(newQuiz._id)
        console.log(newQuiz.course)
        navigate(`/quiz-details/${newQuiz._id}`);
    } catch (error) {
        console.error("Failed to create a new quiz", error);
        setError('Failed to create a new quiz');
    }
};


  return (
    <div className="quiz-list-container">
      <header className="quiz-list-header">
        <h1>Quizzes</h1>
        <button className="add-quiz-button" onClick={handleAddQuiz} >+ Add</button>
      </header>
      <div className="quiz-list"></div>
    <div className="quiz-list">
      {quizzes.map((quiz) => (
        <div key={quiz._id} className="quiz-item">
          <Link to={`/quiz-details/${quiz._id}`}>
            <div className="quiz-info">
              <h2>{quiz.name} - {quiz.points || 0} Points</h2>
              <p>Due {quiz.due} | Available from {quiz.available}</p>
            </div>
          </Link>
          <div className="quiz-actions">
            {quiz.published ? <span>✅</span> : <span>🚫</span>}

            <div className="dropdown-container">
              <button className="dropbtn" onClick={toggleDropdown}>⋮</button>
              {showDropdown && (
                <div className="dropdown-content">
                  <Link to={`/edit-quiz/${quiz._id}`}>Edit</Link>
                  <button onClick={() => handleDelete(quiz._id)}>Delete</button>
                  <button onClick={() => handlePublish(quiz)}>Publish</button>
                </div>
              )}
            </div>
          </div>
        </div>
      ))}
    </div>
    </div>
  );
}

export default QuizList;
