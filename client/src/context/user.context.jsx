import React, { useState, createContext } from "react";
import { useEffect } from "react";
import { fetchUser } from "../utils/fetchUser";

export const userContext = createContext();

const apiUrl = import.meta.env.VITE_SERVER_URL;

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
    setUser((prevUser) => ({
      ...prevUser,
      ...userData,
    }));
  };

  useEffect(() => {
    // fetchUser();
  }, []);

  const [isLoading, setIsLoading] = useState(false);

  return (
    <userContext.Provider value={{ user, updateUser, isLoading, setIsLoading }}>
      {children}
    </userContext.Provider>
  );
};
