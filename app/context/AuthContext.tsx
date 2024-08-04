// app/context/AuthContext.tsx

import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { initializeFirebaseAuth } from "../firebase/firebaseConfig";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  displayName: string | null;
  email: string | null;
  token: string | null;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [displayName, setDisplayName] = useState<string | null>(null);
  const [email, setEmail] = useState<string | null>(null);
  const [token, setToken] = useState<string | null>(null);

  useEffect(() => {
    let unsubscribe: (() => void) | undefined;

    const initAuth = async () => {
      const auth = await initializeFirebaseAuth();
      return auth.onAuthStateChanged(async (firebaseUser) => {
        setUser(firebaseUser);
        if (firebaseUser) {
          setDisplayName(firebaseUser.displayName);
          setEmail(firebaseUser.email);
          const idToken = await firebaseUser.getIdToken();
          setToken(idToken);
        } else {
          setDisplayName(null);
          setEmail(null);
          setToken(null);
        }
        setLoading(false);
      });
    };

    initAuth().then((unsubscribeFunc) => {
      unsubscribe = unsubscribeFunc;
    });

    return () => {
      if (typeof unsubscribe === "function") unsubscribe();
    };
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    displayName,
    email,
    token,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
