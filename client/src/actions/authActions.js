import { LOGIN_USER, LOGOUT_USER, FETCH_USER } from "./types";
import server from "../api/server";
/**
 * Fetch the session for the current logged in user
 * @returns void
 */
export const fetchSession = () => async (dispatch) => {
  const request = await server.get("/auth/login").catch((err) => {
    console.log(err);
  });
  dispatch({
    type: FETCH_USER,
    payload: request ? request.data : null,
  });
};

/**
 * Login a user authenticated by google oAuth2
 * @param {Object} googleData
 * @returns void
 */
export const loginUser = (googleData) => async (dispatch) => {
  const request = await server
    .post("/auth/login", { token: googleData.tokenId })
    .catch((err) => {
      console.log(err);
    });
  dispatch({
    type: LOGIN_USER,
    payload: request.data,
  });
};
/**
 * Logout an already authenticated user
 * @returns void
 */
export const logoutUser = () => async (dispatch) => {
  await server.delete("/auth/logout").catch((err) => {
    console.log(err);
  });
  dispatch({
    type: LOGOUT_USER,
    payload: null,
  });
};
