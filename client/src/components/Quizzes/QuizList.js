import React from "react";
import { fetchQuizzes } from "../../actions/index";

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
   * Renders a list of quizzes for the user to select from
   */
  renderQuizList = () => {
    return this.state.quizzes.map((quiz, index) => {
      return (
        <tr className="quiz-item bg-gray-200" key={index}>
          <td>{index}</td>
          <td>{quiz.name}</td>
          <td>{quiz.author.name}</td>
          <td>{quiz.attempts == 0 ? "EASY" : "Hard"}</td>
        </tr>
      );
    });
  };

  render() {
    if (!this.state.quizzes) {
      return "Loading...";
    }
    return (
      <div className="container quiz-list py-8">
        <table className="w-full border p-2">
          <thead>
            <tr className="bg-white">
              <th className="text-left">#</th>
              <th className="text-left">Quiz</th>
              <th className="text-left">Author</th>
              <th className="text-left">Difficulty</th>
            </tr>
          </thead>
          <tbody>{this.renderQuizList()}</tbody>
        </table>
      </div>
    );
  }
}

export default QuizList;
