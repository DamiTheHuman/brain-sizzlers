import React from "react";
import ErrorMessage from "../ErrorMessage";

const Option = ({
  index,
  value,
  onDescriptionChange,
  onIsAnswerChange,
  questionId,
  errorMessage,
}) => {
  /**
   * Renders an error message if the input field is null
   * @returns {JSX}
   */
  const renderErrorMessage = () => {
    return <ErrorMessage message={errorMessage} />;
  };

  return (
    <React.Fragment>
      {renderErrorMessage()}
      <div className="flex space-x-2 w-full items-center" key={index}>
        <input
          type="text"
          placeholder={`Option ${index + 1}`}
          name={`question-${questionId}-option-${index + 1}`}
          value={value.option}
          className="flex-grow border"
          onChange={onDescriptionChange}
        />
        <input
          type="checkbox"
          className="pl-8"
          checked={value.isAnswer}
          onChange={onIsAnswerChange}
        />
      </div>
    </React.Fragment>
  );
};
export default Option;
