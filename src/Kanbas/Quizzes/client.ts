import axios from "axios";
const QUIZ_API = "http://localhost:4000/api/quizzes";
export const findQuizByName = async (quizName: any) => {
  const response = await axios
    .get(`${QUIZ_API}/${quizName}`);
  return response.data;
};
export const createQuiz = async (quizName: any, quiz: any) => {
    const response = await axios.post(
      `${QUIZ_API}/${quizName}`,
      quiz
    );
    return response.data;
  };
  