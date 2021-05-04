import React from "react";
/**
 * Displays general error messages for the applicatino
 */
const ErrorMessage = ({ message }) => {
  if (!message) {
    return null;
  }
  return <div className="error-message text-red-900">{message}</div>;
};
export default ErrorMessage;
