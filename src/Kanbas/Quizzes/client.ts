// import axios from "axios";
// const QUIZ_API = "http://localhost:4000/api/quizzes";
// export const findQuizByName = async (quizName: any) => {
//   const response = await axios
//     .get(`${QUIZ_API}/${quizName}`);
//   return response.data;
// };
// export const createQuiz = async (quizName: any, quiz: any) => {
//     const response = await axios.post(
//       `${QUIZ_API}/${quizName}`,
//       quiz
//     );
//     return response.data;
//   };

import axios from "axios";
const COURSES_API = "http://localhost:4000/api/courses";
const QUIZZES_API = "http://localhost:4000/api/quizzes";
const QUESTIONS_API = "http://localhost:4000/api/questions"

export const deleteQuiz = async (quizId: any) => {
  const response = await axios
    .delete(`${QUIZZES_API}/${quizId}`);
  return response.data;
};

export const findQuizzesForCourse = async (courseId: any) => {
  const response = await axios
    .get(`${COURSES_API}/${courseId}/quizzes`);
  return response.data;
};

export const getQuizById = async (quizId: any) => {
    const response = await axios.get(`${QUIZZES_API}/${quizId}/quizInfo`)
    return response.data;
}

export const createQuiz = async (courseId: any, quiz: any) => {
    const response = await axios.post(
      `${COURSES_API}/${courseId}/quizzes`,
      quiz
    );
    return response.data;
};

export const updateQuiz = async (quiz: any) => {
    const response = await axios.
      put(`${QUIZZES_API}/${quiz._id}`, quiz);
    return response.data;
  };
  

  
  export const deleteQuestion = async (questionId: any) => {
    const response = await axios
      .delete(`${QUESTIONS_API}/${questionId}`);
    return response.data;
  };
  
  export const findQuestionsForQuiz = async (quizId: any) => {
    const response = await axios
      .get(`${QUIZZES_API}/${quizId}/questions`);
    return response.data;
  };
  
  export const getQuestionById = async (questionId: any) => {
      const response = await axios.get(`${QUESTIONS_API}/${questionId}/questionInfo`)
      console.log("client")
      console.log(response.data)
      console.log(questionId)
      return response.data;
  }
  
  export const createQuestion = async (quizId: any, question: any) => {
      const response = await axios.post(
        `${QUIZZES_API}/${quizId}/questions`,
        question
      );
      return response.data;
  };

  export const updateQuestion = async (question: any) => {
    const response = await axios.
      put(`${QUESTIONS_API}/${question._id}`, question);
    return response.data;
  };
  
