import React from "react";
import { connect } from "react-redux";
import { Route, Redirect } from "react-router-dom";
import { fetchSession } from "../../actions";
/**
 * Used to define routes that are private unless logged in
 */
class PrivateRoute extends React.Component {
  componentDidMount() {
    if (!this.props.user) {
      this.props.fetchSession(); //Check if the user is authenticated
    }
  }
  render() {
    //user is not logged in
    if (!this.props.user) {
      return (
        <Redirect
          to={{
            pathname: "/",
            state: {
              redirectMessage: `The page you are trying to access requires you to be logged in
            to view its content`
            }
          }}
        />
      );
    } else {
      return (
        <Route
          path={this.props.path}
          component={this.props.component}
          exact={this.props.exact}
        />
      );
    }
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};
export default connect(mapStateToProps, { fetchSession })(PrivateRoute);
