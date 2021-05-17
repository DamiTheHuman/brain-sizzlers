import React from "react";
import { fetchQuiz, updateQuiz, createSubmission } from "../../actions/index";
import Button from "../Button";
import Feedback from "../Feedback";
import Loader from "../Loader";
import Question from "../Question";
/**
 * Displays a singular quiz selected by the user
 */
class QuizShow extends React.Component {
  state = {
    quiz: null,
    currentTab: 0,
    currentSlide: 0,
    answers: [],
    testCompleted: false,
    feedback: {},
  };
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
      quiz: quiz,
      answers: [],
      testCompleted: false,
    });
  };
  /**
   * Renders content based on the currently selected tab
   */
  renderTabContent = () => {
    if (this.state.currentTab === 0) {
      return (
        <div className="quiz-description flex flex-col space-y-4 p-4 w-1/2 border-r ">
          <h3 className="font-semibold text-2xl px-2">
            Quiz 0. {this.state.quiz.name}
          </h3>
          <hr />
          <p>{this.state.quiz.description}</p>
          <hr />
          <p>
            Author - {""}
            <span className="font-semibold">{this.state.quiz.author.name}</span>
          </p>
        </div>
      );
    } else {
      return (
        <div className="quiz-description flex flex-col space-y-4 p-4 w-1/2 border-r ">
          <Feedback
            feedback={this.state.feedback}
            quiz={this.state.quiz}
            answers={this.state.answers}
          />
        </div>
      );
    }
  };
  /**
   * Renders content to the user based on the current slide count
   */
  renderSlide = () => {
    if (this.state.currentSlide === 0) {
      return (
        <div className="quiz-data flex items-center">
          <div className="flex items-center flex-col space-y-2 px-8">
            <h2 className="font-semibold text-2xl">Are you ready?</h2>
            <p className="">
              Ensure you are appropriately prepared for the questions that are
              about to unfold and remember. The questions could be about
              anything. By anyone so dont think too hard on failure or too
              highly on success. Just have fun and dont forget the smell of the
              game.
            </p>
            <div
              onClick={() => {
                updateQuiz(this.state.quiz.name, { incrementAttempts: true });
                this.loadNextSlide();
              }}
            >
              <Button>Begin!</Button>
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
        <div className="quiz-data flex items-center">
          <div className="flex flex-col space-y-2 px-8 w-full">
            <Question
              question={this.state.quiz.questions[index]}
              index={index}
              loadNextSlide={this.loadNextSlide}
              loadPreviousSlide={this.loadPreviousSlide}
              saveAnswer={this.saveAnswer}
            />
          </div>
        </div>
      );
    } else {
      return (
        <div className="quiz-data flex flex-col items-center space-y-2">
          <div className="flex items-center px-8">
            You did it you completed the quiz great job! Check out the results
            tab to see how you scored and what you missed. There is always more
            to learn so feel free to move on to the next challenge
          </div>
          <div
            onClick={() => {
              if (this.state.testCompleted) {
                this.setState({ currentTab: 1 });
              }
            }}
          >
            <Button>View Results</Button>
          </div>
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
    this.setState(
      {
        answers: answers,
        testCompleted: answers.length === this.state.quiz.questions.length,
      },
      () => {
        if (this.state.testCompleted) {
          this.calculateFeedBack();
        }
        this.loadNextSlide();
      }
    );
  };
  /**
   * Generates the users feedback based on the quiz and answer data
   */
  calculateFeedBack = () => {
    const quiz = this.state.quiz;
    const feedback = [{}]; //The feedback on a per question basis
    var correctAnswers = 0;
    //Calculate the amount of answers the user got correct
    for (var x = 0; x < quiz.questions.length; x++) {
      for (var y = 0; y < quiz.questions[x].options.length; y++) {
        if (quiz.questions[x].options[y].isAnswer === true) {
          if (this.state.answers[x] === y) {
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
    //Update the sucess rate
    if (correctAnswers === quiz.questions.length) {
      updateQuiz(quiz.name, { incrementPerfects: true });
    }
    feedback.correctAnswers = correctAnswers;
    this.setState({ feedback: feedback }, () => {
      this.createSubmission();
    });
  };
  /**
   * Creates a new submission based on the feedback and sends it to the database
   */
  createSubmission = async () => {
    var submission = {
      quizId: this.state.quiz._id,
      correct: this.state.feedback.correctAnswers,
      wrong:
        this.state.feedback.correctAnswers - this.state.quiz.questions.length,
    };
    createSubmission(submission);
  };
  /**
   * Gets the styling for the tab component
   * @param {Number} activeIndex
   * @param {Boolean} disabled
   * @returns
   */
  getTabStyling = (activeIndex, disabled = false) => {
    if (disabled) {
      return "bg-gray-200 h-full py-3 px-2 text-gray-300 border-r border-gray-300 cursor-not-allowed";
    }
    if (this.state.currentTab === activeIndex) {
      return "bg-white h-full py-3 px-2 text-gray-700 border-r border-gray-300 cursor-pointer";
    } else {
      return "bg-gray-200 h-full py-3 px-2 text-gray-700 border-r border-gray-300 cursor-pointer";
    }
  };
  render() {
    if (!this.state.quiz) {
      return <Loader />;
    }
    return (
      <div className="quiz-show h-full">
        <div className="border-b">
          <div className="flex text-white items-center bg-gray-200 text-sm">
            <div
              className={this.getTabStyling(0)}
              onClick={() => {
                this.setState({ currentTab: 0 });
              }}
            >
              Description
            </div>
            <div
              className={this.getTabStyling(
                1,
                this.state.testCompleted === false
              )}
              onClick={() => {
                if (this.state.testCompleted) {
                  this.setState({ currentTab: 1 });
                }
              }}
            >
              Results
            </div>
          </div>
        </div>
        <div className="flex h-full container">
          {this.renderTabContent()}
          <div className="slide content flex flex-col justify-center space-y-4 p-4  w-1/2 px-2 border-l">
            {this.renderSlide()}
          </div>
        </div>
      </div>
    );
  }
}
export default QuizShow;
