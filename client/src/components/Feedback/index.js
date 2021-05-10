import React from "react";
import { Link } from "react-router-dom";
import Button from "../Button";
/**
 * Displays feedback based on user question and answer data
 */
class Feedback extends React.Component {
  /**
   * Generates the users feedback based on the quiz and answer data
   * @returns {Object}
   */
  generateUserFeedback = () => {
    const quiz = this.props.quiz;
    const feedback = [{}]; //The feedback on a per question basis
    var correctAnswers = 0;
    //Calculate the amount of answers the user got correct
    for (var x = 0; x < quiz.questions.length; x++) {
      for (var y = 0; y < quiz.questions[x].options.length; y++) {
        if (quiz.questions[x].options[y].isAnswer === true) {
          if (this.props.answers[x] === y) {
            feedback[x] = {
              question: quiz.questions[x].description,
              correctOption: quiz.questions[x].options[y],
              gotCorrect: true,
            };
            correctAnswers++;
            break;
          }
          feedback[x] = {
            question: quiz.questions[x].description,
            correctOption: quiz.questions[x].options[y],
            gotCorrect: false,
          };
          break;
        }
      }
    }
    feedback.correctAnswers = correctAnswers;
    return feedback;
  };
  /**
   *
   * @param {Object} feedback contains data on the feedback calculated
   * @returns {JSX}
   */
  renderFeedback = (feedback) => {
    return feedback.map((feedback, index) => {
      return (
        <tr className="quiz-item bg-gray-200" key={index}>
          <td className="text-center">{index + 1}</td>
          <td>{feedback.question}</td>
          <td className="text-center">{feedback.gotCorrect ? "X" : "V"}</td>
          <td
            className="interactive"
            onClick={(e) => {
              e.target.innerHTML = feedback.correctOption.option;
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
    const feedback = this.generateUserFeedback();
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
        <h4 className="font-semibold text-xl px-2">Solution Results</h4>
        <table className="w-full border p-2">
          <thead>
            <tr className="bg-white">
              <th className="text-center px-2">#</th>
              <th className="text-left">Question</th>
              <th className="text-left">Result</th>
              <th className="text-left">Answer</th>
            </tr>
          </thead>
          <tbody>{this.renderFeedback(feedback)}</tbody>
        </table>
        <h4 className="px-2">Test completed in 0 (s).</h4>
        <Link to="/quiz/all">
          <Button>Try another Quiz</Button>
        </Link>
      </React.Fragment>
    );
  }
}

export default Feedback;
