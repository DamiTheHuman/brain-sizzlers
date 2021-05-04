import { LOGIN_USER, LOGOUT_USER, FETCH_USER } from "../actions/types";
const INITIAL_STATE = {};
const usersReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case FETCH_USER:
      return action.payload;
    case LOGIN_USER:
      return action.payload;
    case LOGOUT_USER:
      return action.payload;
    default:
      return state;
  }
};
export default usersReducer;
