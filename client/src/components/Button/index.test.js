import * as React from "react";
import * as ReactDOM from "react-dom";
import { getQueriesForElement } from "@testing-library/dom";
import Button from "./index";

const render = (component) => {
  const root = document.createElement("div");
  ReactDOM.render(component, root);
  return getQueriesForElement(root);
};
/**
 * Tests if a button with know extra style displays the default styling
 */
test("Renders Primary Button", () => {
  const { getByText } = render(<Button>Primary Button</Button>);
  expect(getByText("Primary Button")).not.toBeNull();
  expect(getByText("Primary Button").classList.contains("bg-primary")).toBe(
    true
  );
});
/**
 * Tests  if a button with set extra styles overwrites the default and displays its own styling
 */
test("Renders Secondary Button", () => {
  const { getByText } = render(
    <Button extraStyle="bg-secondary">Secondary Button</Button>
  );
  expect(getByText("Secondary Button")).not.toBeNull();
  expect(getByText("Secondary Button").classList.contains("bg-secondary")).toBe(
    true
  );
});
