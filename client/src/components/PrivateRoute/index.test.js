import * as React from "react";
import { render, fireEvent } from "@testing-library/react";
import { BrowserRouter, Switch } from "react-router-dom";
import { Provider } from "react-redux";

import thunk from "redux-thunk";
import { createStore, applyMiddleware } from "redux";
import reducer from "../../reducers";
import PrivateRoute from "./index";
import HeaderLink from "../Header/HeaderLink";

const renderTest = () => {
  const store = createStore(reducer, applyMiddleware(thunk));
  return render(
    <Provider store={store}>
      <BrowserRouter>
        <HeaderLink to="/privateRoute">PrivateRoute</HeaderLink>
        <Switch>
          <PrivateRoute
            path="/privateRoute"
            component={() => {
              return <div>A Private Route</div>;
            }}
            exact
          />
        </Switch>
      </BrowserRouter>
    </Provider>
  );
};
/**
 * Ensures the user is redirected when not logged in
 */
test("Redirected when not logged in", () => {
  const { getByText } = renderTest();
  expect(window.location.pathname === "/").toBeTruthy();
  fireEvent.click(getByText("PrivateRoute"));
  expect(window.location.pathname === "/privateRoute").toBeTruthy(); //Check if redirected on click
});
