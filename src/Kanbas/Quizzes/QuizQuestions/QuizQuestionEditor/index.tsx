import React, { useEffect, useState } from 'react';
import './questionStyle.css';
import { FaTrashAlt } from 'react-icons/fa';
import { useSelector } from 'react-redux';
import { KanbasState } from '../../../store';
import { questions } from '../../../Database'
import { useNavigate, useParams } from 'react-router';
import * as client from '../../client';
import { setQuestion, saveQuestion, updateQuestion, addQuestion} from '../../reducer'
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';


type Choice = {
  answer: string;
  correct: boolean;
};


function QuestionForm() {
  const navigate = useNavigate();
  const { questionId } = useParams();

  const question = useSelector((state: KanbasState) => 
    state.questionsReducer.question);

  const [quizId, setQuizId] = useState('')

  const [questionTitle, setQuestionTitle] = useState('');
  const [questionText, setQuestionText] = useState('');
  const [questionType, setQuestionType] = useState('Multiple Choice');
  const [choices, setChoices] = useState<Choice[]>([
    { answer: 'True', correct: false },
    { answer: 'False', correct: false },
  ]);
  const [points, setPoints] = useState('');

  const [questionsList, setQuestionList] = useState<any[]>(questions);


  useEffect(() => {
    const fetchQuestionDetails = async () => {
      try {
        const response = await client.getQuestionById(questionId);
        console.log(questionId)
        console.log("RESPONSE")
        console.log(response)
        if (response) {
          // Assuming response is the object with the question details
          setQuizId(response[0].quizId)
          setQuestionTitle(response[0].title);
          setQuestionText(response[0].textQuestion);
          setQuestionType(response[0].questionType);
          setChoices(response[0].choices);
          setPoints(response[0].points.toString()); // Assuming points is a number
        } else {
          // Reset the form if no question is found
          setQuestionTitle('');
          setQuestionText('');
          setQuestionType('Multiple Choice');
          setChoices([{ answer: '', correct: false }]); // Default choice for Multiple Choice
          setPoints(''); // Reset points
        }
      } catch (error) {
        console.error('Error fetching question details:', error);
      }
    };
  
    if (questionId) {
      fetchQuestionDetails();
    }
  }, [questionId]); // Only re-run if questionId changes
  

  const handleQuestionTypeChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
      setQuestionType(event.target.value);
      // Reset answers when question type changes
      if (event.target.value === 'True/False') {
          setChoices([
              { answer: 'True', correct: false },
              { answer: 'False', correct: false },
          ]);
      } else if (event.target.value === 'Multiple Choice'){
          setChoices([{ answer: '', correct: false },
              { answer: '', correct: false },
              { answer: '', correct: false }
          ]);
      } else if (event.target.value === 'Fill in the Blank') {
          setChoices([{ answer: '', correct: true }]); 
        }
  };

  const deleteAnswer = (index: number) => {
      const newAnswers = choices.filter((_, i) => i !== index);
      setChoices(newAnswers);
  };

  const handleAnswerChange = (newAnswer: string, index: number) => {
    const updatedChoices = choices.map((choice, i) =>
      i === index ? { ...choice, answer: newAnswer } : choice
    );
    setChoices(updatedChoices);
  };
  
  const handleCorrectAnswerChange = (index: number) => {
    const updatedChoices = choices.map((choice, i) =>
      i === index ? { ...choice, correct: !choice.correct } : choice
    );
    setChoices(updatedChoices);
  };

  const addAnswer = () => {
      setChoices([...choices, { answer: '', correct: false }]);
  };


  const updateQuestion = async () => {
    const newQuestionData = {
      _id: questionId,
      title: questionTitle, // Set default data or use a form/modal for input
      textQuestion: questionText,
      questionType: questionType,
      quizId: quizId,
      choices: choices,
      points: points
    };
    const response = await client.updateQuestion(newQuestionData)
    navigate(`/question-list/${quizId}`)
  };

  const cancel = () => {
    navigate(`/question-list/${quizId}`)
  }


  return ( 
    <div className="question-form">
      <div className="form-header">
      <input
        type="text"
        placeholder="Question Title"
        value={questionTitle || ''}
        onChange={(e) => setQuestionTitle(e.target.value)}
        className="question-title-input"
      />
      <div className="points-input-container">
        <label htmlFor="points">Points:</label>
        <input
          type="text"
          id="points"
          value={points || ''}
          onChange={(e) => setPoints(e.target.value)}
          className="points-input"
        />
      </div>
    </div>
      <select value={questionType} onChange={handleQuestionTypeChange}>
        <option value="Multiple Choice">Multiple Choice</option>
        <option value="True/False">True/False</option>
        <option value="Fill in the Blank">Fill in the Blank</option>
      </select>

      <ReactQuill
        placeholder="Enter your question"
        value={questionText || ''}
        onChange={setQuestionText}
        // onChange={(e) => setQuestionText(e.target.value)}
      />
      {questionType === 'Multiple Choice' && (
        <div className="answers-section">
          {choices.map((choice, index) => (
            <div key={index} className="answer-input">
              <input
                type="checkbox"
                checked={choice.correct || false}
                onChange={() => handleCorrectAnswerChange(index)}
              />
              <input
                type="text"
                value={choice.answer || ""}
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
          {choices.map((choice, index) => (
            <div key={index} className="answer-input">
              <input
                type="checkbox"
                checked={choice.correct}
                onChange={() => handleCorrectAnswerChange(index)}
              />
              <span>{choice.answer}</span>
            </div>
          ))}
        </div>
      )}

      {questionType === 'Fill in the Blank' && (
        <div className="answers-section">
          {choices.map((choice, index) => (
            <div key={index} className="answer-input">
              <label>Possible Answer</label>
              <input
                type="text"
                value={choice.answer}
                onChange={(e) => handleAnswerChange(e.target.value, index)}
              />
              {choices.length > 1 && ( 
                <button onClick={() => deleteAnswer(index)} className="delete-answer-button">
                  <FaTrashAlt />
                </button>
              )}
            </div>
          ))}
          <button onClick={addAnswer} className="add-answer-button">+ Add Another Answer</button>
        </div>
      )}
      <button className="cancel-button" onClick={cancel}>Cancel</button>
      <button onClick={updateQuestion} className="update-question-button">Update Question</button>
    </div>
  );
};

export default QuestionForm;
