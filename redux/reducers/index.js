import { combineReducers } from "redux";

import authReducers from "redux/reducers/auth";
import masterUserInternalReducers from "./master/userInternal";
import masterInternReducers from "./master/intern";
import masterAllowanceReducers from "./master/allowance";
import logbookReducers from "./logbook";

export default combineReducers({
  authReducers,
  masterUserInternalReducers,
  masterInternReducers,
  masterAllowanceReducers,
  logbookReducers,
});
