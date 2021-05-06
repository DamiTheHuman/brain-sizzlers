import React from "react";
/**
 * A generic button used throughout the application
 */
const Button = ({ children }) => {
  return (
    <button className="bg-primary px-2 py-1 font-semibold rounded text-white">
      {children}
    </button>
  );
};
export default Button;
