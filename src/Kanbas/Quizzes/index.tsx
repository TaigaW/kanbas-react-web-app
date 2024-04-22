import Signin from "../../Users/Signin";
import Profile from "../../Users/Profile";
import UserTable from "../../Users/Table";
import AuthenticationPage from "../../Users";
import { Routes, Route, Navigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import QuizList from "./QuizList";
import * as client from "./client";
import CourseNavigation from "../Courses/Navigation";
import { HiMiniBars3 } from "react-icons/hi2";

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

export default function QuizSection() {
  const { courseId } = useParams();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);

  const [course, setCourse] = useState<any>({ _id: "" });


  useEffect(() => {
    async function fetchQuizzes() {
        console.log("fdsafdasfdsafasd")
      try {
        console.log(courseId)
        const fetchedQuizzes = await client.findQuizzesForCourse(courseId);
        setQuizzes(fetchedQuizzes);
        console.log(fetchedQuizzes)
      } catch (error) {
        console.error("Failed to fetch quizzes", error);
      }
    }

    fetchQuizzes();
  }, [courseId]);
  

    return (
    <div>
      <h1><HiMiniBars3 /> Course {course?.name}</h1>
      <CourseNavigation courseId={courseId}/>
      <div>
        <div
          className="overflow-y-scroll position-fixed bottom-0 end-0"
          style={{ left: "320px", top: "50px" }} >
          <Routes>
            <Route path="/" element={<Navigate to={`/quiz-list/${courseId}`} replace />} />
            {/* <Route path="/questionForm/:questionId" element={<QuestionForm/>}/> */}
            {/* <Route path="/quiz-details/:quizId" element={<QuizDetails />} />  */}
            <Route path="/quiz-list/:cid" element={<QuizList />} />
            {/* <Route path="/edit-quiz/:quizId" element={<QuizDetailEditor />} />
            <Route path="/question-list/:qid" element={<QuizQuestionList/>}/>
            <Route path="/quiz-preview/:qid" element={<QuizPreview/>}/> */}
          </Routes>
        </div>
      </div>
    </div>
  );
}