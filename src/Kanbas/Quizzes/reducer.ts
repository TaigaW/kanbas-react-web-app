import { createSlice } from "@reduxjs/toolkit";

const initialState = {
    quizzes: [],
    quiz: { quizName: "TestQuiz",
              description: "No Description",
              quizType: "Graded Quiz",
              assignmentGroup: "Quiz",
              shuffleAnswers: true,
              timeLimit: false,
              minutes: 0,
              allowMultipleAttemps: false,
              due: "2024-04-21",
              published: false
            },
  };
  const quizSlice = createSlice({
    name: "quizzes",
    initialState,
    reducers: {
        setQuiz: (state, action) => {
            state.quiz = action.payload
        },
        saveQuiz: (state, action) => {
            state.quiz = action.payload
        },
        saveAndPublishQuiz: (state, action) => {
            state.quiz.published = true
        }
      },
  });
  export const { setQuiz, saveQuiz, saveAndPublishQuiz} = quizSlice.actions;
  export default quizSlice.reducer;