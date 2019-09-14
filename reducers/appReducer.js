import { SET_CAMERA_PERMISSIONS } from "../actions/types";

const intialState = {
    hasCameraPermission: null
};

export default (state = intialState, action) => {
    switch (action.type) {
        case SET_CAMERA_PERMISSIONS:
            return {
                ...state,
                ...action.payload
            };
        default:
            return state;
    }
};
