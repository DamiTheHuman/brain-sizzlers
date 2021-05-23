import * as React from "react";
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import HeaderLink from "./index";
const renderTest = () => {
  return render(
    <BrowserRouter>
      <HeaderLink to="/about">About</HeaderLink>
    </BrowserRouter>
  );
};
/**
 * Renders the header link and validates its content
 */
test("Render Header Link", () => {
  const { queryByText } = renderTest();
  expect(queryByText("About")).not.toBeNull(); //the about title text
});
/**
 * Test checks if the user is redirected when a header link is clicked
 */
test("Test Link Redirection on Click", () => {
  const { queryByText } = renderTest();
  expect(window.location.pathname === "/").toBeTruthy();
  fireEvent.click(queryByText("About"));
  expect(window.location.pathname === "/about").toBeTruthy(); //Check if redirected on click
});
