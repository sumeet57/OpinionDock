import React from "react";
import { fetchUser, getAccessToken } from "../utils/fetchUser";
import { userContext } from "../context/user.context.jsx";
import { useNavigate } from "react-router-dom";
export const ProtectedRoute = ({ children }) => {
  const { user, updateUser } = React.useContext(userContext);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const navigate = useNavigate();
  React.useEffect(() => {
    // Check authentication status
    fetchUser()
      .then((user) => {
        updateUser(user);
        setIsAuthenticated(true);
      })
      .catch((error) => {
        getAccessToken()
          .then(() => {
            fetchUser().then((user) => {
              updateUser(user);
              setIsAuthenticated(true);
            });
          })
          .catch((error) => {
            navigate("/auth");

            setIsAuthenticated(false);
          });
      });
  }, []);
  return (
    <>
      {isAuthenticated ? (
        children
      ) : (
        <div className="flex items-center justify-center h-screen">
          <h1 className="text-2xl font-bold">
            You must be logged in to view this page
          </h1>
        </div>
      )}
    </>
  );
};
