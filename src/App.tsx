import Labs from "./Labs";
import HelloWorld from "./Labs/a3/HelloWorld";
import Kanbas from "./Kanbas";
import QuizDetailEditor from './Kanbas/Quizzes/QuizDetailEditor';
import QuizDetails from './Kanbas/Quizzes/QuizDetails';
import QuizList from './Kanbas/Quizzes/QuizList';
import {HashRouter} from "react-router-dom";
import QuestionForm from "./Kanbas/Quizzes/QuizQuestions/QuizQuestionEditor";
import QuizQuestionList from "./Kanbas/Quizzes/QuizQuestions/QuizQuestionList";
import QuizPreview from "./Kanbas/Quizzes/QuizPreview";
//import {Routes, Route, Navigate} from "react-router";
import './App.css'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { Provider } from "react-redux";
import store from "./Kanbas/store";
import AuthenticationPage from "./Users";


// import QuizDetailsScreen from './Kanbas/Quizzes/QuizDetails';
// import QuizListScreen from './Kanbas/Quizzes/QuizList';

function App() {
  return (
    <Provider store={store}>
    <Router>
      <Routes>
        <Route path="/questionForm/:questionId" element={<QuestionForm/>}/>
        <Route path="/quiz-details/:quizId" element={<QuizDetails />} /> 
        <Route path="/quiz-list/:cid" element={<QuizList />} />
        <Route path="/edit-quiz/:quizId" element={<QuizDetailEditor />} />
        <Route path="/" element={<Navigate to="/users/authenticate" replace />} />
        <Route path="/question-list/:qid" element={<QuizQuestionList/>}/>
        <Route path="/quiz-preview/:qid" element={<QuizPreview/>}/>
        <Route path="/Kanbas/*" element={<Kanbas/>}/>
        <Route path="/users/authenticate" element={<AuthenticationPage/>}/>

      </Routes>
    </Router>
    </Provider>

    // <HashRouter>
    //   <div>
    //     <Routes>
    //       <Route path="/"         element={<Navigate to="/Labs"/>}/>
    //       <Route path="/Labs/*"   element={<Labs/>}/>
    //       <Route path="/Kanbas/*" element={<Kanbas/>}/>
    //       <Route path="/hello"    element={<HelloWorld/>}/>
    //     </Routes>
    //   </div>
    // </HashRouter>
);}

export default App;


