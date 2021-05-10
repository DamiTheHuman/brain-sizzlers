import React from "react";
import _ from "lodash";
import { Redirect } from "react-router-dom";
import { createQuiz } from "../../actions/index";
import ErrorMessage from "../ErrorMessage";
import NewQuestion from "../NewQuestion";
import Button from "../Button";
/**
 * Manages the display of slides through the process of creating a quiz
 */
class QuizCreate extends React.Component {
  state = {
    name: "",
    description: "",
    questions: [],
    timesCompleted: 0,
    attempts: 0,
    questionCount: 3,
    currentSlide: 0,
    errorMessages: {},
  };
  /**
   * Loads the appropriate slide based on how far the user has gone in the creation process
   * @returns {JSX}
   */
  loadSlide = () => {
    if (this.state.currentSlide === 0) {
      return (
        <React.Fragment>
          <ErrorMessage message={this.state.errorMessages.quizName} />
          <label htmlFor="name">Quiz Name</label>
          <input
            type="text"
            placeholder="This quiz is called..."
            name="name"
            value={this.state.name}
            className="border"
            onChange={(e) => {
              this.setState({ name: e.target.value });
            }}
          />
          <ErrorMessage message={this.state.errorMessages.quizDescription} />
          <label htmlFor="description">Quiz Description</label>
          <textarea
            placeholder="This quiz is about...."
            name="description"
            value={this.state.description}
            className="border"
            onChange={(e) => {
              this.setState({ description: e.target.value });
            }}
          />
          <label htmlFor="questionCount">Choose the amount of questions</label>
          <select
            name="questionCount"
            className="border"
            value={this.state.questionCount}
            onChange={(e) => {
              this.setState({ questionCount: parseInt(e.target.value) });
            }}
          >
            <option value="3">3</option>
            <option value="4">4</option>
            <option value="5">5</option>
          </select>
          <div className="self-center flex space-x-2">
            <div
              onClick={() => {
                if (this.validateQuizData()) {
                  this.cleanUpData();
                  this.loadNextSlide();
                }
              }}
            >
              <Button>Next</Button>
            </div>
          </div>
        </React.Fragment>
      );
    } else if (this.state.currentSlide < this.state.questionCount + 1) {
      return (
        <NewQuestion
          questionId={this.state.currentSlide}
          questions={this.state.questions}
          addQuestion={this.addQuestion}
          loadNextSlide={this.loadNextSlide}
          loadPreviousSlide={this.loadPreviousSlide}
        />
      );
    } else {
      return (
        <div>
          <h2>Your Quiz is ready to go!</h2>
          <p>Name : {this.state.name}</p>
          <p>Description: {this.state.description}</p>
          <p>Question Count: {this.state.questions.length}</p>
          {/*TODO - Slider or carousel to render all questions*/}
          <div></div>
          <button className="bg-green-900 border" onClick={this.submitQuiz}>
            Submit
          </button>
        </div>
      );
    }
  };
  /**
   * Validates the quiz data
   * @returns {Boolean}
   */
  validateQuizData = () => {
    var errorCount = 0;
    var errorMessages = {};
    if (!this.state.name) {
      errorMessages.quizName = "Please provide a name for the quiz";
      errorCount++;
    }
    if (!this.state.description) {
      errorMessages.quizDescription =
        "Please provide a description for the quiz";
      errorCount++;
    }
    this.setState({
      errorMessages: errorMessages,
    });
    return errorCount === 0;
  };
  /**
   * Stores the data of a question
   * @param {Question} question
   */
  addQuestion = (question) => {
    var targetQuestion = this.state.questions;
    targetQuestion[this.state.currentSlide - 1] = question;
    this.setState({
      questions: targetQuestion,
    });
  };
  /**
   * Load the next slide within the range of the question count
   */
  loadNextSlide = () => {
    if (this.state.currentSlide + 1 > this.state.questionCount + 1) {
      console.log("Cannot exceed slide count");
      return;
    }
    this.setState({ currentSlide: this.state.currentSlide + 1 });
  };
  /**
   * Load the next slide within the range of the question count
   */
  loadPreviousSlide = () => {
    if (this.state.currentSlide - 1 < 0) {
      console.log("Cannot exceed slide count");
      return;
    }
    this.setState({ currentSlide: this.state.currentSlide - 1 });
  };
  /**
   * Performs trimming of the the quiz data
   */
  cleanUpData = () => {
    this.setState({
      name: this.state.name.trim(),
      description: this.state.description.trim(),
    });
  };
  /**
   * Submits and saves the quiz
   */
  submitQuiz = () => {
    const quizData = _.pick(this.state, [
      "name",
      "description",
      "questions",
      "difficulty",
      "timesCompleted",
      "attempts",
    ]);
    //Reformat to name,desc,difficultu,timecomp and attempts to top layer
    //while questions is at bottoom
    createQuiz(quizData);
    return <Redirect to="/" />;
  };
  /**
   * Gets the current step the user is currently on
   * @returns {Number} the current step
   */
  getStepId = () => {
    //1 - Creation step | 2 - questions step | 3 - summary step
    if (this.state.currentSlide === 0) {
      return 1;
    } else if (this.state.currentSlide < 1 + this.state.questionCount) {
      return 2;
    } else {
      return 3;
    }
  };
  /**
   * Gets the styling for the individual steps based on the current slide
   * @param {*} index the index of fthe tab
   * @returns {String} containing the classes to display when valid
   */
  getStepStyling = (index) => {
    const stepId = this.getStepId();
    if (stepId >= index) {
      return "bg-primary text-white py-1 px-2 rounded";
    }
    return "bg-white text-primary py-1 px-2 rounded border border-primary";
  };
  /**
   * Gets the styling for the beam that displays data
   * @param {*} index the index of fthe beam
   * @returns {String} containing the classes to display when valid
   */
  getStepBeamColor = (index) => {
    const stepId = this.getStepId();
    if (stepId >= index) {
      return "font-semibold bg-primary h-1 flex-grow";
    }
    return "font-semibold bg-black h-1 flex-grow";
  };
  /**
   * Gets the helper text for the set step
   * @returns {String} the helper text for the step
   */
  getStepHelperText = () => {
    const stepId = this.getStepId();
    if (stepId === 1) {
      return "What kind of quiz are your creating?";
    } else if (stepId === 2) {
      return "Please set appropriate Question details";
    } else if (stepId === 3) {
      return "Almost done! Submit the form when ready";
    }
  };

  render() {
    return (
      <div className="container py-4 text-lg">
        <h2 className="text-2xl font-semibold text-2xl">Create Quiz</h2>
        <div className="flex flex-col items-center space-y-2 w-full py-8 ">
          <div className="steps w-96">
            <div className="flex items-center justify-between">
              <p className={this.getStepStyling(1)}>1</p>
              <p className={this.getStepBeamColor(2)}></p>
              <p className={this.getStepStyling(2)}>2</p>
              <p className={this.getStepBeamColor(3)}></p>
              <p className={this.getStepStyling(3)}>3</p>
            </div>
          </div>

          <div className="flex flex-col space-y-2 border rounded border-2 border-gray-400 shadow-2xl p-8">
            <h2 className="text-xl font-bold text-center">
              {this.getStepHelperText()}
            </h2>
            <h3 className="text-lg font-semibold text-center text-gray-400">
              This is Step {this.getStepId()}.
            </h3>
            {this.loadSlide()}
          </div>
        </div>
      </div>
    );
  }
}
export default QuizCreate;
