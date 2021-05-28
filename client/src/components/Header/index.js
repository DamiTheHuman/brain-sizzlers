import React from "react";
import _ from "lodash";
import { connect } from "react-redux";
import { loginUser, logoutUser, fetchSession } from "../../actions";
import HeaderLink from "./HeaderLink";
import GoogleAuthButton from "../GoogleAuthButton";
import HeaderLogo from "../../assets/logo_no_text_inverted.png";
import { Link } from "react-router-dom";
import Loader from "../Loader";

class Header extends React.Component {
  componentDidMount() {
    this.props.fetchSession();
  }
  /**
   * Handles the attempt by the user to login via the google auth button
   * @param {Object} googleData
   */
  onSuccess = (googleData) => {
    this.props.loginUser(googleData);
  };

  onFailure = (err) => {
    alert("login failed");
  };
  /**
   * Renders the appropriate button action if the user is logged in
   * @returns object
   */
  renderLogin = () => {
    if (_.isEmpty(this.props.users)) {
      return <Loader />;
    }
    if (this.props.users) {
      return (
        <React.Fragment>
          <button
            className="font-bold h-full"
            onClick={() => {
              this.props.logoutUser();
            }}
          >
            <HeaderLink>Logout</HeaderLink>
          </button>
          <Link to={`/users/${this.props.users.name}`} className="p-4">
            <img
              src={this.props.users.picture}
              className="rounded-full w-12  border-gray-600 hover:border-primary border-2 p-0.5"
              alt={`${this.props.users.name}`}
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
            <HeaderLink to="/">About</HeaderLink>
            {this.renderLogin()}
          </div>
        </div>
      </header>
    );
  }
}

const mapStateToProps = (state) => {
  return { users: state.users };
};
export default connect(mapStateToProps, {
  loginUser,
  logoutUser,
  fetchSession,
})(Header);
