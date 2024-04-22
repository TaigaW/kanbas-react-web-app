import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import * as client from '../../client';
import { questions } from '../../../Database'
import * as QuizQuestionEditor from '../QuizQuestionEditor'
import { setQuestion, saveQuestion, updateQuestion, addQuestion} from '../../reducer'
import { FaPencilAlt, FaTrashAlt } from 'react-icons/fa';
import './QuizQuestionList.css';


interface Question {
    _id: string;
    quizId: string;
    title: string;
    textQuestion: string;
    questionType: string;
    choices: { answer: string; correct: boolean; }[];
    points: number;
}

function QuizQuestionList() {
    const { qid } = useParams();
    const navigate = useNavigate();
    const [questions, setQuestions] = useState<Question[]>([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

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

    const handleAddQuestion = async () => {
        try {
            const newQuestionData = {
                title: '', // Set default data or use a form/modal for input
                textQuestion: '',
                questionType: 'Multiple Choice',
                choices: [
                    { answer: 'A', correct: false },
                    { answer: 'B', correct: true },
                    { answer: 'C', correct: false }
                ],
                points: 0
            };
            const newQuestion = await client.createQuestion(qid, newQuestionData);
            console.log(newQuestion._id)
            console.log(newQuestion.quizId)
            navigate(`/questionForm/${newQuestion._id}`);
        } catch (error) {
            console.error("Failed to create a new question", error);
            setError('Failed to create a new question');
        }
    };

    const handleDelete = async (questionId: string) => {
        try {
            await client.deleteQuestion(questionId);
            setQuestions(questions.filter(question => question._id !== questionId));
        } catch (error) {
            console.error("Failed to delete the question", error);
            setError('Failed to delete the question');
        }
    };


    const handleEdit = async (questionId: string) => {
        try {
            navigate(`/questionForm/${questionId}`)
            
        } catch (error) {
            console.error("Failed to edit the question", error);
            setError('Failed to edit the question');
        }
    }
  
    useEffect(() => {
      async function loadQuestions() {
        setLoading(true);
        try {
          const data = await client.findQuestionsForQuiz(qid);
          console.log("sfdsas")
          console.log(data)
          setQuestions(data); 
          setError('');
        } catch (error) {
          console.error("Failed to fetch questions", error);
          setError('Failed to fetch questions');
        }
        setLoading(false);
      }
  
      loadQuestions();
    }, [qid]);

    const viewDetails = async() => {
        navigate(`/quiz-details/${qid}`)
    }

    // return (
        
    //     <div className="quiz-details">
    //       <div className="tabs">
    //         <button className="tab" onClick={viewDetails}>Details</button>
    //         <button className="tab">Questions</button>
    //       </div>
    //       <div>
    //     <h1>Questions for Quiz {qid}</h1>
    //     <ul>
    //         {questions.map(question => (
    //             <li key={question._id} className="question-item">
    //             <div className="question-content">
    //                 <h2>{question.title}</h2>
    //                 <p>{question.textQuestion}</p>
    //                 <p>Type: {question.questionType}</p>
    //             </div>
    //             <button className="delete-button" onClick={() => handleDelete(question._id)}>
    //                 <FaTrashAlt />
    //             </button>
    //             </li>
    //         ))}
    //     </ul>
    //     <button onClick={handleAddQuestion}>+ Add Question</button>
    //     <button onClick={() => {/* logic to add question group */}}>+ Add Question Group</button>
    //     <button onClick={() => {/* logic to find questions */}}>Find Questions</button>
    //     </div>
    //     </div>
    // )
    return (
        <div className="quiz-details">
          <div className="tabs">
            <button className="tab" onClick={viewDetails}>Details</button>
            <button className="tab">Questions</button>
          </div>
          <div>
            <h1>Questions for Quiz {qid}</h1>
            <ul>
                {questions.map(question => (
                    <li key={question._id} className="question-item">
                    <div className="question-content">
                        <h2>{question.title}</h2>
                        <p>{question.textQuestion}</p>
                        <p>Type: {question.questionType}</p>
                    </div>
                    <div className="question-actions">
                      <button className="delete-button" onClick={() => handleEdit(question._id)}>
                          <FaPencilAlt />
                      </button>
                      <button className="delete-button" onClick={() => handleDelete(question._id)}>
                          <FaTrashAlt />
                      </button>
                    </div>
                    </li>
                ))}
            </ul>
            <button onClick={handleAddQuestion}>+ Add Question</button>
            <button onClick={() => {/* logic to add question group */}}>+ Add Question Group</button>
            <button onClick={() => {/* logic to find questions */}}>Find Questions</button>
          </div>
        </div>
      )
}

export default QuizQuestionList;