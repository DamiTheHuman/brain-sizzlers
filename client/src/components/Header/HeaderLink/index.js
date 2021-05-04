import React from "react";
/**
 * Renders the Header links for the project
 * @param {*} param0
 * @returns
 */
const HeaderLink = ({ to, children }) => {
  return (
    <div className="header-link px-2 hover:bg-primary hover:text-white h-full flex items-center">
      <a href={to}>{children}</a>
    </div>
  );
};
HeaderLink.prototype = {
  to: "/#",
};
export default HeaderLink;
