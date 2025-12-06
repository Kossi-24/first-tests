 import axios from 'axios';

const api = axios.create({
    baseURL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:5000/api',
    headers:{
        'Content-Type': 'application/json',
    }
});
// Add a request interceptor to include the token in headers
 api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);
// gestion des erreurs globales
api.interceptors.response.use(
  (response) => response,
  (error) => {
    const status = error?.response?.status;

    if (status === 401) {
      localStorage.removeItem("token");
      window.location.href = "/"; 
    }

    if (status === 403) {
      console.warn("Accès refusé — rôle insuffisant");
    }

    return Promise.reject
(error);
  });

export default api;
