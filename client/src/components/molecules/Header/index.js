import React from "react";
import HeaderLink from "../../atoms/HeaderLink";
import HeaderLogo from "../../../assets/logo_no_text_inverted.png";
import GoogleAuthButton from "../../atoms/GoogleAuthButton";

class Header extends React.Component {
  render() {
    return (
      <header className="bg-white text-black h-16 relative border-b border-gray-200">
        <div className="flex justify-between items-center h-full font-bold">
          <HeaderLink>
            <img src={HeaderLogo} className="w-7" alt="logo" />
          </HeaderLink>
          <div className="flex relative h-full items-center px-2">
            <HeaderLink>Home</HeaderLink>
            <HeaderLink>About</HeaderLink>
            <GoogleAuthButton />
          </div>
        </div>
      </header>
    );
  }
}

export default Header;
