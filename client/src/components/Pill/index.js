import React from "react";

/**
 * Renders a pill component with the specified text
 * @returns
 */
const Pill = ({ children }) => {
  return (
    <div className="pill bg-gray-700 font-bold text-white rounded-full px-2 py-1 text-center">
      {children}
    </div>
  );
};
export default Pill;
