import React from "react";
import { fetchUser, getAccessToken } from "../utils/fetchUser";
import { userContext } from "../context/user.context.jsx";
import { useNavigate } from "react-router-dom";
export const ProtectedRoute = ({ children }) => {
  const { user, updateUser } = React.useContext(userContext);
  const [isAuthenticated, setIsAuthenticated] = React.useState(false);
  const [isLoading, setIsLoading] = React.useState(true);
  const navigate = useNavigate();
  React.useEffect(() => {
    // Check authentication status
    setIsLoading(true);
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

    setIsLoading(false);
  }, []);
  return (
    <>
      {isLoading ? (
        <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center">
          <div className="text-xl font-semibold text-gray-900">Loading...</div>
        </div>
      ) : isAuthenticated ? (
        children
      ) : (
        <div className="min-h-screen w-full bg-gray-100 flex items-center justify-center">
          <div className="text-xl font-semibold text-gray-900">
            You are not authorized to view this page. Please log in.
          </div>
        </div>
      )}
    </>
  );
};
