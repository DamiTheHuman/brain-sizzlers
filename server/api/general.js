/**General functions used by entire application */
/**
 * Updates the object keys values with another objects KVP where they match or where its null
 * @param {Object} currentData The current object with all the keys
 * @param {Object} newData the new object data to replace the current data
 * @returns {Object} output with updated data
 */
export const updateObjectKeys = (currentData, newData) => {
  for (var key in currentData) {
    currentData[key] = newData[key] ? newData[key] : currentData[key];
  }
};
