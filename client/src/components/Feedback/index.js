import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
import Loader from "../Loader";
/**
 * Displays feedback based on user question and answer data
 */
class Feedback extends React.Component {
  /**
   *Renders the feedBackQuestions calculated form the feedback
   * @returns {JSX}
   */
  renderFeedback = () => {
    return this.props.feedback.map((feedBackQuestion, index) => {
      return (
        <tr className="quiz-item bg-gray-200" key={index}>
          <td className="text-center">{index + 1}</td>
          <td>{feedBackQuestion.question}</td>
          <td className="text-center">
            {feedBackQuestion.gotCorrect ? "Y" : "X"}
          </td>
          <td
            className="interactive"
            onClick={(e) => {
              e.target.innerHTML = feedBackQuestion.correctOption.option;
              e.target.classList.remove("cursor-pointer");
              e.target.classList.remove("text-disabled");
              e.target.parentElement.classList.remove("interactive");
            }}
          >
            <p className="text-sm text-disabled cursor-pointer">
              Reveal Answer
            </p>
          </td>
        </tr>
      );
    });
  };

  render() {
    if (!this.props.feedback) {
      return <Loader />;
    }
    const feedback = this.props.feedback;
    return (
      <React.Fragment>
        <h3 className="font-semibold text-2xl px-2">
          You got {feedback.correctAnswers} correct out of{" "}
          {this.props.quiz.questions.length}!
        </h3>
        <h4 className="font-semibold text-xl px-2">
          On 0. {this.props.quiz.name} Quiz by {this.props.quiz.author.name}
        </h4>
        <hr />
        <h4 className="font-semibold text-xl px-2">
          Solution feedBackQuestions
        </h4>
        <table className="w-full border p-2">
          <thead>
            <tr className="bg-white">
              <th className="text-center px-2">#</th>
              <th className="text-left">Question</th>
              <th className="text-left">feedBackQuestion</th>
              <th className="text-left">Answer</th>
            </tr>
          </thead>
          <tbody>{this.renderFeedback()}</tbody>
        </table>
        <h4 className="px-2">Test completed in 0 (s).</h4>
        <Link to="/quizzes">
          <Button>Try another Quiz</Button>
        </Link>
      </React.Fragment>
    );
  }
}

export default Feedback;
