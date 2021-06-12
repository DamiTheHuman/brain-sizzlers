import { combineReducers } from "redux";
import userAuthReducer from "./userAuthReducer";
import submissionsReducer from "./submissionsReducer";

export default combineReducers({
  user: userAuthReducer,
  submissions: submissionsReducer
});
