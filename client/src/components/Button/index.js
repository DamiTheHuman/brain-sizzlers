import React from "react";
/**
 * A generic button used throughout the application
 */
const Button = ({ style, children }) => {
  return (
    <button className={`px-2 py-1 font-semibold rounded  ${style}`}>
      {children}
    </button>
  );
};
Button.defaultProps = {
  style: "bg-primary text-white",
};
export default Button;
