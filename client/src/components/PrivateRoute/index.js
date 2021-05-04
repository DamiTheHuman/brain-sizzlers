import React from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { fetchUser } from "../../actions";
import SizzlersList from "../Quizzes/QuizList";
import SizzlersCreate from "../Quizzes/QuizCreate";
/**
 * Checks if the user is authenticated before logging them in
 */
class PrivateRoute extends React.Component {
  componentDidMount() {
    this.props.fetchUser(); //Check if the user is authenticated
  }
  render() {
    const testing = true;
    if (testing) {
      return (
        <Switch>
          <Route path="/quiz" component={SizzlersList} exact />
          <Route path="/quiz/new" component={SizzlersCreate} exact />
        </Switch>
      );
    }
    //user is not logged in
    if (!this.props.users) {
      return <Redirect to="/" />;
    } else {
      return (
        <Switch>
          <Route path="/quiz" component={SizzlersList} exact />
          <Route path="/quiz/new" component={SizzlersCreate} exact />
        </Switch>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return { users: state.users };
};
export default connect(mapStateToProps, { fetchUser })(PrivateRoute);
