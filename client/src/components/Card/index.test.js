import * as React from "react";
import * as ReactDOM from "react-dom";
import { getQueriesForElement } from "@testing-library/dom";
import Card from "./index";

const render = (component) => {
  const root = document.createElement("div");
  ReactDOM.render(component, root);
  return getQueriesForElement(root);
};
/**
 * Tests if cards created with a header display the proper content
 */
test("Render Card with Header", () => {
  const { queryByText, queryAllByText } = render(
    <Card header="title" body={<p>Content</p>} />
  );
  expect(queryByText("title")).not.toBeNull(); //title should be found
  expect(queryAllByText("content")).not.toBeNull();
});
/**
 * Checks if cards created without the header render the appropriate content
 */
test("Render Card without Header", () => {
  const { queryByText, queryAllByText } = render(
    <Card body={<p>Content</p>} />
  );
  expect(queryByText("title")).toBeNull(); //no title
  expect(queryAllByText("content")).not.toBeNull();
});
