import * as React from "react";
import * as ReactDOM from "react-dom";
import { getQueriesForElement } from "@testing-library/dom";
import ErrorMessage from "./index";

const render = (component) => {
  const root = document.createElement("div");
  ReactDOM.render(component, root);
  return getQueriesForElement(root);
};
/**
 * Renders an error message with the specified text
 */
test("Render Error Message", () => {
  const { queryByText } = render(
    <ErrorMessage message="Please Input the correct data!" />
  );
  expect(queryByText("Please Input the correct data!")).not.toBeNull(); //the error text should be shown
});
