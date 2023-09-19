import { localStorageAdapter } from "../localStorageAdapter";
import { createAxiosClient } from "./createAxiosClient";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

export const client = createAxiosClient({
  options: {
    baseURL: BASE_URL,
    timeout: 300000,
    headers: {
      "Accept": "application/json",
      "Content-Type": "application/json"
    }
  },
  getCurrentAccessToken: async () => {
    return await localStorageAdapter.getAccessToken();
  }
});