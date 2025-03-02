import axios from "axios";

const api = axios.create({
  baseURL: "https://travel-list-0-0-2-backend.onrender.com",
});

export default api;
