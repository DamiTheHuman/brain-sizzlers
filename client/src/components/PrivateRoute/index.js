import React from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { fetchSession } from "../../actions";
import QuizList from "../Quizzes/QuizList";
import QuizCreate from "../Quizzes/QuizCreate";
import QuizShow from "../Quizzes/QuizShow";
/**
 * Checks if the user is authenticated before logging them in
 */
class PrivateRoute extends React.Component {
  componentDidMount() {
    this.props.fetchSession(); //Check if the user is authenticate
  }
  render() {
    const testing = false;
    //user is not logged in
    if (!this.props.users && testing === false) {
      return <Redirect to="/" />;
    } else {
      return (
        <Switch>
          <Route path="/quizzes" component={QuizList} exact />
          <Route path="/quizzes/new" component={QuizCreate} exact />
          <Route path="/quizzes/:name" component={QuizShow} exact />
        </Switch>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return { users: state.users };
};
export default connect(mapStateToProps, { fetchSession })(PrivateRoute);
