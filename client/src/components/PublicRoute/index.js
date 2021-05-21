import React from "react";
import { Route } from "react-router-dom";

/**
 * Used to define routes that are public to all users
 */
class PublicRoute extends React.Component {
  render() {
    return (
      <Route
        path={this.props.path}
        component={this.props.component}
        exact={this.props.exact}
      />
    );
  }
}
export default PublicRoute;
