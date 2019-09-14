import { SET_USER } from "../actions/types";

const intialState = {
    token: null,
    username: null
};

export default (state = intialState, action) => {
    switch (action.type) {
        case SET_USER:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};
