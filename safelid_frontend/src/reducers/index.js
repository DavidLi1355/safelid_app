  
import { combineReducers } from "redux";
import authReducer from "./entryReducer/authReducer";
import errorReducer from "./entryReducer/errorReducer";

export default combineReducers({
    auth: authReducer,
    error: errorReducer
});