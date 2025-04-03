import axios from "axios";
import store from "../../redux/store";
import { API_URL } from "../constants/env";

const api = axios.create({
  baseURL: API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor para agregar el token en cada solicitud
api.interceptors.request.use(
  (config) => {
    const token = store.getState().auth.token;

    if (token) {
      //config.headers.Authorization = `Bearer ${token}`;
      config.headers.Authorization = `Bearer ${token}`;

    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api;
