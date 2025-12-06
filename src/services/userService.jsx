import api from './api';

export const registerUser = async (userData) => {
    try {
        const response = await api.post('api/auth/register', userData);
         return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Erreur lors de l\'inscription');
    }
};

export const login = async (credentials) => {
    try {
        const {data} = await api.post('api/auth/login', credentials);
        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
        }
        return data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Erreur lors de la connexion');
    }
};

export const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
};

export const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};

