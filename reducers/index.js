import { combineReducers } from "redux";
import userReducer from "./userReducer";
import appReducer from "./appReducer";

export default combineReducers({
    user: userReducer,
    app: appReducer
});
