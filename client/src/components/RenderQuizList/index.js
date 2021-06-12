import React from "react";
import Loader from "../Loader";
import LockIcon from "mdi-react/LockIcon";
import { connect } from "react-redux";
import { fetchSubmissions, fetchSession } from "../../actions";
import { formatDateToMMDDYY } from "../../api/general";
import { Link } from "react-router-dom";
import Pill from "../Pill";
/**
 * Generic rendering for a list of quizzes
 */
class RenderQuizList extends React.Component {
  componentDidMount() {
    this.fetchUserSubmissions();
  }
  /**
   * Fetches the current users submissions
   */
  fetchUserSubmissions = async () => {
    if (!this.props.user) {
      await this.props.fetchSession();
      if (this.props.user) {
        const query = {
          find: { user: this.props.user._id },
          limit: 10,
          sort: "desc"
        };
        await this.props.fetchSubmissions(query);
      }
    }
  };
  /**
   * Calculates the difficulty of a quiz based on its sucess
   * @param {*} quiz the quiz to get the difficulty from
   */
  getQuizDifficulty = quiz => {
    const range = (quiz.perfects / quiz.attempts) * 100;

    if (range >= 75 || quiz.attempts === 0) {
      return <p className="text-success">Easy</p>;
    } else if (range < 75 && range >= 25) {
      return <p className="text-warning">Medium</p>;
    } else {
      return <p className="text-danger">Hard</p>;
    }
  };
  /**
   * Render the quiz data providing a link if the user has never taken the quiz before and lock if they have
   * @param {Boolean} taken whether the user has taken the qui before
   * @param {Object} quiz the quiz data to render
   * @param {JSX} children the child content to render
   * @returns
   */
  renderQuizData = (taken = false, quiz, children) => {
    if (taken) {
      return (
        <div
          className="quiz-item flex bg-gray-100 border lg:px-8 items-center 
      transition relative duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-xl"
        >
          {children}
          <div className="flex space-x-2 absolute center w-full items-center opacity-75 px-16">
            <div className="h-0.5 bg-black flex-grow" />
            <LockIcon size="64" color="red" />
            <div className="h-0.5 bg-black flex-grow" />
          </div>
        </div>
      );
    } else {
      return (
        <Link
          to={`/quizzes/${quiz.name}`}
          className="quiz-item flex bg-gray-100 border lg:px-8 items-center 
      transition duration-500 ease-in-out transform hover:-translate-y-1 hover:scale-105 hover:shadow-xl"
        >
          {children}
        </Link>
      );
    }
  };
  /**
   * Renders a list of quizzes for the user to select from
   */
  renderQuizList = () => {
    return this.props.quizzes.map((quiz, index) => {
      var taken = false; //Checks if the user has taken the quiz already
      for (var x = 0; x < this.props.submissions.length; x++) {
        if (this.props.submissions[x].quiz._id === quiz._id) {
          taken = true;
          break;
        }
      }

      const content = (
        <React.Fragment>
          <div className="border-r border-gray-400 py-8 lg:px-4 px-2">
            <div className="lg:text-xl text-base font-bold truncate">
              No {index}.
            </div>
          </div>
          <div className="flex flex-grow space-x-2 py-8 lg:px-4 px-2 items-center">
            <div className="flex flex-col space-y-2 flex-grow">
              <h4 className="lg:text-lg text-sm font-semibold one-line-overflow">
                {quiz.name}
              </h4>
              <div className="">
                <p className="two-line-overflow">{quiz.description}</p>
              </div>
            </div>
            <div className="flex-grow-0 flex flex-col space-y-2 lg:text-lg text-sm">
              <p className="text-xs lg:text-base truncate italic">
                {quiz.author.name}
              </p>
              <Pill>{this.getQuizDifficulty(quiz)}</Pill>
            </div>
          </div>
          <div className="hidden md:block  text-xs text-gray-400 py-8 xl:px-4 px-2 text-right">
            <p className="truncate">
              Created {formatDateToMMDDYY(quiz.createdAt)}
            </p>
            <p className="truncate">Attempted {quiz.attempts} Time(s)</p>
            <p className="truncate">Perfected {quiz.perfects} Time(s)</p>
          </div>
        </React.Fragment>
      );

      return (
        <React.Fragment key={index}>
          {this.renderQuizData(taken, quiz, content)}
        </React.Fragment>
      );
    });
  };

  render() {
    if (!this.props.quizzes) {
      return <Loader size={48} />;
    } else if (this.props.quizzes.length === 0) {
      return (
        <h3 className="text-xl text-center font-bold">No Quizzes Found</h3>
      );
    }
    return (
      <div className="flex flex-col space-y-8 max-w-full">
        {this.renderQuizList()}
      </div>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user, submissions: state.submissions };
};
export default connect(mapStateToProps, {
  fetchSession,
  fetchSubmissions
})(RenderQuizList);
