import { LOGIN_USER, LOGOUT_USER, FETCH_USER } from "./types";
import { objectToGetRequest } from "../api/general";
/**
 * Fetch the current logged in user
 * @returns void
 */
export const fetchUser = () => async (dispatch) => {
  const request = await fetch("http://localhost:3001/users", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const response = await request.json();
  dispatch({
    type: FETCH_USER,
    payload: response.data,
  });
};
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
  const request = await fetch(`http://localhost:3001/users/all${getQuery}`, {
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
 * Login a user authenticated by google oAuth2
 * @param {Object} googleData
 * @returns void
 */
export const loginUser = (googleData) => async (dispatch) => {
  const request = await fetch("http://localhost:3001/users", {
    method: "POST",
    body: JSON.stringify({
      token: googleData.tokenId,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const response = await request.json();
  console.log(response);
  dispatch({
    type: LOGIN_USER,
    payload: response.data,
  });
};
/**
 * Logout an already authenticated user
 * @returns void
 */
export const logoutUser = () => async (dispatch) => {
  await fetch("http://localhost:3001/users", {
    method: "DELETE",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  dispatch({
    type: LOGOUT_USER,
    payload: null,
  });
};
/**
 * Saves the data of a quiz into the server
 * @param {Object} quiz the quiz being added to the database
 * @returns
 */
export const createQuiz = async (quiz) => {
  await fetch("http://localhost:3001/quiz/create", {
    method: "POST",
    body: JSON.stringify({
      quiz: quiz,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
};
/**
 * Fetches the list of quizzes which pass the set query from the DB
 * @param {String} query the custom query to be run against the DB
 * @returns
 */
export const fetchQuizzes = async (query = {}) => {
  var getQuery = "";
  if (query) {
    getQuery = objectToGetRequest(query);
  }
  const request = await fetch(`http://localhost:3001/quiz/all${getQuery}`, {
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
 * Fetches a specified quiz from the database
 * @param {String} quizName the quiz to fetch
 * @returns
 */
export const fetchQuiz = async (quizName) => {
  const request = await fetch(`http://localhost:3001/quiz/${quizName}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const response = await request.json();
  return response;
};
