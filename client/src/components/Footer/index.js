import React from "react";

const Footer = () => {
  const currentDate = new Date().getFullYear();
  return (
    <footer className="flex-shrink-0 bg-black shadow-lg text-white min-w-full">
      {/* Copyright*/}
      <p className="text-center py-8 text-base">
        &copy; Copyright {currentDate}, Headless Coder
      </p>
    </footer>
  );
};
export default Footer;
