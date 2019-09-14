import { AsyncStorage } from "react-native";

const key = "access_token";

export const saveUser = async user => {
    try {
        await AsyncStorage.setItem(key, JSON.stringify(user));
    } catch (err) {
        throw new Error(err.message);
    }
};

export const getUser = async () => {
    try {
        const user = await AsyncStorage.getItem(key);
        return JSON.parse(user);
    } catch (err) {
        throw new Error(err.message);
    }
};
