import React, { useState } from 'react';

const QuizList: React.FC = () => {
    return (
        <div className="quiz-details">
          <div className="tabs">
            <button className="tab">Details</button>
            <button className="tab">Questions</button>
          </div>
        </div>
    )
}

// DELETING DONE HERE
// const handleAddQuiz = () => {
//   createQuiz(courseId, quiz).then((quiz) => {
//     dispatch(addQuiz(quiz));
//   });
// };

export default QuizList;