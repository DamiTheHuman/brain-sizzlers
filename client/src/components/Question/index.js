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
        <div className="flex flex-col space-y-2">
          <h3 className="font-semibold text-lg px-2 text-center">
            {question.description}
          </h3>
          <div className="flex flex-col space-y-2">{renderOptions}</div>
        </div>
      </div>
    );
  };
  render() {
    return (
      <React.Fragment>
        <h3 className="font-semibold text-2xl px-2 text-center">
          Question No. {this.props.index + 1}
        </h3>
        <hr />
        <div>{this.renderQuestion()}</div>
        <div
          className="self-center"
          onClick={() => {
            this.props.saveAnswer(this.state.answer, this.props.index);
            this.reset();
          }}
        >
          <Button>Next</Button>
        </div>
      </React.Fragment>
    );
  }
}

export default Question;
