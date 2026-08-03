import { createContext, useContext, useEffect, useState } from "react";
import API from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // Load user when app starts
  useEffect(() => {
    const loadUser = async () => {
      const token = localStorage.getItem("token");

      if (!token) {
        setLoading(false);
        return;
      }

      try {
        const res = await API.get("/auth/profile");
        setUser(res.data.user);
      } catch (error) {
        console.error(error);
        localStorage.removeItem("token");
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    loadUser();
  }, []);

  // Register
  const register = async (formData) => {
    const res = await API.post("/auth/register", formData);

    localStorage.setItem("token", res.data.token);

    setUser(res.data.user);

    return res.data;
  };

  // Login
  const login = async (formData) => {
    const res = await API.post("/auth/login", formData);

    localStorage.setItem("token", res.data.token);

    setUser(res.data.user);

    return res.data;
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        register,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);