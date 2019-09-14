import { DOMAIN } from "./domain";

export const userLoginApi = async user => {
    const formData = new FormData();
    formData.append("username", user.username);
    formData.append("password", user.password);
    try {
        const header = {
            method: "POST",
            headers: {},
            body: formData
        };
        const response = await fetch(DOMAIN + "login.php", header);
        const data = await response.json();
        if (response.status === 200) {
            return data;
        }
        if (response.status === 401) {
            throw new Error("Invalid username or password");
        }
        throw new Error("Can't reach to server!");
    } catch (err) {
        throw new Error(err.message);
    }
};
