import { FETCH_SUBMISSIONS, ADD_SUBMISSION } from "../actions/types";
const INITIAL_STATE = [];
const submissionsReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_SUBMISSIONS:
      return action.payload;
    case ADD_SUBMISSION:
      return [...state, action.payload];
    default:
      return state;
  }
};
export default submissionsReducer;
