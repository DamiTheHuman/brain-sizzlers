import React from "react";
import Loader from "../Loader";
import { formatDateToMMDDYY } from "../../api/general";
import { Link } from "react-router-dom";
/**
 * Generic rendering for a list of quizess
 */
class RenderQuizList extends React.Component {
  /**
   * Renders a list of quizzes for the user to select from
   */
  renderQuizList = () => {
    return this.props.quizzes.map((quiz, index) => {
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
              Created {formatDateToMMDDYY(quiz.createdAt)}
            </p>
            <p className="truncate">Attempted {quiz.attempts} Time(s)</p>
            <p className="truncate">Completed {quiz.timesCompleted} Time(s)</p>
          </div>
        </Link>
      );
    });
  };

  render() {
    if (!this.props.quizzes) {
      return <Loader />;
    }
    return (
      <div className="flex flex-col space-y-8">{this.renderQuizList()}</div>
    );
  }
}

export default RenderQuizList;
