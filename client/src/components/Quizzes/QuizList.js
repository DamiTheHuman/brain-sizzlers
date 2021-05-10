import React from "react";
import { Link } from "react-router-dom";
import { fetchQuizzes } from "../../actions/index";
import Loader from "../Loader";

class QuizList extends React.Component {
  state = { quizzes: null };
  componentDidMount() {
    this.fetchQuizzes();
  }
  /**
   * Request all the quizzes from the database
   */
  fetchQuizzes = async () => {
    const response = await fetchQuizzes();
    this.setState({ quizzes: response.data });
  };
  /**
   * Converts a date to the appropriate format
   * @param {String|Date} date the date to convert
   * @returns {String} the date in mm/dd/yyyy
   */
  getFormattedDate(date) {
    date = new Date(date);
    const year = date.getFullYear();
    const month = (1 + date.getMonth()).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    return month + "/" + day + "/" + year;
  }
  /**
   * Renders a list of quizzes for the user to select from
   */
  renderQuizList = () => {
    return this.state.quizzes.map((quiz, index) => {
      return (
        <Link
          to={`/quiz/${quiz.name}`}
          className="quiz-item flex bg-gray-100 border px-8 items-center 
          transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-xl"
          key={index}
        >
          <div className="border-r border-gray-400 py-8 px-4">
            <div className="text-xl font-bold truncate">Quiz No {index}.</div>
          </div>
          <div className="flex flex-grow space-x-4 py-8 px-4 items-center">
            <div className="flex flex-col space-y-2">
              <h4 className="text-lg font-semibold">{quiz.name}</h4>
              <p className="two-line-overflow">{quiz.description}</p>
            </div>
            <div className="flex-grow">
              <p className="text-base truncate">{quiz.author.name}</p>
              <p className="text-success">
                {quiz.attempts === 0 ? "Easy" : "Hard"}
              </p>
            </div>
          </div>
          <div className="text-xs text-gray-400 py-8 px-4">
            <p className="truncate">
              Created {this.getFormattedDate(quiz.createdAt)}
            </p>
            <p className="truncate">Completed {quiz.timesCompleted} Times</p>
          </div>
        </Link>
      );
    });
  };

  render() {
    if (!this.state.quizzes) {
      return <Loader />;
    }
    return (
      <div className="container quiz-list py-8">
        <div className="flex space-x-8">
          <div className="filter">
            <h3 className="text-lg font-bold">1</h3>
            <p>Quiz(s) Found</p>
          </div>
          <div className="flex-grow  px-8 flex flex-col space-y-4">
            {/**Search Bar */}
            <div className="flex space-x-4 items-center quiz-data border rounded mb-4 px-2">
              <div className="flex space-x-2">O</div>
              <input className="flex-grow text-lg" placeholder="Search" />
            </div>
            {/**Content */}
            {this.renderQuizList()}
            {/**Pagination */}
          </div>
        </div>
      </div>
    );
  }
}

export default QuizList;
