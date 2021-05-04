import { LOGIN_USER, LOGOUT_USER, FETCH_USER } from "./types";
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
