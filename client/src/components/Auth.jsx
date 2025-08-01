import React, { useState } from "react";

// Icon for the user/email field
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

// Icon for the password field
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

// The main component for Authentication
const Auth = () => {
  // State to toggle between Login and Register views
  const [isLoginView, setIsLoginView] = useState(true);

  // State for form inputs
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (isLoginView) {
      console.log("Logging in with:", {
        email: formData.email,
        password: formData.password,
      });
      // Add your login API call here
    } else {
      console.log("Registering with:", formData);
      // Add your registration API call here
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

          {/* Toggle Switch */}
          <div className="flex items-center justify-center mb-8">
            <div className="relative flex w-full max-w-xs items-center rounded-full bg-gray-200 p-1">
              <button
                onClick={() => setIsLoginView(true)}
                className={`relative z-10 w-1/2 rounded-full py-2 text-sm font-medium transition-colors ${
                  isLoginView ? "text-white" : "text-gray-600"
                }`}
              >
                Login
              </button>
              <button
                onClick={() => setIsLoginView(false)}
                className={`relative z-10 w-1/2 rounded-full py-2 text-sm font-medium transition-colors ${
                  !isLoginView ? "text-white" : "text-gray-600"
                }`}
              >
                Register
              </button>
              <span
                className={`absolute top-1 h-10 w-1/2 rounded-full bg-indigo-600 shadow-md transition-transform duration-300 ease-in-out
                  ${
                    isLoginView
                      ? "transform translate-x-0"
                      : "transform translate-x-full"
                  }`}
              />
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {!isLoginView && (
              <div className="flex flex-col sm:flex-row gap-4">
                <div className="relative sm:w-1/2">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <UserIcon />
                  </div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    required={!isLoginView}
                    value={formData.firstName}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-gray-300 p-3 pl-10 shadow-sm transition focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
                <div className="relative sm:w-1/2">
                  <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                    <UserIcon />
                  </div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    required={!isLoginView}
                    value={formData.lastName}
                    onChange={handleInputChange}
                    className="w-full rounded-lg border-gray-300 p-3 pl-10 shadow-sm transition focus:border-indigo-500 focus:ring-indigo-500"
                  />
                </div>
              </div>
            )}
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <UserIcon />
              </div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                required
                value={formData.email}
                onChange={handleInputChange}
                className="w-full rounded-lg border-gray-300 p-3 pl-10 shadow-sm transition focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>
            <div className="relative">
              <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                <LockIcon />
              </div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                required
                value={formData.password}
                onChange={handleInputChange}
                className="w-full rounded-lg border-gray-300 p-3 pl-10 shadow-sm transition focus:border-indigo-500 focus:ring-indigo-500"
              />
            </div>

            <button
              type="submit"
              className="w-full rounded-lg bg-indigo-600 px-6 py-3 text-white font-semibold shadow-md transition-transform transform hover:scale-105 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              {isLoginView ? "Login" : "Register"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

// You can export this as the default component for the page
export default Auth;
