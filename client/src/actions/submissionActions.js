import { objectToGetRequest } from "../api/general";

/**
 * Sends the data from the user submission to the server to be saved
 * @param {Object} submission the submission being added to the database
 * @returns
 */
export const createSubmission = async (submission) => {
  await fetch("http://localhost:3001/submissions/create", {
    method: "POST",
    body: JSON.stringify({
      submission: submission,
    }),
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
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
  const request = await fetch(`http://localhost:3001/submissions/${getQuery}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const response = await request.json();
  return response.data;
};
