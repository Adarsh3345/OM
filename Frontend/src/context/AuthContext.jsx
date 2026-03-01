import { createContext, useState, useEffect } from "react";
import { jwtDecode } from "jwt-decode"; 

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    console.log(token)
    if (token) {
      try {
        const decodedUser = jwtDecode(token);
        setUser(decodedUser);
        console.log(decodedUser)
      } catch (error) {
        console.error("Error decoding token:", error);
        localStorage.removeItem("token");
      }
    }
  }, []);

  const login = (decodedUser) => {
    setUser(decodedUser);
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
