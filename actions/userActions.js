import { SET_USER } from "./types";
import { userLoginApi } from "../apis/userApis";
import { saveUser } from "../apis/storageApis";

export const userLoginAction = user => async dispatch => {
    try {
        const loggedUser = await userLoginApi(user);
        await saveUser(loggedUser);
        dispatch({
            type: SET_USER,
            payload: loggedUser
        });
    } catch (err) {
        throw new Error(err.message);
    }
};

export const setUserAction = user => dispatch => {
    dispatch({
        type: SET_USER,
        payload: user
    });
};
