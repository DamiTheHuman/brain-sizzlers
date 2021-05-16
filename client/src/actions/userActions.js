import { objectToGetRequest } from "../api/general";

/**
 * Fetches a list of users based on the query passed
 * @param {String} query the custom query to be run against the DB
 * @returns
 */
export const fetchUsers = async (query = {}) => {
  var getQuery = "";
  if (query) {
    getQuery = objectToGetRequest(query);
  }
  const request = await fetch(`http://localhost:3001/users${getQuery}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const response = await request.json();
  return response;
};
/**
 * Sends a request to the server to fetch quiz
 * @param {String} quizName the quiz to search for
 * @returns {Object} the response from the server
 */
export const fetchUser = async (quizName) => {
  if (!quizName) {
    return null;
  }
  const request = await fetch(`http://localhost:3001/users/${quizName}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const response = await request.json();
  return response.data;
};
