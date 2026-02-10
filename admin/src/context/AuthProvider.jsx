import axios from "axios";
import { useState } from "react";
import { AuthContext } from "./AuthContext";
import { toast } from "react-toastify";

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(!!localStorage.getItem("adminToken"));

  const login = async (email, password) => {
    try {
      const res = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/user/admin`,
        { email, password },
      );

      if (res.data.success) {
        localStorage.setItem("adminToken", res.data.token);
        setUser(true);
        toast.success("Admin logged in");
        return true;
      } else {
        toast.error(res.data.message);
        return false;
      }
    } catch (err) {
      toast.error("Invalid credentials");
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem("adminToken");
    setUser(null);
    toast.success("Logged out");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
