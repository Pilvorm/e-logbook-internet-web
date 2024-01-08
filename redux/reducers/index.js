import { combineReducers } from "redux";

import authReducers from "redux/reducers/auth";
import masterUserInternalReducers from "./master/userInternal";
import masterInternReducers from "./master/intern";
import masterRoleReducers from "./master/roles";
import masterAllowanceReducers from "./master/allowance";
import logbookReducers from "./logbook";
import userProfileReducer from "./userProfile";

export default combineReducers({
  authReducers,
  masterUserInternalReducers,
  masterInternReducers,
  masterRoleReducers,
  masterAllowanceReducers,
  logbookReducers,
  userProfileReducer,
});
