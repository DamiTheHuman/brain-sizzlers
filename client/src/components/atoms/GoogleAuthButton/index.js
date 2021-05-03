import React from "react";
import GoogleLogin from "react-google-login";

const GoogleAuthButton = () => {
  /**
   * Handles the attempt by the user to login via the google auth button
   * @param {Object} googleData
   */
  const onSuccess = async (googleData) => {
    const res = await fetch("http://localhost:3000/api/v1/auth/google", {
      method: "POST",
      body: JSON.stringify({
        token: googleData.tokenId,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    });
    const user = await res.json();
  };

  const onFailure = (googleData) => {
    alert("login failed");
  };

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
