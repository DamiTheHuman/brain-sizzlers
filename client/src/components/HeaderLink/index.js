import React from "react";
import { Link } from "react-router-dom";
/**
 * Renders the Header links for the project
 * @param {*} param0
 * @returns
 */
const HeaderLink = ({ to, children }) => {
  return (
    <div className="header-link px-2 hover:text-primary  h-full flex items-center">
      <Link to={to}>{children}</Link>
    </div>
  );
};
HeaderLink.defaultProps = {
  to: "/",
};
export default HeaderLink;
