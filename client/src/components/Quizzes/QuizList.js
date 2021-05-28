import React from "react";
import { fetchQuizzes } from "../../actions/index";
import Loader from "../Loader";
import RenderQuizList from "../RenderQuizList";

class QuizList extends React.Component {
  state = { quizzes: null };
  componentDidMount() {
    this.fetchQuizzes();
  }
  /**
   * Request all the quizzes from the database
   */
  fetchQuizzes = async () => {
    const quizzes = await fetchQuizzes({
      limit: 10,
      sort: "attempts",
      order: "desc",
    });
    this.setState({ quizzes: quizzes });
  };
  render() {
    if (!this.state.quizzes) {
      return <Loader />;
    }
    return (
      <div className="container quiz-list py-8">
        <div className="flex md:flex-row flex-col md:space-x-8 space-y-2">
          <div className="filter">
            <h3 className="text-lg font-bold text-center">
              {this.state.quizzes.length}
              <p>Quiz(s) Found</p>
            </h3>
          </div>
          <div className="flex-grow md:px-8 px-2 flex flex-col space-y-4">
            {/**Search Bar */}
            <div className="flex space-x-4 items-center quiz-data border rounded mb-4 px-2">
              <div className="flex space-x-2">O</div>
              <input className="flex-grow text-lg" placeholder="Search" />
            </div>
            {/**Content */}
            <RenderQuizList quizzes={this.state.quizzes} />
            {/**Pagination */}
          </div>
        </div>
      </div>
    );
  }
}

export default QuizList;
