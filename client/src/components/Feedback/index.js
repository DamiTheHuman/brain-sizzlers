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
          <td>{index + 1}</td>
          <td>{feedback.question}</td>
          <td>{feedback.gotCorrect ? "Correct" : "Wrong"}</td>
          <td
            onClick={(e) => {
              e.target.innerHTML = feedback.correctOption.option;
            }}
          >
            Reveal Answer
          </td>
        </tr>
      );
    });
  };

  render() {
    const feedback = this.generateUserFeedback();
    return (
      <div>
        You got {feedback.correctAnswers} correct out of{" "}
        {this.props.quiz.questions.length}!
        <table className="w-full border p-2">
          <thead>
            <tr className="bg-white">
              <th className="text-left">#</th>
              <th className="text-left">Question</th>
              <th className="text-left">Result</th>
              <th className="text-left">Answer</th>
            </tr>
          </thead>
          <tbody>{this.renderFeedback(feedback)}</tbody>
        </table>
        <Link to="/quiz/all">
          <Button>Try another Quiz</Button>
        </Link>
      </div>
    );
  }
}

export default Feedback;
