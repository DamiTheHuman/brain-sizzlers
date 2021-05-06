import React from "react";
import { fetchQuiz } from "../../actions/index";
import Button from "../Button";
import Feedback from "../Feedback";
import Loader from "../Loader";
import Question from "../Question";
/**
 * Displays a singular quiz selected by the user
 */
class QuizShow extends React.Component {
  state = { quiz: null, currentSlide: 0, answers: [] };
  componentDidMount() {
    this.fetchQuiz();
  }
  /**
   * Fetches a singular quiz based on the current route
   */
  fetchQuiz = async () => {
    const quizName = this.props.match.params.name;
    const quiz = await fetchQuiz(quizName);
    this.setState({
      quiz: quiz.data,
      answers: new Array(quiz.data.questions.length),
    });
  };
  /**
   * Renders content to the user based on the current slide count
   */
  renderSlide = () => {
    if (this.state.currentSlide === 0) {
      const quiz = this.state.quiz;
      return (
        <div className="quiz-data">
          Show Quiz
          <div className="quiz-data">
            <h2 className="font-semibold">{quiz.name}</h2>
            <p>{quiz.description}</p>
            <p>This Quiz has {quiz.questions.length} Questions</p>
            <div
              onClick={() => {
                this.loadNextSlide();
              }}
            >
              <Button>Are you ready?</Button>
            </div>
          </div>
        </div>
      );
    } else if (
      this.state.currentSlide > 0 &&
      this.state.currentSlide < this.state.quiz.questions.length + 1
    ) {
      const index = this.state.currentSlide - 1; //The index of the question
      return (
        <Question
          question={this.state.quiz.questions[index]}
          index={index}
          loadNextSlide={this.loadNextSlide}
          loadPreviousSlide={this.loadPreviousSlide}
          saveAnswer={this.saveAnswer}
        />
      );
    } else {
      return (
        <div>
          <Feedback quiz={this.state.quiz} answers={this.state.answers} />
        </div>
      );
    }
  };

  /**
   * Load the next slide within the range of the question count
   */
  loadNextSlide = () => {
    if (this.state.currentSlide + 1 > this.state.quiz.questions.length + 1) {
      console.log("Cannot exceed slide count");
      return;
    }
    this.setState({ currentSlide: this.state.currentSlide + 1 });
  };
  /**
   * Load the next slide within the range of the question count
   */
  loadPreviousSlide = () => {
    if (this.state.quiz.questions.length - 1 < 0) {
      console.log("Cannot exceed slide count");
      return;
    }
    this.setState({ currentSlide: this.state.currentSlide - 1 });
  };
  /**
   * Saves the answer the user has selected based on the dropdown
   * @param {Integer} value the answer the user selected amongst the options
   * @param {Integer} index the index of the question answered
   */
  saveAnswer = (value, index) => {
    var answers = this.state.answers;
    answers[index] = value;
    this.setState({ answers: answers }, this.loadNextSlide());
  };

  render() {
    if (!this.state.quiz) {
      return <Loader />;
    }
    return <div className="container">{this.renderSlide()}</div>;
  }
}
export default QuizShow;
