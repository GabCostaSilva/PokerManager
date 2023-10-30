import {client} from "./client";

//TODO env variable
const API_URL = "/auth";

const POST = async (data, path) => {
    const url = `${API_URL}/${path}`;
    const body = JSON.stringify(data);
    try {
        return await client.post(url, body);
    } catch (e) {
        console.error("Auth Controller POST", e)
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