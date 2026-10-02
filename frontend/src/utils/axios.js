import axios from "axios";


const BASE_URL = "http://localhost:8002/api"; // Replace with your backend URL

export const axiosInstance = axios.create({
  baseURL: BASE_URL,
  headers: {
    "Content-Type": "application/json",
  },
});



