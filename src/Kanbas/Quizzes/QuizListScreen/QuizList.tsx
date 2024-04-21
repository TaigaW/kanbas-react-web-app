import { useEffect, useState } from "react";
import "./index.css";
import { BsRocket } from "react-icons/bs";
import { quizzes } from "../../Database";
import { useNavigate, useParams } from "react-router";

function QuizList() {
  const { courseId } = useParams();
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
    availability: "2024-04-21",
    due: "2024-04-21",
    published: false,
  });
  const navigate = useNavigate();

  const addQuiz = (quiz: any) => {
    const newQuiz = { ...quiz, _id: new Date().getTime().toString() };
    const newQuizList = [newQuiz, ...quizzesList];
    setQuizList(newQuizList);
    navigate(`/quiz-details/${newQuiz._id}`);
  };

  const deleteQuiz = (quizId: string) => {
    const newQuizList = quizzesList.filter((quiz) => quiz._id !== quizId);
    setQuizList(newQuizList);
  };

  const publishQuiz = (quizId: string) => {
    const updatedQuizList = quizzesList.map((quiz) => {
      if (quiz._id === quizId) {
        return { ...quiz, published: !quiz.published };
      }
      return quiz;
    });
    setQuizList(updatedQuizList);
  };

  const toggleContextMenu = (
    event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    quizId: string
  ): void => {
    event.preventDefault();
    // Show context menu
    const contextMenu = document.getElementById("context-menu");
    if (contextMenu) {
      contextMenu.style.display = "block";
      contextMenu.style.left = `${event.clientX}px`;
      contextMenu.style.top = `${event.clientY}px`;
      setSelectedQuiz(quizId); // Set the selected quiz when the context menu is toggled
    }
  };

  const hideContextMenu = (): void => {
    // Hide context menu
    const contextMenu = document.getElementById("context-menu");
    if (contextMenu) {
      contextMenu.style.display = "none";
    }
  };

  const copyQuiz = (quizId: string) => {
    // Implement copying functionality here, e.g., open a modal for selecting destination course
  };

  const sortQuizzes = (criteria: string) => {
    let sortedQuizzes = [...quizzesList];
    if (criteria === "name") {
      sortedQuizzes.sort((a, b) => a.name.localeCompare(b.name));
    } else if (criteria === "due") {
      sortedQuizzes.sort(
        (a, b) => new Date(a.due).getTime() - new Date(b.due).getTime()
      );
    } else if (criteria === "availability") {
      sortedQuizzes.sort(
        (a, b) =>
          new Date(a.availability).getTime() -
          new Date(b.availability).getTime()
      );
    }
    setQuizList(sortedQuizzes);
  };

  return (
    <ul className="list-group">
      <li className="list-group-item">
        <button
          className="button Quiz+-button"
          style={{ backgroundColor: "red" }}
          onClick={addQuiz}
        >
          +Quiz
        </button>
      </li>
      <ul className="list-group">
        {/* Render quizzes from quizzesList */}
        {quizzesList.map((quiz, index) => (
          <li
            key={index}
            className="list-group-item"
            onClick={() => setSelectedQuiz(quiz)}
          >
            {/* Render quiz details */}
            <div style={{ display: "flex", alignItems: "center" }}>
              <BsRocket style={{ marginRight: "10px" }} />
              <strong>{quiz.name}</strong>
              <p>
                Not Available Until: {quiz.availability}
                Due: {quiz.due}
              </p>
              {/* Render the checkmark or crossed out circle */}
              {quiz.published ? (
                <span style={{ color: "green", marginLeft: "10px" }}>✔️</span>
              ) : (
                <span style={{ color: "red", marginLeft: "10px" }}>❌</span>
              )}
              <button
                className="button ...-button"
                style={{ backgroundColor: "white" }}
                onClick={(event) => toggleContextMenu(event, quiz._id)}
              >
                ...
              </button>
              <div
                id="context-menu"
                className="context-menu"
                onClick={hideContextMenu}
              >
                <ul>
                  <li onClick={() => deleteQuiz(quiz._id)}>Delete</li>
                  <li onClick={() => publishQuiz(quiz._id)}>
                    {quiz.published ? "Unpublish" : "Publish"}
                  </li>
                  <li onClick={() => sortQuizzes("name")}>Sort by Name</li>
                  <li onClick={() => sortQuizzes("due")}>Sort by Due Date</li>
                  <li onClick={() => sortQuizzes("availability")}>
                    Sort by Available Date
                  </li>
                  <li onClick={() => copyQuiz(quiz._id)}>Copy</li>
                  {/* Add more options as needed */}
                </ul>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </ul>
  );
}

export default QuizList;
