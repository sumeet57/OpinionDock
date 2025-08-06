import React, { useContext } from "react";
import { userContext } from "../context/user.context.jsx"; // Adjust path as needed
import { FiMail, FiUser, FiEdit } from "react-icons/fi";

const Profile = () => {
  // 1. Get user data from the context
  const { user } = useContext(userContext);

  // 2. Handle loading state
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-500">
          Loading Profile...
        </div>
      </div>
    );
  }

  // 3. Generate initials for the avatar
  const initials =
    user.firstName && user.lastName
      ? `${user.firstName[0]}${user.lastName[0]}`.toUpperCase()
      : "?";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 transform transition-all hover:scale-105 duration-300">
        {/* Profile Avatar & Name */}
        <div className="flex flex-col items-center space-y-4">
          <div className="w-28 h-28 bg-indigo-500 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
            {initials}
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">
              {user.firstName} {user.lastName}
            </h2>
            <div className="flex items-center justify-center mt-2 text-gray-500">
              <FiMail className="mr-2" />
              <p>{user.email}</p>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-200" />

        {/* User Details Section */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700 flex items-center">
            <FiUser className="mr-3 text-indigo-500" />
            Account Details
          </h3>
          <div className="text-md text-gray-600 space-y-3">
            <div className="flex justify-between">
              <span className="font-medium">First Name:</span>
              <span>{user.firstName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Last Name:</span>
              <span>{user.lastName}</span>
            </div>
            <div className="flex justify-between">
              <span className="font-medium">Email Address:</span>
              <span>{user.email}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <div className="mt-8">
          <button className="w-full flex items-center justify-center py-3 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold text-center transition-colors duration-300 shadow-md">
            <FiEdit className="mr-2" />
            Edit Profile
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
