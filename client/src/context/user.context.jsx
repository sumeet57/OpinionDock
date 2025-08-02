import React, { useState, createContext } from "react";

export const userContext = createContext();

export const UserContextProvider = ({ children }) => {
  const [user, setUser] = useState({
    isAuthenticated: false,
    firstName: "",
    lastName: "",
    email: "",
    AccessToken: "",
    RefreshToken: "",
    userId: "",
  });
  const updateUser = (userData) => {
    console.log("Updating user context with:", userData);
    setUser((prevUser) => ({
      ...prevUser,
      ...userData,
    }));
  };

  const [isLoading, setIsLoading] = useState(false);

  return (
    <userContext.Provider value={{ user, updateUser, isLoading, setIsLoading }}>
      {children}
    </userContext.Provider>
  );
};
