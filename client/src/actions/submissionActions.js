import { objectToGetRequest } from "../api/general";
import server from "../api/server";

/**
 * Sends the data from the user submission to the server to be saved
 * @param {Object} submission the submission being added to the database
 * @returns
 */
export const createSubmission = async (submission) => {
  await server
    .post("/submissions/create", { submission: submission })
    .catch((err) => {
      console.log(err);
    });
};
/**
 * Fetches submissions based on the set query where available
 * @param {String} query the query to run against the DB
 * @returns
 */
export const fetchSubmissions = async (query = {}) => {
  var getQuery = "";
  if (query) {
    getQuery = objectToGetRequest(query);
  }
  const request = await server.get(`/submissions${getQuery}`).catch((err) => {
    console.log(err);
    return null;
  });
  return request.data;
};
