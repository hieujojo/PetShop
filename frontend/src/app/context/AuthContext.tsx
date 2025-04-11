"use client";

import React, { createContext, useContext, useState, useEffect, ReactNode } from "react";

interface User {
  token: string;
  name?: string; // Tùy chọn, nhưng sẽ có giá trị mặc định nếu không cung cấp
  email?: string;
}

interface AuthContextType {
  user: User | null;
  setUser: (user: User | null) => void;
  login: (userData: User) => void;
  logout: () => void;
}

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  login: () => {},
  logout: () => {},
});

export const AuthProvider = ({ children }: { children: ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  // Kiểm tra localStorage có khả dụng không
  const isLocalStorageAvailable = () => {
    try {
      const testKey = "__test__";
      localStorage.setItem(testKey, testKey);
      localStorage.removeItem(testKey);
      return true;
    } catch {
      return false;
    }
  };

  // Kiểm tra token có hợp lệ không
  const isTokenValid = (token: string): boolean => {
    try {
      const payload = JSON.parse(atob(token.split(".")[1]));
      return payload.exp * 1000 > Date.now();
    } catch (error) {
      console.error("Lỗi khi kiểm tra token:", error);
      return false;
    }
  };

  // Load user từ localStorage khi khởi tạo
  useEffect(() => {
    if (!isLocalStorageAvailable()) {
      console.error("localStorage không khả dụng");
      return;
    }

    const storedUser = localStorage.getItem("user");
    const storedToken = localStorage.getItem("token");

    if (storedUser && storedToken && isTokenValid(storedToken)) {
      try {
        const parsedUser: User = JSON.parse(storedUser);
        // Đảm bảo user luôn có name, mặc định là "User" nếu thiếu
        setUser({ ...parsedUser, token: storedToken, name: parsedUser.name || "User" });
      } catch (error) {
        console.error("Lỗi khi parse dữ liệu user từ localStorage:", error);
        setUser(null);
        localStorage.removeItem("user");
        localStorage.removeItem("token");
      }
    } else {
      setUser(null);
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, []);

  // Đồng bộ user với localStorage khi user thay đổi
  useEffect(() => {
    if (!isLocalStorageAvailable()) return;

    if (user) {
      try {
        localStorage.setItem("user", JSON.stringify({ name: user.name, email: user.email }));
        localStorage.setItem("token", user.token);
      } catch (error) {
        console.error("Lỗi khi lưu dữ liệu vào localStorage:", error);
      }
    } else {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
  }, [user]);

  // Hàm login
  const login = (userData: User) => {
    // Đảm bảo userData có name, nếu không thì gán mặc định
    const safeUserData = { ...userData, name: userData.name || "User" };
    setUser(safeUserData);
  };

  // Hàm logout
  const logout = () => {
    setUser(null);
    if (isLocalStorageAvailable()) {
      localStorage.removeItem("user");
      localStorage.removeItem("token");
    }
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