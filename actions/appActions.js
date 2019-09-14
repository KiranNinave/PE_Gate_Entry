import { SET_CAMERA_PERMISSIONS } from "./types";

// permissions should object with key {hasCameraPermission: boolean}
export const cameraPermissionAction = permissions => dispatch => {
    dispatch({
        type: SET_CAMERA_PERMISSIONS,
        payload: permissions
    });
};
