import api from "@/services/api";
import {
    createContext,
    useState,
    useEffect,
    useContext
} from "react";

import {
    loginUser as loginService,
    logoutUser
} from "@/services/userService";

export const ExpressAuthContext = createContext();

export const ExpressAuthProvider = ({ children }) => {

    const [user, setUser] = useState(() => {
        try {
            const storedUser = localStorage.getItem("user");
            return storedUser ? JSON.parse(storedUser) : null;
        } catch (error) {
            console.error("Erreur lors de la récupération du user :", error);
            return null;
        }
    });

    const login = async (email, password) => {
        const data = await loginService(email, password);

        if (!data || !data.user) {
            throw new Error("Login failed");
        }

        // Met à jour l'état local
        setUser(data.user);

        // Stockage local
        try {
            localStorage.setItem("token", data.token);
            localStorage.setItem("user", JSON.stringify(data.user));
        } catch (err) {
            console.warn("LocalStorage error:", err);
        }

        return data;
    };
    const logout = () => {
        setUser(null);
        logoutUser(); // retire le token
        localStorage.removeItem("user");
    };
    useEffect(() => {
        const checkAuth = async () => {
            const token = localStorage.getItem("token");
            if (!token) return;

            try {
                const res = await api.get("/auth/me");
                setUser(res.data.user);
                localStorage.setItem("user", JSON.stringify(res.data.user));
            } catch (err) {
                console.log("Token invalide :", err);
                logout();
            }
        };

        checkAuth();
    }, []);

    const value = { user, login, logout };

    return (
        <ExpressAuthContext.Provider value={value}>
            {children}
        </ExpressAuthContext.Provider>
    );
};

export function useExpressAuth() {
    const context = useContext(ExpressAuthContext);
    if (!context) {
        throw new Error("useExpressAuth must be used within an ExpressAuthProvider");
    }
    return context;
}
