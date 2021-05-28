import React from "react";
import AwesomeSlider from "react-awesome-slider";
import CloseCircleIcon from "mdi-react/CloseCircleIcon";
import CheckCircleIcon from "mdi-react/CheckCircleIcon";
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
          <td className="text-center">{optionKey + 1}</td>
          <td className="px-2 two-line-overflow">{option.option}</td>
          <td className="px-2">
            {option.isAnswer ? (
              <div className="flex justify-center text-success">
                <CheckCircleIcon size={24} />
              </div>
            ) : (
              <div className="flex justify-center text-danger">
                <CloseCircleIcon size={24} />
              </div>
            )}
          </td>
        </tr>
      );
    });
    return (
      <div
        className="bg-white w-full h-full border md:px-16 px-2 py-4"
        key={key}
      >
        <h3 className="text-center font-semibold text-xl">
          Question {key + 1}
        </h3>
        <h2 className="font-semibold text-lg">{question.description}</h2>
        <div className="flex items-center">
          <div className="flex-grow flex flex-col border">
            <table className="w-full border p-2">
              <thead>
                <tr className="bg-white">
                  <th className="italic text-center px-2">#</th>
                  <th className="italic text-left px-2">Question</th>
                  <th className="italic text-left px-2">Answer</th>
                </tr>
              </thead>
              <tbody>{renderOptions}</tbody>
            </table>
          </div>
        </div>
        <p className="mt-4">
          Please ensure to set appropriate questions for all ages and supply
          valid answers for your quizzes as integrity is all up to you.
        </p>
      </div>
    );
  });

  return <AwesomeSlider bullets={false}>{renderContent}</AwesomeSlider>;
};
export default QuestionReviewCarousel;
