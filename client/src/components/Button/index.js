import React from "react";
/**
 * A generic button used throughout the application
 */
const Button = ({ extraStyle, children }) => {
  return (
    <button className={`px-2 py-1 font-semibold rounded ${extraStyle}`}>
      {children}
    </button>
  );
};
Button.defaultProps = {
  extraStyle: "bg-primary text-white",
};
export default Button;
