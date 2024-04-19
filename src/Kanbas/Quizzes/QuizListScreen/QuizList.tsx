import { useState } from "react";
import "./index.css";
import { quizzes } from "../../Database";
import { useParams } from "react-router";

function QuizList() {
  const { courseId } = useParams();
  //const quizzesList = quizzes.filter((quiz) => quiz.course === courseId);
  const [quizzesList, setQuizList] = useState<any[]>(quizzes);
  const [selectedQuiz, setSelectedQuiz] = useState(quizzesList[0]);
  const [quiz, setQuiz] = useState({
    name: "TestQuiz",
    _id: "1",
    description: "No Description",
    quizType: "Graded Quiz",
    assignmentGroup: "Quiz",
    shuffleAnswers: true,
    timeLimit: false,
    minutes: 0,
    allowMultipleAttemps: false,
    due: "2024-04-21",
    published: false,
  });
  const addQuiz = (quiz: any) => {
    const newQuiz = { ...quiz, _id: new Date().getTime().toString() };
    const newQuizList = [newQuiz, ...quizzesList];
    setQuizList(newQuizList);
  };
  const deleteQuiz = (quizId: string) => {
    const newQuizList = quizzesList.filter((quiz) => quiz._id !== quizId);
    setQuizList(newQuizList);
  };
  const updateQuiz = () => {
    const newQuizList = quizzesList.map((m) => {
      if (m._id === quiz._id) {
        return quiz;
      } else {
        return m;
      }
    });
    setQuizList(newQuizList);
  };
  return (
    <ul className="list-group">
      <li className="list-group-item">
        <button style={{ backgroundColor: "green" }} onClick={addQuiz}>
          Add
        </button>
        <div className="dropdown">
          <button className="dropbtn">...</button>
          <div className="dropdown-content">
            <button onClick={updateQuiz}>Update</button>
            <button onClick={() => deleteQuiz(quiz._id)}>Delete</button>
            <button
              onClick={(event) => {
                setQuiz(quiz);
              }}
            >
              Edit
            </button>
          </div>
        </div>
      </li>
      {quizzesList
        .filter((quiz) => quiz.course === courseId)
        .map((quiz, index) => (
          <li key={index} className="list-group-item">
            <button
              onClick={(event) => {
                setQuiz(quiz);
              }}
            >
              Edit
            </button>
            <button onClick={() => deleteQuiz(quiz._id)}>Delete</button>
            {quiz.name}
            ...
          </li>
        ))}
    </ul>
  );
}
export default QuizList;
