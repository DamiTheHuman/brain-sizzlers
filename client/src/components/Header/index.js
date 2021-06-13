import React from "react";
import { connect } from "react-redux";
import {
  loginUser,
  logoutUser,
  fetchSession,
  fetchSubmissions
} from "../../actions";
import HeaderLink from "../HeaderLink";
import GoogleAuthButton from "../GoogleAuthButton";
import HeaderLogo from "../../assets/logo_no_text_inverted.png";
import { Link } from "react-router-dom";
import Loader from "../Loader";

class Header extends React.Component {
  componentDidMount() {
    this.fetchUserSubmissions();
  }
  /**
   * Fetches the current users submissions
   */
  fetchUserSubmissions = async () => {
    await this.props.fetchSession();
    if (this.props.user) {
      const query = {
        find: { user: this.props.user._id },
        limit: 10,
        sort: "desc"
      };
      await this.props.fetchSubmissions(query);
    }
  };
  /**
   * Handles the attempt by the user to login via the google auth button
   * @param {Object} googleData
   */
  onSuccess = async googleData => {
    await this.props.loginUser(googleData);
    window.location.reload();
  };
  /**
   * Handles the event when an error occurs
   * @param {String} err
   */
  onFailure = err => {
    console.error(err.details);
  };
  /**
   * Renders the appropriate button action if the user is logged in
   * @returns object
   */
  renderLogin = () => {
    if (JSON.stringify(this.props.user) === "{}") {
      return <Loader />;
    }
    if (this.props.user) {
      return (
        <React.Fragment>
          <button
            className="font-bold h-full"
            onClick={async () => {
              this.props.logoutUser();
              window.location.reload();
            }}
          >
            <HeaderLink>Logout</HeaderLink>
          </button>
          <Link to={`/users/${this.props.user.name}`} className="p-4">
            <img
              src={this.props.user.picture}
              className="rounded-full w-12  border-gray-600 hover:border-primary border-2 p-0.5"
              alt={`${this.props.user.name}`}
            />
          </Link>
        </React.Fragment>
      );
    } else {
      return (
        <GoogleAuthButton
          onSuccess={this.onSuccess}
          onFailure={this.onFailure}
        />
      );
    }
  };
  render() {
    return (
      <header className="bg-white text-black h-16 relative border-b border-gray-200">
        <div className="flex justify-between items-center h-full font-bold">
          <HeaderLink to="/">
            <img src={HeaderLogo} className="w-7" alt="logo" />
          </HeaderLink>
          <div className="flex relative h-full items-center px-2">
            <HeaderLink to="/">Home</HeaderLink>
            <div className="px-2 h-full flex items-center">
              {this.renderLogin()}
            </div>
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = state => {
  return { user: state.user };
};
export default connect(mapStateToProps, {
  loginUser,
  logoutUser,
  fetchSession,
  fetchSubmissions
})(Header);
