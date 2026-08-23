import { createContext, useContext, useState, useCallback } from "react";
import { loginUser } from "../api/quiz";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));
  const [userId, setUserId] = useState(() => localStorage.getItem("userId"));
  const [email, setEmail] = useState(() => localStorage.getItem("email"));

  const login = useCallback(async (emailInput, password) => {
    const res = await loginUser(emailInput, password);
    const { token: newToken, userId: newUserId } = res.data;

    localStorage.setItem("token", newToken);
    localStorage.setItem("userId", newUserId);
    localStorage.setItem("email", emailInput);

    setToken(newToken);
    setUserId(newUserId);
    setEmail(emailInput);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    setToken(null);
    setUserId(null);
    setEmail(null);
  }, []);

  const value = {
    token,
    userId,
    email,
    isAuthenticated: Boolean(token),
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return ctx;
}
