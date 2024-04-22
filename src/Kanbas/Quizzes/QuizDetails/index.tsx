// import React, { useEffect, useState } from "react";
// import { Route, useNavigate, useParams } from "react-router";
// import QuizDetailEditor from "../QuizDetailEditor";
// import "./QuizDetails.css"; // Import CSS file
// import * as client from "../client"

// function QuizDetails() {
//     const { quizId } = useParams();
//   const [quiz, setQuiz] = useState({
//     quizType: "Graded Quiz",
//     points: 0,
//     assignmentGroup: "Quizzes",
//     shuffleAnswers: "Yes",
//     timeLimit: "20 Minutes",
//     multipleAttempts: "No",
//     showCorrectAnswers: "No",
//     accessCode: "",
//     oneQuestionAtATime: "Yes",
//     webcamRequired: "No",
//     lockQuestionsAfterAnswering: "No",
//     dueDate: "",
//     availableDate: "",
//     untilDate: "",
//     published: false,
//   });
//   const navigate = useNavigate();

//   const handlePublishToggle = () => {
//     setQuiz({ ...quiz, published: !quiz.published });
//   };

//   const handlePreviewClick = () => {
//     // Navigate to Quiz Preview screen
//   };

//   const handleEditClick = (quiz: any) => {
//     // Navigate to Quiz Editor screen
//     const newQuiz = { ...quiz, _id: new Date().getTime().toString() };
//     navigate(`/edit-quiz/${newQuiz._id}`);
//   };

//   const calculateTotalPoints = () => {
//     // Logic to calculate total points from questions
//   };
//   useEffect(() => {
//     const fetchQuiz = async () => {
//       try {
//         const fetchedQuiz = await client.getQuizById(quizId); // getQuizById should be an API call to fetch quiz details
//         setQuiz(fetchedQuiz[0]);
//         console.log(fetchedQuiz[0].name)
//       } catch (error) {
//         console.error('Error fetching quiz details:', error);
//         // Handle the error appropriately, maybe show a message to the user
//       }
//     };

//     fetchQuiz();
//   }, [quizId]);

//   return (
//     <div className="container">
//       {/* Add container class */}
//       <h2>Quiz Details</h2>
//       <div className="buttons-container">
//         <button
//           className={`publish-button ${quiz.published ? "published" : ""}`}
//           onClick={handlePublishToggle}
//         >
//           {quiz.published ? "Unpublish" : "Publish"}
//         </button>
//         <button className="button preview-button" onClick={handlePreviewClick}>
//           Preview
//         </button>
//         <button className="button edit-button" onClick={handleEditClick}>
//           Edit
//         </button>
//       </div>
//       <div className="grey-bar"></div> {/* Grey bar */}
//       <div>
//         <p><strong>Quiz Type </strong> {quiz.quizType}</p>
//         <p><strong>Points </strong> {quiz.points}</p>
//         <p><strong>Assignment Group </strong> {quiz.assignmentGroup}</p>
//         <p><strong>Shuffle Answers </strong> {quiz.shuffleAnswers}</p>
//         <p><strong>Time Limit </strong> {quiz.timeLimit}</p>
//         <p><strong>Multiple Attempts </strong> {quiz.multipleAttempts}</p>
//         <p><strong>Show Correct Answers </strong> {quiz.showCorrectAnswers}</p>
//         <p><strong>Access Code </strong> {quiz.accessCode}</p>
//         <p><strong>One Question At A Time </strong> {quiz.oneQuestionAtATime}</p>
//         <p><strong>Webcam Required </strong> {quiz.webcamRequired}</p>
//         <p><strong>Lock Questions After Answering </strong> {quiz.lockQuestionsAfterAnswering}</p>
//       </div>

//       <div className="due-for-container">
//         <div>
//           <p><strong>Due</strong></p>
//           <p>{quiz.dueDate}</p>
//         </div>
//         <div>
//           <p><strong>For</strong></p>
//           <p>{quiz.assignmentGroup}</p>
//         </div>
//         <div>
//           <p><strong>Available From</strong></p>
//           <p>{quiz.availableDate}</p>
//         </div>
//         <div>
//           <p><strong>Until</strong></p>
//           <p>{quiz.untilDate}</p>
//         </div>
//       </div>
//     </div>
//   );
// }

// export default QuizDetails;


import React, { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import './QuizDetails.css'; 
import * as client from '../client'; 

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
    availableFrom: string,
    until: string,
    points: number
}

