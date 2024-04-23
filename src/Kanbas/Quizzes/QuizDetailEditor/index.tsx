import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { setQuiz, saveQuiz, saveAndPublishQuiz, addQuiz } from '../reducer';
import { findQuizzesForCourse, updateQuiz } from '../client';
import { useSelector, useDispatch } from "react-redux";
import { KanbasState } from "../../store";
import { quizzes } from '../../Database';
import * as client from '../client';
import { parse } from 'path';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

//const QuizDetailEditor: React.FC = () => {
function QuizDetailEditor() {
  //const { courseId } = useParams();
  const { quizId } = useParams();

  const dispatch = useDispatch();
  const quiz = useSelector((state: KanbasState) => 
    state.quizzesReducer.quiz);

  const navigate = useNavigate();
  const [quizName, setQuizName] = useState('');
  const [course, setCourse] = useState('')
  const [quizDescription, setQuizDescription] = useState('');
  const [quizType, setQuizType] = useState('Graded Quiz');
  const [assignmentGroup, setAssignmentGroup] = useState('Quiz');
  const [shuffleAnswers, setShuffleAnswers] = useState(true);
  const [minutes, setMinutes] = useState("0");
  const [timeLimit, setTimeLimit] = useState(false);
  const [allowMultipleAttempts, setAllowMultipleAttempts] = useState(false);
  const [forWho, setForWho] = useState('everyone')
  const [dueDate, setDueDate] = useState<Date | null>(null);
  const [available, setAvailable] = useState<Date | null>(null);
  const [untilDate, setUntilDate] = useState<Date | null>(null);
  const [published, setPublished] = useState(false);
  const [quizPoints, setQuizPoints] = useState("0");
  const [accessCode, setAccessCode] = useState('');
  const [showCorrect, setShowCorrect] = useState(false);
  const [oneQuestion, setOneQuestion] = useState(true);
  const [webCam, setWebCam] = useState(false);
  const [lockAfter, setLockAfter] = useState(false);

  const [points, setPoints] = useState(0);


  const [quizzesList, setQuizList] = useState<any[]>(quizzes);
  const [selectedQuiz, setSelectedQuiz] = useState(quizzesList[0]);



  const calcPoints = async (quizId: any) => {
    const questions = await client.findQuestionsForQuiz(quizId)
    const totalPoints = questions.reduce((acc: any, question: any) => acc + question.points, 0);
    return totalPoints
  }
   
  const updateQuiz = async () => {
    const newQuizData = {
      _id: quizId,
      name: quizName, // Set default data or use a form/modal for input
      description: quizDescription,
      course: course,
      quizType: quizType,
      shuffleAnswers: shuffleAnswers,
      assignmentGroup: assignmentGroup,
      timeLimit: timeLimit,
      minutes: minutes,
      allowMultipleAttempts: allowMultipleAttempts,
      due: dueDate,
      published: published,
      showCorrect: showCorrect,
      accessCode: accessCode,
      oneQuestion: oneQuestion,
      webCam: webCam,
      lockAfter: lockAfter,
      for: forWho,
      available: available,
      until: untilDate
    };
    const response = await client.updateQuiz(newQuizData)
    console.log(newQuizData.available)
    console.log(newQuizData.until)
    console.log(newQuizData.due)

    navigate(`/quiz-details/${quizId}`)
  };



  const handleSaveAndPublish = async () => {
    const newQuizData = {
      _id: quizId,
      name: quizName, // Set default data or use a form/modal for input
      description: quizDescription,
      course: course,
      quizType: quizType,
      shuffleAnswers: shuffleAnswers,
      assignmentGroup: assignmentGroup,
      timeLimit: timeLimit,
      minutes: minutes,
      allowMultipleAttempts: allowMultipleAttempts,
      due: dueDate,
      published: true,
      showCorrect: showCorrect,
      accessCode: accessCode,
      oneQuestion: oneQuestion,
      webCam: webCam,
      lockAfter: lockAfter,
      for: forWho,
      available: available,
      until: untilDate
    };
    const response = await client.updateQuiz(newQuizData)
    // navigate(`/question-list/${quizId}`)
    // const newQuizList = quizzesList.map((q) => {
    //   if (q._id === quiz._id) {
    //     return quiz;
    //   } else {
    //     return q;
    //   }
    // });
    // setQuizList(newQuizList);
    // //console.log(quiz._id)
    // console.log(newQuizList)



    navigate(`/quiz-list/${course}`);
  };

  const handleCancel = () => {
    navigate(`/quiz-list/${course}`);
  };

  const parseDateOrNull = (dateString: string) => {
    const date = Date.parse(dateString);
    return isNaN(date) ? null : new Date(date);
  };


  const viewQuestionsEditor = async() => {
    navigate(`/question-list/${quizId}`)
  }




  useEffect(() => {
    const fetchQuizDetails = async () => {
      try {
        const response = await client.getQuizById(quizId); // Implement this function to fetch quiz by ID
        const quizPoints = await calcPoints(quizId)
        setPoints(quizPoints)
        console.log("hi response")
        console.log(response)
        if (response) {
          console.log("in if")
          setQuiz(response[0]);
          // Update the form's state with the fetched quiz details
          setQuizName(response[0].name);
          setCourse(response[0].course)
          console.log("quiz name")
          console.log(response[0].name)
          setQuizDescription(response[0].description)
          setQuizType(response[0].quizType)
          setTimeLimit(response[0].timeLimit);
          setShuffleAnswers(response[0].shuffleAnswers);
          setAllowMultipleAttempts(response[0].allowMultipleAttempts);
          // ... set other state from response as needed ...
          setDueDate(parseDateOrNull(response[0].due))
          setAvailable(parseDateOrNull(response[0].available))
          setUntilDate(parseDateOrNull(response[0].until))
          setAccessCode(response[0].accessCode)
          setOneQuestion(response[0].oneQuestion)
          setWebCam(response[0].webCam)
          setLockAfter(response[0].lockAfter)
          setForWho(response[0].for)
        }
        else {
          setQuizName('');
          setQuizDescription('');
          setQuizType('Graded Quiz');
          setTimeLimit(false);
          setShuffleAnswers(false);
          setAllowMultipleAttempts(false);
          setDueDate(null);
          setAvailable(null);
          setUntilDate(null);
          setMinutes("0");
          setQuizPoints("0");
        }
      } catch (error) {
        console.error('Error fetching quiz details:', error);
        // Handle error, e.g., by showing an error message or redirecting
      }
    }
  if (quizId) {
    fetchQuizDetails();
  }
  }
  , [quizId, client]
);


  return (
    <div className="quiz-details">
      <div className="tabs">
        <button className="tab">Details</button>
        <button className="tab" onClick={viewQuestionsEditor}>Questions</button>
      </div>

      <input
        type="text"
        className="quiz-title-input"
        placeholder="Unnamed Quiz"
        value={quizName || ""}
        onChange={(e) => setQuizName(e.target.value)}
      />
      <div>
        <span>{points} points</span>
      </div>
      <div className="quiz-instructions">
        Quiz Instructions: Edit View Insert Format Tools Table
      </div>
      <ReactQuill
        className='quiz-description-input'
        value={quizDescription || ""}
        onChange={setQuizDescription}
      />

      <label htmlFor="quiz-type-select">Quiz Type</label>

      <select
        id="quiz-type-select"
        className="quiz-type-select"
        value={quizType} // Controlled component
        onChange={(e) => setQuizType(e.target.value)}
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
            checked={timeLimit}
            onChange={() => setTimeLimit(!timeLimit)}
          />
          Time Limit
        </label>
        {timeLimit && (
          <input
            type="text"
            className="time-limit-input"
            placeholder="Minutes"
            value={minutes || ""}
            onChange={(e) => setMinutes(e.target.value)}
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

        <label>
          Access Code
          <input
            type="text"
            value={accessCode}
            onChange={() => setAccessCode(accessCode)}
          />
        </label>

        <label>
          One Question at a Time
          <input
            type="checkbox"
            checked={oneQuestion}
            onChange={() => setOneQuestion(!oneQuestion)}
          />
        </label>

        <label>
          Show correct answer
          <input
            type="checkbox"
            checked={showCorrect}
            onChange={() => setShowCorrect(!showCorrect)}
          />
        </label>

        <label>
          WebCam
          <input
            type="checkbox"
            checked={webCam}
            onChange={() => setWebCam(!webCam)}
          />
        </label>
        <label>
          Lock After Answer
          <input
            type="checkbox"
            checked={lockAfter}
            onChange={() => setLockAfter(!lockAfter)}
          />
        </label>
      </div>
      <div className="assignment-section" style={{ border: '1px solid #ccc', padding: '10px', marginTop: '20px' }}>
        <label>Assign to
          
        </label>
        <input type="text" value={forWho} onChange={() => setForWho(forWho)}/>

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
              selected={available}
              onChange={(date: Date) => setAvailable(date)}
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
        <button className="button save-button" onClick={updateQuiz}>Save</button>
      </div>
    </div>
  );
};

export default QuizDetailEditor;
