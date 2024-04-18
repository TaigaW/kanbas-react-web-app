// import React, { useState } from 'react';
// import './multipleChoiceStyle.css';
// import { FaTrashAlt } from 'react-icons/fa';

// type Answer = {
//   text: string;
//   isCorrect: boolean;
// };

// function MultipleChoice () {
//   const [questionTitle, setQuestionTitle] = useState('');
//   const [questionText, setQuestionText] = useState('');
//   const [answers, setAnswers] = useState<Answer[]>([
//     { text: '', isCorrect: false },
//     { text: '', isCorrect: false },
//     { text: '', isCorrect: false },
//   ]);

//   const deleteAnswer = (index: number) => {
//     const newAnswers = answers.filter((_, i) => i !== index);
//     setAnswers(newAnswers);
//   };

//   const handleAnswerChange = (text: string, index: number) => {
//     const newAnswers = answers.map((answer, i) =>
//       i === index ? { ...answer, text } : answer
//     );
//     setAnswers(newAnswers);
//   };

//   const handleCorrectAnswerChange = (index: number) => {
//     const newAnswers = answers.map((answer, i) =>
//       ({ ...answer, isCorrect: i === index })
//     );
//     setAnswers(newAnswers);
//   };

//   const addAnswer = () => {
//     setAnswers([...answers, { text: '', isCorrect: false }]);
//   };

//   const handleSubmit = () => {
//     // Submit logic here
//     console.log({ questionTitle, questionText, answers });
//   };

//   return (
//     <div className="question-form">
//       <input
//         type="text"
//         placeholder="Question Title"
//         value={questionTitle}
//         onChange={(e) => setQuestionTitle(e.target.value)}
//       />

//       <select defaultValue="Multiple Choice">
//         <option value="Multiple Choice">Multiple Choice</option>
//         <option value="True/False">True/False</option>
//         <option value="Fill in the Blank">Fill in the Blank</option>
//       </select>
//       <textarea
//         placeholder="Enter your question"
//         value={questionText}
//         onChange={(e) => setQuestionText(e.target.value)}
//       />

//         <div className="answers-section">
//         {answers.map((answer, index) => (
//           <div key={index} className="answer-input">
//             <input
//               type="checkbox"
//               checked={answer.isCorrect}
//               onChange={() => handleCorrectAnswerChange(index)}
//             />
//             <input
//               type="text"
//               value={answer.text}
//               onChange={(e) => handleAnswerChange(e.target.value, index)}
//             />
//             <button onClick={() => deleteAnswer(index)} className="delete-answer-button">
//                 <FaTrashAlt /> 
//             </button>
//           </div>
//         ))}
//       </div>


//       <button onClick={addAnswer}>+ Add Another Answer</button>
//       <button onClick={handleSubmit}>Update Question</button>
      
//     </div>
//   );
// };

// export default MultipleChoice;



import React, { useState } from 'react';
import './questionStyle.css';
import { FaTrashAlt } from 'react-icons/fa';

type Answer = {
  text: string;
  isCorrect: boolean;
};

function QuestionForm() {
  const [questionTitle, setQuestionTitle] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState('Multiple Choice');
  const [answers, setAnswers] = useState<Answer[]>([
    { text: 'True', isCorrect: false },
    { text: 'False', isCorrect: false },
  ]);

    const handleQuestionTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
        setQuestionType(event.target.value);
        // Reset answers when question type changes
        if (event.target.value === 'True/False') {
            setAnswers([
                { text: 'True', isCorrect: false },
                { text: 'False', isCorrect: false },
            ]);
        } else if (event.target.value === 'Multiple Choice'){
            setAnswers([{ text: '', isCorrect: false },
                { text: '', isCorrect: false },
                { text: '', isCorrect: false }
            ]);
        } else if (event.target.value === 'Fill in the Blank') {
            setAnswers([{ text: '', isCorrect: true }]); 
          }

    };
    const deleteAnswer = (index: number) => {
        const newAnswers = answers.filter((_, i) => i !== index);
        setAnswers(newAnswers);
    };

    const handleAnswerChange = (text: string, index: number) => {
        const newAnswers = answers.map((answer, i) =>
            i === index ? { ...answer, text } : answer
        );
        setAnswers(newAnswers);
    };

    const handleCorrectAnswerChange = (index: number) => {
        const newAnswers = answers.map((answer, i) =>
            ({ ...answer, isCorrect: i === index })
            );
        setAnswers(newAnswers);
    };

    const addAnswer = () => {
        setAnswers([...answers, { text: '', isCorrect: false }]);
    };

    const handleSubmit = () => {
        // Submit logic here
        console.log({ questionTitle, questionText, answers });
    };


  return (
    <div className="question-form">
      <input
        type="text"
        placeholder="Question Title"
        value={questionTitle}
        onChange={(e) => setQuestionTitle(e.target.value)}
      />

      <select value={questionType} onChange={handleQuestionTypeChange}>
        <option value="Multiple Choice">Multiple Choice</option>
        <option value="True/False">True/False</option>
        <option value="Fill in the Blank">Fill in the Blank</option>
      </select>

      <textarea
        placeholder="Enter your question"
        value={questionText}
        onChange={(e) => setQuestionText(e.target.value)}
      />

      {questionType === 'Multiple Choice' && (
        <div className="answers-section">
          {answers.map((answer, index) => (
            <div key={index} className="answer-input">
              <input
                type="checkbox"
                checked={answer.isCorrect}
                onChange={() => handleCorrectAnswerChange(index)}
              />
              <input
                type="text"
                value={answer.text}
                onChange={(e) => handleAnswerChange(e.target.value, index)}
              />
              <button onClick={() => deleteAnswer(index)} className="delete-answer-button">
                <FaTrashAlt/> 
              </button>
            </div>
          ))}
          <button onClick={addAnswer}>+ Add Another Answer</button>
        </div>
      )}

      {questionType === 'True/False' && (
        <div className="answers-section">
          {answers.map((answer, index) => (
            <div key={index} className="answer-input">
              <input
                type="checkbox"
                checked={answer.isCorrect}
                onChange={() => handleCorrectAnswerChange(index)}
              />
              <span>{answer.text}</span>
            </div>
          ))}
        </div>
      )}

      {questionType === 'Fill in the Blank' && (
        <div className="answers-section">
          {answers.map((answer, index) => (
            <div key={index} className="answer-input">
              <label>Possible Answer</label>
              <input
                type="text"
                value={answer.text}
                onChange={(e) => handleAnswerChange(e.target.value, index)}
              />
              {answers.length > 1 && ( 
                <button onClick={() => deleteAnswer(index)} className="delete-answer-button">
                  <FaTrashAlt />
                </button>
              )}
            </div>
          ))}
          <button onClick={addAnswer} className="add-answer-button">+ Add Another Answer</button>
        </div>
      )}
      <button onClick={handleSubmit}>Update Question</button>
    </div>
  );
};

export default QuestionForm;
