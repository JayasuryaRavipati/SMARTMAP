import { createContext, useContext, useEffect, useState } from "react";
import API from "../services/api";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const login = async (email, password, remember) => {
    const res = await API.post("/auth/login", {
      email,
      password,
    });

    const token = res.data.token;

    if (remember) {
      localStorage.setItem("token", token);
    } else {
      sessionStorage.setItem("token", token);
    }

    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    const profile = await API.get("/auth/profile");

    const loggedInUser = profile.data.user;

setUser(loggedInUser);

// Save user for later
if (remember) {
  localStorage.setItem("user", JSON.stringify(loggedInUser));
} else {
  sessionStorage.setItem("user", JSON.stringify(loggedInUser));
}

return loggedInUser;
  };

 const logout = () => {
  localStorage.removeItem("token");
  sessionStorage.removeItem("token");

  localStorage.removeItem("user");
  sessionStorage.removeItem("user");

  delete API.defaults.headers.common["Authorization"];

  setUser(null);

  window.location.href = "/login";
};

  useEffect(() => {
    const token =
      localStorage.getItem("token") ||
      sessionStorage.getItem("token");

    if (!token) {
      setLoading(false);
      return;
    }

    API.defaults.headers.common["Authorization"] = `Bearer ${token}`;

    API.get("/auth/profile")
     .then((res) => {
  setUser(res.data.user);

  const storage =
    localStorage.getItem("token")
      ? localStorage
      : sessionStorage;

  storage.setItem(
    "user",
    JSON.stringify(res.data.user)
  );
})
      .catch(() => {
        logout();
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        login,
        logout,
        isAuthenticated: !!user,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);