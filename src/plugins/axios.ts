import { router } from "@/router";
import axios from "axios";
export const Api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL,
    headers: {
        "Content-Type": "application/json",
    },
});

Api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => {
        return Promise.reject(error);
    }
);

Api.interceptors.response.use(
    (response) => response,
    (error) => {
        console.log("HTTP error:", error.response.status);
        if (error.response.status === 403) {
            router.push({ name: "forbidden" });
        }
        if (error.response.status === 401) {
            // localStorage.removeItem('token')
            router.push({ name: "unauthorized" });
        }
        return Promise.reject(error);
    }
)