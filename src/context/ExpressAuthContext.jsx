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
      const res = await api.get("/auth/me");
      setUser(res.data.user);
    } catch (err) {
      console.error("Auth error:", err);
      logout();
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
    setToken(token);
    localStorage.setItem("token", token);

    api.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    await fetchUser();
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

