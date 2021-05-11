import React from "react";
import { connect } from "react-redux";
import { Switch, Route, Redirect } from "react-router-dom";
import { fetchUser } from "../../actions";
import QuizList from "../Quizzes/QuizList";
import QuizCreate from "../Quizzes/QuizCreate";
import QuizShow from "../Quizzes/QuizShow";
/**
 * Checks if the user is authenticated before logging them in
 */
class PrivateRoute extends React.Component {
  componentDidMount() {
    this.props.fetchUser(); //Check if the user is authenticate
  }
  render() {
    const testing = false;
    //user is not logged in
    if (!this.props.users && testing === false) {
      return <Redirect to="/" />;
    } else {
      return (
        <Switch>
          <Route path="/quiz/all" component={QuizList} exact />
          <Route path="/quiz/new" component={QuizCreate} exact />
          <Route path="/quiz/:name" component={QuizShow} exact />
        </Switch>
      );
    }
  }
}

const mapStateToProps = (state) => {
  return { users: state.users };
};
export default connect(mapStateToProps, { fetchUser })(PrivateRoute);
