import { LOGIN_USER, LOGOUT_USER, FETCH_USER } from "./types";
/**
 * Fetch the session for the current logged in user
 * @returns void
 */
export const fetchSession = () => async (dispatch) => {
  const request = await fetch("http://localhost:3001/auth/login", {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const response = await request.json();
  dispatch({
    type: FETCH_USER,
    payload: response.data ? response.data : null,
  });
};

/**
 * Login a user authenticated by google oAuth2
 * @param {Object} googleData
 * @returns void
 */
export const loginUser = (googleData) => async (dispatch) => {
  const request = await fetch("http://localhost:3001/auth/login", {
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
  await fetch("http://localhost:3001/auth/logout", {
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
