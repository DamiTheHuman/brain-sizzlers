import React from "react";
import GoogleLogin from "react-google-login";

const GoogleAuthButton = ({ onSuccess, onFailure }) => {
  return (
    <GoogleLogin
      clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
      buttonText="Log in with Google"
      onSuccess={onSuccess}
      onFailure={onFailure}
      cookiePolicy={"single_host_origin"}
    />
  );
};

export default GoogleAuthButton;
