import React, { useState, useEffect } from "react";
import { userContext } from "../context/user.context.jsx";
const protectedRoute = ({ children }) => {
  const { user, updateUser } = React.useContext(userContext);

  const baseUrl = import.meta.env.VITE_BASE_URL;

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/users/get-user`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${user?.accessToken}`,
          },
        });
        const data = await res.json();
        if (res.status === 401) {
          setIsAuthenticated(false);
          fetchAccessToken();
          return;
        }
        if (res.ok) {
          updateUser(data);
          setIsAuthenticated(true);
        } else {
          setIsAuthenticated(false);
          console.error("Failed to fetch user:", data.error);
        }
      } catch (error) {
        setIsAuthenticated(false);
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };
    const fetchAccessToken = async () => {
      try {
        const res = await fetch(`${baseUrl}/api/users/get-access-token`, {
          method: "GET",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ rT: user?.refreshToken }),
        });
        const data = await res.json();
        if (res.ok) {
          updateUser(data.aT);
        } else {
          console.error("Failed to refresh access token:", data.error);
        }
      } catch (error) {
        console.error("Error refreshing access token:", error);
      }
    };
    if (user?.accessToken) {
      fetchUser();
    } else {
      fetchAccessToken();
      setLoading(false);
    }
  }, []);

  return loading ? (
    <div>Loading...</div>
  ) : isAuthenticated ? (
    children
  ) : (
    <div>You need to be logged in to view this page.</div>
  );
};

export default protectedRoute;
