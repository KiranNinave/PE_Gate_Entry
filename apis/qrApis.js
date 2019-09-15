import { DOMAIN } from "./domain";
import store from "../store/store";

export const qrValidationApi = async qrData => {
    try {
        const token = store.getState().user.token;

        const formData = new FormData();
        formData.append("qr", qrData.qr);
        formData.append("day", qrData.day);

        if (!token) {
            throw new Error("Invalid credentials, please relogin");
        }

        formData.append("access_token", token);

        const header = {
            method: "POST",
            headers: {},
            body: formData
        };

        const response = await fetch(DOMAIN + "index.php", header);
        const data = await response.json();

        if (response.status === 200 || response.status === 406) {
            return data;
        }

        if (response.status === 401) {
            throw new Error("Invalid credentials Please relogin");
        }

        throw new Error("Can't reach to the server");
    } catch (err) {
        throw new Error(err.message);
    }
};
