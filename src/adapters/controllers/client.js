import axios from "axios";

const BASE_URL = process.env.REACT_APP_API_URL || "http://localhost:3000";

export const client = axios.create({
  options:{
    baseURL: BASE_URL,
    timeout: 300000,
    headers: {
      "Content-Type": "application/json",
    }
  }
})