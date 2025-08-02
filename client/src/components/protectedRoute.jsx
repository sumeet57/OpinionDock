import React, { useState, useEffect } from "react";
import { userContext } from "../context/user.context.jsx";
const protectedRoute = ({ children }) => {
  const { user, updateUser } = React.useContext(userContext);

  const [isAuthenticated, setIsAuthenticated] = useState(user.isAuthenticated);
  useEffect(() => {
    if (user && user.AccessToken) {
      setIsAuthenticated(true);
      updateUser(user);
    }
  }, [updateUser]);

  return { children };
};

export default protectedRoute;
