  
import { combineReducers } from "redux";
import authReducer from "./entryReducer/authReducer";
import errorReducer from "./entryReducer/errorReducer";
import itemReducer from './dashboardReducer/itemReducer'

export default combineReducers({
    auth: authReducer,
    error: errorReducer,
    item: itemReducer
});