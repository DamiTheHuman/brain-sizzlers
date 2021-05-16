import React from "react";
import { Switch, Route } from "react-router-dom";
import Home from "../Home";
import UsersShow from "../Users/UsersShow";

/**
 * Public routes visisble to all users
 */
class PublcRoute extends React.Component {
  render() {
    return (
      <Switch>
        <Route path="/" component={Home} exact />
        <Route path="/users/:name" component={UsersShow} exact />
      </Switch>
    );
  }
}
export default PublcRoute;
