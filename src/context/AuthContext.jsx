import { createContext, useContext, useEffect, useState } from "react";
import { 
  createUserWithEmailAndPassword, 
  signInWithEmailAndPassword,
  onAuthStateChanged 
} from "firebase/auth";
import { auth } from "@/services/firebase-config"; 

// Créer le Context
export const UserContext = createContext();

// Hook personnalisé pour utiliser le contexte
export function useAuth() {
  return useContext(UserContext);
}

// Provider
export function UserContextProvider({ children }) {
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = useState(true);

  const signUp = (email, pwd) => {
    if (!auth) throw new Error("Firebase auth not initialized");
    console.log("Tentative d'inscription avec:", { email, passwordLength: pwd?.length });
    return createUserWithEmailAndPassword(auth, email, pwd);
};

const signIn = (email, pwd) => {
    if (!auth) throw new Error("Firebase auth not initialized");
    console.log("Tentative de connexion avec:", { email, passwordLength: pwd?.length });
    return signInWithEmailAndPassword(auth, email, pwd);
};

useEffect(() => {
    if (!auth) {
        setLoading(false);
        return;
    }
    const unsubscribe = onAuthStateChanged(auth, (user) => {
        setCurrentUser(user);
        setLoading(false);
    });

    return unsubscribe;
}, []);

return (
    <UserContext.Provider value={{signUp, signIn, currentUser}}>
        {!loading && children}
    </UserContext.Provider>
);
}