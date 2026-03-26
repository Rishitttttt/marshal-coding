import { useEffect, useState } from "react";
import { loginUser, logoutUser, registerUser } from "../api/auth.api.js";
import { connectSocket, disconnectSocket } from "../socket/socket.js";
import { AuthContext } from "./auth-context.js";

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(() => {
    const token = localStorage.getItem("accessToken");
    const userId = localStorage.getItem("userId");
    return Boolean(token && userId);
  });

  useEffect(() => {
    const token = localStorage.getItem("accessToken");

    if (token) {
      connectSocket(token);
    }
  }, []);

  const login = async (data) => {
    const res = await loginUser(data);

    localStorage.setItem("accessToken", res.accessToken);
    localStorage.setItem("userId", res.user.id);

    setIsAuthenticated(true);
    connectSocket(res.accessToken);
  };

  const register = async (data) => {
    const res = await registerUser(data);
    await login({
      email: data.email,
      password: data.password,
    });
    return res;
  };

  const logout = async () => {
    try {
      await logoutUser();
    } catch (error) {
      console.error("Logout error:", error);
    }

    localStorage.removeItem("accessToken");
    localStorage.removeItem("userId");
    disconnectSocket();
    setIsAuthenticated(false);
  };

  return (
    <AuthContext.Provider
      value={{ isAuthenticated, login, register, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
};
