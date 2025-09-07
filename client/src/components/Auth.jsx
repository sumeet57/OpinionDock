import React, { useState, useContext } from "react";
import { toast } from "react-toastify";
import { userContext } from "../context/user.context.jsx";
import { useNavigate } from "react-router-dom";

// --- SVG Icons ---
const UserIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z"
      clipRule="evenodd"
    />
  </svg>
);

const LockIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 text-gray-400"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z"
      clipRule="evenodd"
    />
  </svg>
);

// --- Loading Spinner Icon ---
const SpinnerIcon = () => (
  <svg
    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
    xmlns="http://www.w3.org/2000/svg"
    fill="none"
    viewBox="0 0 24 24"
  >
    <circle
      className="opacity-25"
      cx="12"
      cy="12"
      r="10"
      stroke="currentColor"
      strokeWidth="4"
    ></circle>
    <path
      className="opacity-75"
      fill="currentColor"
      d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
    ></path>
  </svg>
);

const Auth = () => {
  const apiUrl = import.meta.env.VITE_SERVER_URL;
  const [isLoginView, setIsLoginView] = useState(true);
  const { updateUser } = useContext(userContext);
  const navigate = useNavigate();

  // State for form inputs
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  // ✅ NEW: State for loading indicator
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true); // ✅ Start loading

    try {
      const endpoint = isLoginView ? "login" : "register";
      const payload = isLoginView
        ? { email: formData.email, password: formData.password }
        : { ...formData };

      const res = await fetch(`${apiUrl}/api/users/${endpoint}`, {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      const data = await res.json();

      if (res.ok) {
        toast.success(
          isLoginView ? "Login successful!" : "Registration successful!"
        );
        // Assuming your API returns user data on login/register to update context
        if (data.user) {
          updateUser(data.user);
        }
        navigate("/");
      } else {
        toast.error(data.error || "An error occurred. Please try again.");
        console.error("Auth error:", data);
      }
    } catch (error) {
      toast.error(
        "Could not connect to the server. Please check your connection."
      );
      console.error("Network error:", error);
    } finally {
      setIsLoading(false); // ✅ Stop loading
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white rounded-2xl shadow-2xl p-8">
          <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">
            {isLoginView ? "Welcome Back!" : "Create Account"}
          </h2>
          <p className="text-center text-gray-500 mb-8">
            {isLoginView
              ? "Sign in to continue"
              : "Get started by creating a new account"}
          </p>

          {/* ... (Toggle Switch remains the same) */}
          <div className="flex items-center justify-center mb-8">
                       {" "}
            <div className="relative flex w-full max-w-xs items-center rounded-full bg-gray-200 p-1">
                           {" "}
              <button
                onClick={() => setIsLoginView(true)}
                className={`relative z-10 w-1/2 rounded-full py-2 text-sm font-medium transition-colors ${
                  isLoginView ? "text-white" : "text-gray-600"
                }`}
              >
                                Login              {" "}
              </button>
                           {" "}
              <button
                onClick={() => setIsLoginView(false)}
                className={`relative z-10 w-1/2 rounded-full py-2 text-sm font-medium transition-colors ${
                  !isLoginView ? "text-white" : "text-gray-600"
                }`}
              >
                                Register              {" "}
              </button>
                           {" "}
              <span
                className={`absolute top-1 h-10 w-1/2 rounded-full bg-indigo-600 shadow-md transition-transform duration-300 ease-in-out
                  ${
                  isLoginView
                    ? "transform translate-x-0"
                    : "transform translate-x-full"
                }`}
              />
                         {" "}
            </div>
                     {" "}
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* ... (Input fields remain the same) */}
            {!isLoginView && (
              <div className="flex flex-col sm:flex-row gap-4">
                               {" "}
                <div className="relative sm:w-1/2">
                                   {" "}
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <UserIcon />                 {" "}
                  </div>
                                   {" "}
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    required={!isLoginView}
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-gray-300 p-3 pl-10 shadow-sm transition focus:border-indigo-500 focus:ring-indigo-500"
                  />
                                 {" "}
                </div>
                               {" "}
                <div className="relative sm:w-1/2">
                                   {" "}
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                        <UserIcon />                 {" "}
                  </div>
                                   {" "}
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    required={!isLoginView}
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-gray-300 p-3 pl-10 shadow-sm transition focus:border-indigo-500 focus:ring-indigo-500"
                  />
                                 {" "}
                </div>
                             {" "}
              </div>
            )}
                       {" "}
            <div className="relative">
                           {" "}
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <UserIcon />             {" "}
              </div>
                           {" "}
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full rounded-lg border-gray-300 p-3 pl-10 shadow-sm transition focus:border-indigo-500 focus:ring-indigo-500"
              />
                         {" "}
            </div>
                       {" "}
            <div className="relative">
                           {" "}
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                                <LockIcon />             {" "}
              </div>
                           {" "}
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full rounded-lg border-gray-300 p-3 pl-10 shadow-sm transition focus:border-indigo-500 focus:ring-indigo-500"
              />
                         {" "}
            </div>
            <button
              type="submit"
              disabled={isLoading} // ✅ Disable button when loading
              className="w-full flex justify-center items-center rounded-lg bg-indigo-600 px-6 py-3 text-white font-semibold shadow-md transition-transform transform hover:scale-105 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400 disabled:scale-100"
            >
              {/* ✅ Conditionally render spinner or text */}
              {isLoading ? (
                <>
                  <SpinnerIcon />
                  Processing...
                </>
              ) : isLoginView ? (
                "Login"
              ) : (
                "Register"
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Auth;
