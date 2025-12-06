import api from './api';

export const registerUser = async (nom, email, password, role="MEMBER") => {
    try {
        const response = await api.post('api/auth/register', { nom, email, password, role });
         return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Erreur lors de l\'inscription');
    }
};

export const loginUser = async (email, password) => {
    try {
        const {data} = await api.post('api/auth/login', { email, password });
        if (data.token) {
            localStorage.setItem('token', data.token);
            localStorage.setItem('user', JSON.stringify(data.user));
        }
        return data;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Erreur lors de la connexion');
    }
};

export const logoutUser = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    window.location.href = '/';
};
//partie pour recuperer les infos de l'utilisateur courant 
export const getCurrentUser = () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
};
/*
export const getCurrentUser = async () => {
  const response = await api.get("/auth/me");
  return response.data;
};*/

//partie pour mettre a jour les infos de l'utilisateur courant
export const updateCurrentUser = async (userData) => {
    try {
        const response = await api.put('/api/auth/me', userData);
        const updatedUser = response.data;
        localStorage.setItem('user', JSON.stringify(updatedUser));
        return updatedUser;
    } catch (error) {
        throw new Error(error.response?.data?.message || 'Erreur lors de la mise à jour des informations utilisateur');
    }
}

