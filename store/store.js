import { createStore, applyMiddleware, compose } from "redux";
import rootReducer from "../reducers/index";
import thunk from "redux-thunk";
// import { composeWithDevTools } from "redux-devtools-extension";

// note : on production replace composeWithDevTools with componse

const intialState = {};
const middleWares = [thunk];

export default createStore(
    rootReducer,
    intialState,
    compose(applyMiddleware(...middleWares))
);
