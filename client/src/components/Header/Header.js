import React from "react";
import HeaderLink from "./HeaderLink";
import HeaderLogo from "../../assets/logo_no_text_inverted.png";
class Header extends React.Component {
  render() {
    return (
      <header className="bg-white text-black h-16 relative border-b border-gray-200">
        <div className="flex justify-between items-center h-full font-bold">
          <HeaderLink>
            <img src={HeaderLogo} className="w-7" />
          </HeaderLink>
          <div className="flex relative h-full items-center">
            <HeaderLink>Home</HeaderLink>
            <HeaderLink>About</HeaderLink>
            <HeaderLink>Login</HeaderLink>
            <HeaderLink>Sign-Up</HeaderLink>
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
