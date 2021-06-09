import { objectToGetRequest } from "../api/general";
import server from "../api/server";
/**
 * Saves the data of a quiz into the server
 * @param {Object} quiz the quiz being added to the database
 * @returns
 */
export const createQuiz = async (quiz) => {
  server.post("/quizzes/create", {
    quiz: quiz,
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
  const request = await server.get(`/quizzes${getQuery}`).catch((err) => {
    console.log(err);
    return null;
  });
  if (!request) {
    return null;
  }
  return request.data;
};
/**
 * Fetches a specified quiz from the database
 * @param {String} quizName the quiz to fetch
 * @returns {Object} containing response data from server
 */
export const fetchQuiz = async (quizName) => {
  const request = await server.get(`/quizzes/${quizName}`).catch((err) => {
    console.log(err);
    return null;
  });
  if (!request) {
    return null;
  }
  return request.data;
};
/**
 * Updates a quiz within the database with the specified details
 * @param {String} quizName the name of the quiz being updated
 * @param {Object} data the data to update the quiz with
 * @returns
 */
export const updateQuiz = async (quizName, data) => {
  await server
    .put(`/quizzes/update/${quizName}`, { name: quizName, data: data })
    .catch((err) => {
      console.log(err);
    });
};
