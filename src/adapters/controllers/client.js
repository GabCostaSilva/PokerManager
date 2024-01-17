import {auth} from "../../../firebaseConfig";

import {createHttpClient} from "./httpClientBuilder";

const API_URL = "http://localhost:3000"

export const httpClient = createHttpClient({
    options: {
        baseURL: API_URL,
        timeout: 300000,
        headers: {
            "Accept": "application/json",
            "Content-Type": "application/json"
        }
    },
    getCurrentAccessToken: async () => {
        return auth.currentUser?.getIdToken(true);
    }
});
