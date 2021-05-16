import { objectToGetRequest } from "../api/general";
/**
 * Saves the data of a quiz into the server
 * @param {Object} quiz the quiz being added to the database
 * @returns
 */
export const createQuiz = async (quiz) => {
  await fetch("http://localhost:3001/quizzes/create", {
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
  const request = await fetch(`http://localhost:3001/quizzes${getQuery}`, {
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
 * @returns {Object} containing response data from server
 */
export const fetchQuiz = async (quizName) => {
  const request = await fetch(`http://localhost:3001/quizzes/${quizName}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include",
  });
  const response = await request.json();
  return response.data;
};
/**
 * Updates a quiz within the database with the specified details
 * @param {String} quizName the name of the quiz being updated
 * @param {Object} data the data to update the quiz with
 * @returns
 */
export const updateQuiz = async (quizName, data) => {
  const request = await fetch(
    `http://localhost:3001/quizzes/update/${quizName}`,
    {
      method: "put",
      body: JSON.stringify({
        name: quizName,
        data: data,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }
  );
  const response = await request.json();
};
