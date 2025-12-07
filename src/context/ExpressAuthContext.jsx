import { createContext, useState, useEffect, useContext } from "react";
import api from "@/services/api";

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(localStorage.getItem("token"));
  const [loading, setLoading] = useState(true);

  // Charger le profil au démarrage si un token existe
  useEffect(() => {
    if (token) {
      api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
      fetchUser();
    } else {
      setLoading(false);
    }
  }, [token]);

const fetchUser = async () => {
  try {
    // Vérifie qu’un token existe vraiment
    const storedToken = localStorage.getItem("token");
    if (!storedToken) {
      setUser(null);
      return null;
    }

    // Ajoute l’en-tête au cas où
    api.defaults.headers.common["Authorization"] = `Bearer ${storedToken}`;

    const res = await api.get("/auth/me");

    if (!res.data || !res.data.user) {
      throw new Error("Réponse /auth/me invalide");
    }

    setUser(res.data.user);
    return res.data.user;
  } catch (err) {
    console.error(" Erreur fetchUser :", err);

    // JWT invalide, expiré ou modifié ➤ on déconnecte
    logout();
    return null;
  } finally {
    setLoading(false);
  }
};


  const register = async (userData) => {
    await api.post("/auth/register", userData);
  };
const login = async (email, password) => {
  const res = await api.post("/auth/login", { email, password });

  const token = res.data.token;

  // 1. Enregistre immédiatement
  localStorage.setItem("token", token);
  setToken(token);

  // 2. Fixe l'en-tête pour axios avant l'appel /me
  api.defaults.headers.common["Authorization"] = `Bearer ${token}`;

  // 3. Appelle /auth/me pour récupérer l’utilisateur
  const profile = await api.get("/auth/me");

  // 4. Stocke l’utilisateur
  setUser(profile.data.user);

  return profile.data.user; // optionnel si tu veux l'utiliser après
};


  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("token");
    delete api.defaults.headers.common["Authorization"];
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        token,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
        isAdmin: user?.role === "ADMIN",
        isLibrarian: user?.role === "LIBRARIAN",
        isMember: user?.role === "MEMBER",
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
// context personnalisé pour l'authentification avec Express et JWT
export function useExpressAuth() {
  const context = useContext(AuthContext);
    if (!context) {
        throw new Error("useAuth must be used within an AuthProvider");
    }
    return context;
}

