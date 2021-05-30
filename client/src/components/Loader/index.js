import React from "react";
import AutorenewIcon from "mdi-react/AutorenewIcon";
/**
 * A generic loader used throughout the application
 */
const Loader = ({ extraStyle, size }) => {
  return (
    <div className={`flex justify-center items-center ${extraStyle}`}>
      <AutorenewIcon className="animate-spin" size={size} />
    </div>
  );
};
Loader.defaultProps = {
  extraStyle: "",
  size: 24,
};
export default Loader;
