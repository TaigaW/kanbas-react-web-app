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

export default QuizList;