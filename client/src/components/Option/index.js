import React from "react";
/**
 * An option for a question being answered by a user
 */
const Option = ({ index, option, onChange, answer }) => {
  return (
    <div className="flex space-x-2 items-center">
      <input
        type="radio"
        id={`option-${index + 1}`}
        name="option"
        value={index}
        onChange={() => {
          onChange(index);
        }}
        checked={answer === index}
      />
      <label htmlFor={`option-${index + 1}`}>{option}</label>
    </div>
  );
};
export default Option;
