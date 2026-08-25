import { createContext, useContext, useState, useCallback } from "react";
import { loginUser } from "../api/quiz";

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [token, setToken] = useState(() => localStorage.getItem("token"));

  const [userId, setUserId] = useState(() => localStorage.getItem("userId"));

  const [email, setEmail] = useState(() => localStorage.getItem("email"));

  const [username, setUsername] = useState(() =>
    localStorage.getItem("username"),
  );

  const login = useCallback(async (emailInput, password) => {
    const res = await loginUser(emailInput, password);

    const {
      token: newToken,
      userId: newUserId,
      username: newUsername,
    } = res.data;

    localStorage.setItem("token", newToken);
    localStorage.setItem("userId", newUserId);
    localStorage.setItem("email", emailInput);
    localStorage.setItem("username", newUsername);

    setToken(newToken);
    setUserId(newUserId);
    setEmail(emailInput);
    setUsername(newUsername);
  }, []);

  const logout = useCallback(() => {
    localStorage.removeItem("token");
    localStorage.removeItem("userId");
    localStorage.removeItem("email");
    localStorage.removeItem("username");

    setToken(null);
    setUserId(null);
    setEmail(null);
    setUsername(null);
  }, []);

  const value = {
    token,
    userId,
    email,
    username,
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
