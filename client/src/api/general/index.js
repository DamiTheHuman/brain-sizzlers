/**General functions used throughout the application */
/**
 * Converts an Object to a GET request
 * @param {Object} obj the object to convert to get query
 * @returns {String} returns result
 */
export const objectToGetRequest = (obj) => {
  var str = "?";
  for (var key in obj) {
    if (str !== "?") {
      str += "&";
    }
    str += key + "=" + encodeURIComponent(obj[key]);
  }
  return str;
};
/**
 * Converts a date to the appropriate format
 * @param {String|Date} date the date to convert
 * @returns {String} the date in mm/dd/yyyy
 */
export const formatDateToMMDDYY = (date) => {
  date = new Date(date);
  const year = date.getFullYear();
  const month = (1 + date.getMonth()).toString().padStart(2, "0");
  const day = date.getDate().toString().padStart(2, "0");
  return month + "/" + day + "/" + year;
};
