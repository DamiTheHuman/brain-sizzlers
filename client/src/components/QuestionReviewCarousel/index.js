import React from "react";
import AwesomeSlider from "react-awesome-slider";
import "react-awesome-slider/dist/styles.css";

const QuestionReviewCarousel = ({ questions }) => {
  /**
   * Renders the questions cor detail
   */
  const renderContent = questions.map((question, key) => {
    /**
     * Renders the option  a quiz has
     */
    const renderOptions = question.options.map((option, optionKey) => {
      return (
        <tr className="quiz-option bg-gray-200" key={optionKey}>
          <td>{optionKey + 1}</td>
          <td>{option.option}</td>
          <td>{option.isAnswer ? "IsAnswer" : "Not Answer"}</td>
        </tr>
      );
    });
    return (
      <div className="bg-white w-full h-full border px-16 py-4" key={key}>
        <h3 className="text-center font-semibold text-xl">
          Question {key + 1}
        </h3>
        <h2 className="font-semibold text-lg">{question.description}</h2>
        <div className="flex items-center">
          <div className="flex-grow flex flex-col border">
            <table className="w-full border p-2">
              <thead>
                <tr className="bg-white">
                  <th className="text-center px-2">#</th>
                  <th className="text-left">Question</th>
                  <th className="text-left">Answer</th>
                </tr>
              </thead>
              <tbody>{renderOptions}</tbody>
            </table>
          </div>
        </div>
        <p className="mt-4">
          Please esnure to set appropriate questions for all ages and supply
          valid answers for your quizzes as integrity is all up to you.
        </p>
      </div>
    );
  });

  return <AwesomeSlider bullets={false}>{renderContent}</AwesomeSlider>;
};
export default QuestionReviewCarousel;
