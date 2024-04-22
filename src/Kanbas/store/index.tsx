import { configureStore } from "@reduxjs/toolkit";
import modulesReducer from "../Courses/Modules/reducer";
import { quizzesReducer, questionsReducer} from "../Quizzes/reducer"
export interface KanbasState {
  modulesReducer: {
    modules: any[];
    module: any;
  };
  quizzesReducer: {
    quizzes: any[];
    quiz: any;
  };
  questionsReducer: {
    questions: any[];
    question: any;
  }
}
const store = configureStore({
  reducer: {
    modulesReducer,
    quizzesReducer,
    questionsReducer
  }
});


export default store;