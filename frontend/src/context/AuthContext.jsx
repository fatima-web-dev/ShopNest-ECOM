import React, { createContext, useContext, useState } from "react";

// 1. Auth Context create karna
const AuthContext = createContext();

// 2. Auth Provider
const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);


  // Login
  const login = (userData) => {
    setUser(userData);
     localStorage.setItem("userInfo", JSON.stringify(userData));
     localStorage.setItem("token", userData.token);
  };
 

  // Logout
  const logout = () => {
    setUser(null);
    localStorage.removeItem("userInfo");
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// 3. Context ko easily use karne ke liye custom hook
const useAuth = () => {
  return useContext(AuthContext);
};

export { AuthProvider, useAuth };