function QuizDetails() {
  const { quizId } = useParams();
  const navigate = useNavigate();
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
  const [isLoading, setIsLoading] = useState(true);
  const [points, setPoints] = useState(0)

  const viewQuestions = async() => {
    navigate(`/question-list/${quizId}`)
    }

    const handlePublishToggle = () => {
        setQuiz({ ...quiz, published: !quiz.published });
    };

  useEffect(() => {
    const fetchQuiz = async () => {
      setIsLoading(true);
      try {
        const fetchedQuiz = await client.getQuizById(quizId); // getQuizById should be an API call to fetch quiz details
        const questions = await client.findQuestionsForQuiz(quizId)
        const totalPoints = questions.reduce((acc: any, question: any) => acc + question.points, 0);
        setPoints(totalPoints)
        setQuiz(fetchedQuiz[0]);
        console.log(fetchedQuiz)
      } catch (error) {
        console.error('Error fetching quiz details:', error);
        // Handle the error appropriately, maybe show a message to the user
      }
      setIsLoading(false);
    };

    fetchQuiz();
  }, [quizId]);

  if (isLoading) {
    return <div>Loading quiz details...</div>; // Or some other loading indicator
  }

  if (!quiz) {
    return <div>Quiz not found.</div>; // Or some error message
  }

  return (


    <div className="quiz-details">
           <div className="tabs">
             <button className="tab">Details</button>
             <button className="tab" onClick={viewQuestions}>Questions</button>
           </div>
      <h2>{quiz.name}</h2>
      <div className="buttons-container">
        <button
          className={`publish-button ${quiz.published ? "published" : ""}`}
          onClick={handlePublishToggle}
        >
          {!quiz.published ? "Not Published" : "Published"}
        </button>
        <button className="button preview-button" onClick={() => navigate(`/quiz-preview/${quizId}`)}>
          Preview
        </button>
        <button className="button edit-button" onClick={() => navigate(`/edit-quiz/${quizId}`)}>
          Edit
        </button>
      </div>
      <div className="grey-bar"></div> {/* Grey bar */}
      <div>
        <p><strong>Quiz Type </strong> {quiz.quizType}</p>
        <p><strong>Points </strong> {points}</p>
        <p><strong>Assignment Group </strong> {quiz.assignmentGroup}</p>
        <p><strong>Shuffle Answers </strong> {quiz.shuffleAnswers.toString()}</p>
        <p><strong>Time Limit </strong> {quiz.timeLimit.toString()}</p>
        <p><strong>Multiple Attempts </strong> {quiz.allowMultipleAttemps.toString()}</p>
        <p><strong>Show Correct Answers </strong> {quiz.showCorrect.toString()}</p>
        <p><strong>Access Code </strong> {quiz.accessCode}</p>
        <p><strong>One Question At A Time </strong> {quiz.oneQuestion.toString()}</p>
        <p><strong>Webcam Required </strong> {quiz.webCam.toString()}</p>
        <p><strong>Lock Questions After Answering </strong> {quiz.lockAfter.toString()}</p>
      </div>

      <div className="due-for-container">
        <div>
          <p><strong>Due</strong></p>
          <p>{quiz.dueDate}</p>
        </div>
        <div>
          <p><strong>For</strong></p>
          <p>{quiz.for}</p>
        </div>
        <div>
          <p><strong>Available From</strong></p>
          <p>{quiz.available}</p>
        </div>
        <div>
          <p><strong>Until</strong></p>
          <p>{quiz.until}</p>
        </div>
      </div>
    </div>


    // <div className="quiz-details">
    //       <div className="tabs">
    //         <button className="tab">Details</button>
    //         <button className="tab" onClick={viewQuestions}>Questions</button>
    //       </div>
          
    // <div className="quiz-details-container">
    //   <div className="quiz-actions">
    //     <span className={`status-indicator ${quiz.published ? 'published' : 'unpublished'}`}>
    //       {quiz.published ? 'Published' : 'Unpublished'}
    //     </span>
    //     <button onClick={() => navigate(`/quiz-preview/${quizId}`)}>Preview</button>
    //     <button onClick={() => navigate(`/edit-quiz/${quizId}`)}>Edit</button>
    //     {/* More buttons and actions */}
    //   </div>
    //   <h1>{quiz.name}</h1>
    //   {/* Rest of the quiz details */}
    //   <div className="quiz-info">
    //     <div className="quiz-detail"><strong>Quiz Type:</strong> {quiz.quizType}</div>
    //     <div className="quiz-detail"><strong>Points:</strong> {quiz.points}</div>
    //     <div className="quiz-detail"><strong>Assignment Group:</strong> {quiz.assignmentGroup}</div>
    //     {/* More details */}
    //     <div className="due-info">
    //       <strong>Due:</strong> {quiz.due} <strong>For:</strong> Everyone
    //       <strong>Available from:</strong> {quiz.availableFrom} <strong>Until:</strong> {quiz.until}
    //     </div>
    //   </div>
    // </div>
    // </div>
  );
}

export default QuizDetails;