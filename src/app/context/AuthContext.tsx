"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface User {
  [x: string]: ReactNode;
  token: string;
  name?: string;
  email?: string;
  picture?: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");
  
    console.log("Stored user:", storedUser);
    console.log("Stored token:", storedToken);
  
    if (storedUser && storedToken) {
      const parsedUser = JSON.parse(storedUser);
      setUser({ ...parsedUser, token: storedToken }); 
    }
  }, []);
  

  const login = (userData: User) => {
    console.log("Logging in with:", userData); 
  
    localStorage.setItem("user", JSON.stringify(userData));
    localStorage.setItem("token", userData.token); 
  
    setUser(userData);
  };

  const logout = () => {
    console.log("Logging out...");
    localStorage.removeItem("user");
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
