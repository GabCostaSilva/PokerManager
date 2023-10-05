import {client} from "./client";

const API_URL = "http://localhost:3000/auth";
const POST = async (data, path) => {
    const url = `${API_URL}/${path}`;
    const body = JSON.stringify(data);
    try {
        // return await fetch(url, {
        //     method: "POST",
        //     headers: {
        //         Accept: "application/json",
        //         "Content-Type": "application/json"
        //     },
        //     body: body
        // });

        let axiosResponse = await client.post(url, body);
        console.log("POST TO " + url + "\nBODY: " + body, JSON.stringify(axiosResponse))
        return axiosResponse;
    } catch (e) {
        return e.response.data;
    }
};

export const AuthController = {
    login: async (email, password) => {
        const response = await POST({email, password}, "login");

        const statusCode = response.statusCode;
        let message = response?.message;
        if (statusCode >= 500) {
            console.error(message);
            throw new Error("Login falhou. Tente novamente mais tarde");
        } else if (statusCode?.toString().substring(0, 1) === "4") {
            console.error(message);
            throw new Error("Login não autorizado. Verifique seu usuário e senha");
        } else
            return response;
    },

    logout: async () => {
        return await POST({}, "logout");
    },
    register: async (req) => {
        return await POST(req, "register");
    }

    // resetPassword: async (userName: string, password: string) => {};
};