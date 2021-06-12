import { objectToGetRequest } from "../api/general";
import server from "../api/server";
import { FETCH_SUBMISSIONS, ADD_SUBMISSION } from "./types";

/**
 * Sends the data from the user submission to the server to be saved
 * @param {Object} submission the submission being added to the database
 * @returns
 */
export const createSubmission = submission => async dispatch => {
  const request = await server
    .post("/submissions/create", { submission: submission })
    .catch(err => {
      console.log(err);
    });

  dispatch({
    type: ADD_SUBMISSION,
    payload: request.data
  });
};
/**
 * Fetches submissions based on the set query where available
 * @param {String} query the query to run against the DB
 * @returns
 */
export const fetchSubmissions =
  (query = {}) =>
  async dispatch => {
    var getQuery = "";
    if (query) {
      getQuery = objectToGetRequest(query);
    }
    const request = await server.get(`/submissions${getQuery}`).catch(err => {
      console.log(err);
      return null;
    });
    if (!request) {
      return null;
    }
    dispatch({
      type: FETCH_SUBMISSIONS,
      payload: request ? request.data : null
    });
  };

/**
 * Fetches submissions based on the set query where available for a specified user
 * @param {String} query the query to run against the DB
 * @returns
 */
export const fetchUserSubmissions = async (query = {}) => {
  var getQuery = "";
  if (query) {
    getQuery = objectToGetRequest(query);
  }
  const request = await server.get(`/submissions${getQuery}`).catch(err => {
    console.log(err);
    return null;
  });
  if (!request) {
    return null;
  }
  return request ? request.data : null;
};
