import { createSlice } from "@reduxjs/toolkit";

type Choice = {
    answer: string,
    correct: Boolean
}

const initialState = {
    quizzes: [] as { _id: string; name: string; course: string; description: string;  quizType: string; assignmentGroup: string; shuffleAnswers: Boolean; timeLimit: Boolean; minutes: Number; allowMultipleAttemps: Boolean; due: Date; published: Boolean, points: Number}[],
    quiz: { 
        name: "TestQuiz",
        course: "RS101",
        description: "No Description",
        quizType: "Graded Quiz",
        assignmentGroup: "Quiz",
        shuffleAnswers: true,
        timeLimit: false,
        minutes: 0,
        allowMultipleAttemps: false,
        due: "2024-04-21",
        published: false,
        points: 0
    },
    
    questions: [] as { _id: string; quizId: string; title: string; textQuestion: string; questionType: string; choices: Choice[], points: number}[],
    question: {
        quizId: "Q101",
        title: "test question",
        textQuestion: "what is 1 + 1",
        questionType: "Multiple Choice",
        choices: [
            {answer: "2", correct: true},
            {answers: "3", correct: false}
        ],
        points: 2
    }
    
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
        },
        updateQuiz: (state, action) => {
            state.quizzes = state.quizzes.map((quiz) => {
              if (quiz._id === action.payload._id) {
                return action.payload;
              } else {
                return quiz;
              }
            });
          },
        addQuiz: (state, action) => {
            state.quizzes = [
              { ...action.payload, _id: new Date().getTime().toString() },
                ...state.quizzes,
            ];
        },

    },
});
const questionSlice = createSlice({
    name: "questions",
    initialState,
    reducers: {
        setQuestion: (state, action) => {
            state.question = action.payload
        },
        saveQuestion: (state, action) => {
            state.question = action.payload
        },
        updateQuestion: (state, action) => {
            state.questions = state.questions.map((question) => {
              if (question._id === action.payload._id) {
                return action.payload;
              } else {
                return question;
              }
            });
          },
        addQuestion: (state, action) => {
            state.questions = [
              { ...action.payload, _id: new Date().getTime().toString() },
                ...state.questions,
            ];
        },

    },
});
export const { setQuiz, saveQuiz, saveAndPublishQuiz, addQuiz} = quizSlice.actions;
export const quizzesReducer = quizSlice.reducer;

export const { setQuestion, saveQuestion, updateQuestion, addQuestion} = questionSlice.actions;
export const questionsReducer = questionSlice.reducer;
