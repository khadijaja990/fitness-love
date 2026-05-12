import {
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import {
  GoogleAuthProvider,
  onAuthStateChanged,
  signInWithPopup,
  signOut,
} from "firebase/auth";

import { auth } from "../firebase/config";

const AuthContext = createContext<any>(null);

export function AuthProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [user, setUser] = useState<any>(null);

  // Keep user logged in after refresh
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(
      auth,
      (currentUser) => {
        setUser(currentUser);
      }
    );

    return () => unsubscribe();
  }, []);

  // Login
  const login = async () => {
    const provider = new GoogleAuthProvider();

    await signInWithPopup(auth, provider);
  };

  // Logout
  const logout = async () => {
    await signOut(auth);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}