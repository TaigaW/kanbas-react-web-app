import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { KanbasState } from "../../store";



function QuizDetails() {
    const { quizId } = useParams();
    const quiz = useSelector((state: KanbasState) => 
        state.quizzesReducer.quiz);
    if (!quiz) {
        return <div>Quiz not found</div>;
      }
    
      return (
        <div className="quiz-details-container">
          {/* Display quiz information */}
          <h2>{quiz.title}</h2>
          <div className="quiz-detail">
            <span>Quiz Type</span>
            <span>{quiz.quizType}</span>
          </div>
          {/* Repeat the structure above for each piece of quiz information */}
          {/* ... */}
        </div>
      );


    // return (
        
    //     <div className="quiz-details">
    //       <div className="tabs">
    //         <button className="tab">Details</button>
    //         <button className="tab">Questions</button>
    //       </div>
    //     </div>
    // )
}

export default QuizDetails;