import React from "react";
import Modal from "../Modal";
import { connect } from "react-redux";
import {
  fetchSession,
  fetchQuiz,
  updateQuiz,
  createSubmission,
  updateUser
} from "../../actions/index";
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
    showDescription: false
  };
  componentDidMount() {
    this.fetchQuiz();
    this.props.fetchSession();
  }
  componentDidUpdate() {
    //Updates the quiz when the user selects a different quiz
    if (this.state.user) {
      if (this.state.quiz.name !== this.props.match.params.name) {
        this.fetchUserData();
      }
    }
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
      testCompleted: false
    });
  };
  /**
   * Renders content based on the currently selected tab
   */
  renderTabContent = () => {
    if (this.state.currentTab === 0) {
      return (
        <React.Fragment>
          <h3 className="font-semibold text-2xl px-2">
            Quiz 0. {this.state.quiz.name}
          </h3>

          <hr />
          <div
            className="self-center block md:hidden"
            onClick={() => {
              this.setShowDescription(true);
            }}
          >
            <Button>Show Description</Button>
          </div>
          {/**Renders question always on larger screens */}
          <div className="hidden md:block">
            <p>{this.state.quiz.description}</p>
            <hr />
            <p>
              Author - {""}
              <span className="font-semibold">
                {this.state.quiz.author.name}
              </span>
            </p>
          </div>
        </React.Fragment>
      );
    } else {
      return (
        <React.Fragment>
          <Feedback
            feedback={this.state.feedback}
            quiz={this.state.quiz}
            answers={this.state.answers}
          />
        </React.Fragment>
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
            <p>
              Ensure you are appropriately prepared for the questions that are
              about to unfold and remember. The questions could be about
              anything. By anyone so dont think too hard on failure or too
              highly on success. Just have fun and dont forget the smell of the
              game.
            </p>
            <div
              onClick={() => {
                const attempts = this.state.quiz.attempts + 1;
                updateQuiz(this.state.quiz.name, { attempts: attempts });
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
    } else if (this.state.currentTab !== 1) {
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
        testCompleted: answers.length === this.state.quiz.questions.length
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
              gotCorrect: true
            };
            correctAnswers++;
            break;
          }
          feedback[x] = {
            question: quiz.questions[x].description,
            correctOption: quiz.questions[x].options[y],
            gotCorrect: false
          };
          break;
        }
      }
    }
    //Update the sucess rate
    if (correctAnswers === quiz.questions.length) {
      const perfects = this.state.quiz.perfects + 1;
      updateQuiz(quiz.name, { perfects: perfects });
    }
    //Update the users points
    updateUser(this.props.user, {
      points: this.props.user.points + correctAnswers * 100
    });
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
        this.state.feedback.correctAnswers - this.state.quiz.questions.length
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
  /**
   * Sets the value for show description where needed
   * @param {Boolean} value the new value for show description
   */
  setShowDescription = value => {
    this.setState({ showDescription: value });
  };
  /**
   * Renders modal with JSX data on smaller screens
   */
  renderModal = () => {
    if (this.state.showDescription) {
      return (
        <Modal
          title={<h2 className="text-2xl font-bold">Quiz Description</h2>}
          content={
            <div className="flex items-center flex-col space-y-2 px-4">
              <div className="h-64 overflow-scroll border rounded p-2 border-black">
                <p>{this.state.quiz.description}</p>
              </div>
              <hr />
              <p>
                Author - {""}
                <span className="font-semibold">
                  {this.state.quiz.author.name}
                </span>
              </p>
            </div>
          }
          actions={
            <div className="flex space-x-2 items-center justify-center">
              <div
                onClick={() => {
                  this.setShowDescription(false);
                }}
              >
                <Button extraStyle="bg-danger py-2 text-secondary text-lg">
                  Dismiss
                </Button>
              </div>
            </div>
          }
          onDismiss={() => {
            this.setShowDescription(false);
          }}
        />
      );
    }
    return null;
  };
  render() {
    if (!this.state.quiz) {
      return <Loader />;
    }
    return (
      <div className="quiz-show h-full">
        {this.renderModal()}
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
        <div className="flex flex-col md:flex-row h-full container">
          <div className="quiz-description flex flex-col space-y-4 p-4 md:w-1/2 w-full md:border-r border-0">
            {this.renderTabContent()}
          </div>
          <div className="slide content flex flex-col justify-center space-y-4 p-4  md:w-1/2 w-full px-2 md:border-l border-0">
            {this.renderSlide()}
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return { user: state.users };
};
export default connect(mapStateToProps, {
  fetchSession
})(QuizShow);
