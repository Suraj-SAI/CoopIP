import axios from "axios";

export const BASE_URL = "https://coopapi.saivalentine.com";

export const AxiosInstance = axios.create({
    baseURL: BASE_URL,
    headers: {
        "Content-Type": "application/json"
    }
})