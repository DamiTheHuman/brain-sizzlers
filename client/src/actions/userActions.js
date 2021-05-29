import { objectToGetRequest } from "../api/general";
import server from "../api/server";
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
  const request = await server.get(`/users${getQuery}`).catch((err) => {
    console.log(err);
    return null;
  });
  return request.data;
};
/**
 * Sends a request to the server to fetch user
 * @param {String} userName the user to search for
 * @returns {Object} the response from the server
 */
export const fetchUser = async (userName) => {
  if (!userName) {
    return null;
  }
  const request = await server.get(`/users/${userName}`).catch((err) => {
    console.log(err);
    return null;
  });
  return request.data;
};
