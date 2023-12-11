import {localStorageAdapter} from "../localStorageAdapter";
import {createAxiosClient} from "./createAxiosClient";

const API_URL = process.env.EXPO_PUBLIC_API_URL || "http://localhost:3000"
export const client = createAxiosClient({
  options: {
    baseURL: API_URL,
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