import React from "react";
import { fetchQuizzes } from "../../actions/";
import { Link } from "react-router-dom";
import AlertCircleOutlineIcon from "mdi-react/AlertCircleOutlineIcon";
import Modal from "../Modal";
import Button from "../Button";
import RenderQuizList from "../RenderQuizList";
import LeaderBoards from "../Leaderboards";
import GoogleAuthButton from "../GoogleAuthButton";

class Home extends React.Component {
  state = { quizzes: null, renderRedirectMessage: false };
  componentDidMount() {
    if (this.props.location.state) {
      this.setState({
        renderRedirectMessage: this.props.location.state.invalidLoginRedirect,
      });
    }
    this.fetchQuizzes();
  }

  /**
   * Request all the quizzes from the database
   */
  fetchQuizzes = async () => {
    const quizzes = await fetchQuizzes({
      limit: 3,
      sort: "attempts",
      order: "desc",
    });
    this.setState({ quizzes: quizzes });
  };
  renderRedirect = () => {
    if (this.state.renderRedirectMessage) {
      return (
        <Modal
          title={
            <h2 className="text-2xl font-bold">You Received A Message!</h2>
          }
          content={
            <div className="flex flex-col space-y-2">
              <div className="self-center text-primary">
                <AlertCircleOutlineIcon size={36} />
              </div>
              <h3 className="text-center text-xl font-semibold">
                Something Went Wrong!
              </h3>
              <p>
                The page you are trying to access requires you to be logged in
                to view its content
              </p>
            </div>
          }
          actions={
            <div className="flex space-x-2 items-center justify-center">
              <GoogleAuthButton />
              <div
                onClick={() => {
                  this.setState({
                    renderRedirectMessage: false,
                  });
                }}
              >
                <Button extraStyle="bg-danger py-2 text-secondary text-lg">
                  Dismiss
                </Button>
              </div>
            </div>
          }
          onDismiss={() => {
            this.setState({
              renderRedirectMessage: false,
            });
          }}
        />
      );
    }
    return null;
  };

  render() {
    return (
      <div className="flex flex-col space-y-4">
        {this.renderRedirect()}
        <div className="bg-gray-700 py-32">
          <div className="container text-white flex flex-col items-center">
            <div className="w-2/5">
              <h1 className="text-6xl font-bold text-center">
                Brain Sizzlers!
              </h1>
              <div className="flex flex-col py-4">
                <p className="font-semibold text-xl mb-4">
                  Want to test your knoweledge on questions others have set on
                  the internet? You have to come to the right place! Try and
                  climb the leader boards with some sizzlers from across the
                  internet!
                </p>
                <div className="flex items-center justify-between">
                  <Link to="quizzes/new">
                    <Button extraStyle="bg-secondary text-black text-lg">
                      Create your challenge
                    </Button>
                  </Link>
                  <p className="font-semibold bg-secondary h-1 flex-grow"></p>
                  <p className="font-semibold bg-black h-1 flex-grow"></p>
                  <Link to="quizzes">
                    <Button extraStyle="bg-black text-secondary text-lg">
                      Test your knowledge
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="container">
          <h2 className="text-4xl text-center font-bold">Popular Quizzes</h2>
          {/* Load popular quizzes*/}
          <div className="py-8">
            <RenderQuizList quizzes={this.state.quizzes} />
          </div>
          <h2 className="text-4xl text-center font-bold">Leader Boards</h2>
          {/* Load popular quizzes*/}
          <div className="py-8">
            <LeaderBoards />
          </div>
        </div>
      </div>
    );
  }
}

export default Home;
