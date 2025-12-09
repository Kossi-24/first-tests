import api from './api';

// REGISTER (ADMIN peut définir le rôle)
export const registerUser = async (nom, email, password, role = "MEMBER") => {
    try {
        const response = await api.post('/auth/register', {
            nom, email, password, role
        });
        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Erreur d'inscription");
    }
};

// LOGIN
export const loginUser = async (email, password) => {
    try {
        const response = await api.post('/auth/login', { email, password });
        const { user, token } = response.data;

        if (token) {
            localStorage.setItem("token", token);
            localStorage.setItem("user", JSON.stringify(user));
        }

        return response.data;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Erreur de connexion");
    }
};

// LOGOUT
export const logoutUser = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    window.location.href = "/";
};

// GET CURRENT USER from localStorage
export const getCurrentUser = () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
};

// GET CURRENT USER from backend (/api/auth/me)
export const fetchCurrentUser = async () => {
    try {
        const response = await api.get('/auth/me');
        return response.data;
    } catch (error) {
        console.error("Erreur get me :", error);
        return null;
    }
};

// UPDATE CURRENT USER PROFILE
export const updateCurrentUser = async (userData) => {
    try {
        const response = await api.put('/auth/me', userData);

        const updatedUser = response.data;
        localStorage.setItem("user", JSON.stringify(updatedUser));

        return updatedUser;
    } catch (error) {
        throw new Error(error.response?.data?.message || "Erreur mise à jour utilisateur");
    }
};


// ADMIN : GET ALL USERS
export const adminGetUsers = async () => {
    try {
        const response = await api.get('/users');
        return response.data;
    } catch (error) {
        throw new Error("Erreur récupération des utilisateurs");
    }
};

// ADMIN : UPDATE USER BY ID
export const adminUpdateUser = async (id, data) => {
    try {
        const response = await api.put(`/users/${id}`, data);
        return response.data;
    } catch (error) {
        throw new Error("Erreur mise à jour utilisateur");
    }
};

// ADMIN : DELETE USER
export const adminDeleteUser = async (id) => {
    try {
        await api.delete(`/users/${id}`);
        return true;
    } catch (error) {
        throw new Error("Erreur suppression utilisateur");
    }
};

// ADMIN : CHANGER LE RÔLE
export const adminChangeRole = async (id, newRole) => {
    try {
        const response = await api.put(`/users/${id}/role`, { role: newRole });
        return response.data;
    } catch (error) {
        throw new Error("Erreur changement de rôle");
    }
};
// ADMIN : REINITIALISER LE MOT DE PASSE
export const adminResetPassword = async (id, newPassword) => {
    try {
        const response = await api.put(`/users/${id}/reset-password`, { password: newPassword });
        return response.data;
    }
    catch (error) {
        throw new Error("Erreur réinitialisation mot de passe");
    }
};

// recuperer des utilisateurs


