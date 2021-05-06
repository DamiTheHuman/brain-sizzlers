import React from "react";
import Option from "./Option";
import Button from "../Button";

class Question extends React.Component {
  state = { answer: 0 };
  reset = () => {
    this.setState({ answer: 0 });
  };
  /**
   * Renders data from a question whos property has been passed here
   * @returns {JSX}
   */
  renderQuestion = () => {
    const question = this.props.question;
    /*displays the question options*/
    const renderOptions = question.options.map((option, index) => {
      return (
        <Option
          key={index}
          index={index}
          option={option.option}
          answer={this.state.answer}
          onChange={(index) => {
            this.setState({ answer: index });
          }}
        />
      );
    });
    return (
      <div>
        <p> {question.description}</p>
        <div className="flex flex-col">
          <div className="flex flex-col">{renderOptions}</div>
          <div className="flex space-x-2">
            <div
              onClick={() => {
                this.props.saveAnswer(this.state.answer, this.props.index);
                this.reset();
              }}
            >
              <Button>Next</Button>
            </div>
          </div>
        </div>
      </div>
    );
  };
  render() {
    return (
      <div>
        Question {this.props.index + 1}
        <div>{this.renderQuestion()}</div>
      </div>
    );
  }
}

export default Question;
