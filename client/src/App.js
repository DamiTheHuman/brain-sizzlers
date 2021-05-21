import "./App.css";
import { Switch, Route } from "react-router-dom";
import Footer from "./components/Footer";
import Header from "./components/Header";
import PrivateRoute from "./components/PrivateRoute";
import PublicRoute from "./components/PublicRoute";
import QuizList from "./components/Quizzes/QuizList";
import QuizCreate from "./components/Quizzes/QuizCreate";
import QuizShow from "./components/Quizzes/QuizShow";
import Home from "./components/Home";
import UsersShow from "./components/Users/UsersShow";
function App() {
  return (
    <div className="App flex flex-col h-full min-h-screen">
      <Header />
      <main className="flex-grow pb-8">
        <Switch>
          <PublicRoute path="/" component={Home} exact />
          <PublicRoute path="/users/:name" component={UsersShow} exact />
          <PrivateRoute path="/quizzes" component={QuizList} exact />
          <PrivateRoute path="/quizzes/new" component={QuizCreate} exact />
          <PrivateRoute path="/quizzes/:name" component={QuizShow} exact />
        </Switch>
      </main>
      <Footer />
    </div>
  );
}

export default App;
