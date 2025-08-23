import React, { useContext, useState, useEffect } from "react";
import { userContext } from "../context/user.context.jsx"; // Adjust path as needed
import { FiMail, FiUser, FiSave, FiXCircle, FiEdit } from "react-icons/fi";
import { toast } from "react-toastify";
import { logoutUser, updateUser } from "../utils/fetchUser.js";

const Profile = () => {
  // 1. Get user data from the context
  const { user } = useContext(userContext);

  // 2. State for managing edit mode and form data
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  // 3. Effect to populate form data when user context is loaded/updated
  useEffect(() => {
    if (user) {
      setFormData({
        firstName: user.firstName || "",
        lastName: user.lastName || "",
        email: user.email || "",
      });
    }
  }, [user]); // This effect runs whenever the 'user' object changes

  // 4. Handle loading state
  if (!user) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-xl font-semibold text-gray-500">
          Loading Profile...
        </div>
      </div>
    );
  }

  // 5. Handlers for form actions
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = () => {
    updateUser(formData)
      .then((updatedUser) => {
        if (updatedUser) {
          toast.success("Profile updated successfully!");
          setIsEditing(false);
        } else {
          toast.error("Failed to update profile. Please try again.");
        }
      })
      .catch((err) => {
        toast.error("An error occurred : " + err.message);
      });
  };

  const handleCancel = () => {
    // Reset form data to original user data and exit edit mode
    setFormData({
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    });
    setIsEditing(false);
  };

  // Generate initials from form data for a responsive UI
  const initials =
    formData.firstName && formData.lastName
      ? `${formData.firstName[0]}${formData.lastName[0]}`.toUpperCase()
      : "?";

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white rounded-2xl shadow-2xl p-8 transition-all duration-300">
        {/* Profile Avatar & Name */}
        <div className="flex flex-col items-center space-y-4">
          <div className="w-28 h-28 bg-indigo-500 rounded-full flex items-center justify-center text-white text-4xl font-bold shadow-lg">
            {initials}
          </div>
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-800">
              {formData.firstName} {formData.lastName}
            </h2>
            <div className="flex items-center justify-center mt-2 text-gray-500">
              <FiMail className="mr-2" />
              <p>{formData.email}</p>
            </div>
          </div>
        </div>

        <hr className="my-8 border-gray-200" />

        {/* User Details Section with Input Fields */}
        <div className="space-y-4">
          <h3 className="text-xl font-semibold text-gray-700 flex items-center">
            <FiUser className="mr-3 text-indigo-500" />
            Account Details
          </h3>
          <div className="space-y-4">
            {/* First Name Input */}
            <div>
              <label className="text-sm font-medium text-gray-500">
                First Name
              </label>
              <input
                type="text"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
            {/* Last Name Input */}
            <div>
              <label className="text-sm font-medium text-gray-500">
                Last Name
              </label>
              <input
                type="text"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                disabled={!isEditing}
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 transition-colors disabled:bg-gray-100 disabled:cursor-not-allowed"
              />
            </div>
            {/* Email Input - Often emails are not editable */}
            <div>
              <label className="text-sm font-medium text-gray-500">
                Email Address
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                disabled // Typically, email is a unique identifier and not editable
                className="w-full mt-1 p-2 border border-gray-300 rounded-md shadow-sm bg-gray-100 cursor-not-allowed"
              />
            </div>
          </div>
        </div>

        {/* Action Buttons with Conditional Rendering */}
        <div className="mt-8 space-y-3">
          {isEditing ? (
            // Buttons shown in Edit Mode
            <div className="flex gap-4">
              <button
                onClick={handleSave}
                className="w-full flex items-center justify-center py-3 px-4 bg-green-600 hover:bg-green-700 rounded-lg text-white font-semibold transition-colors duration-300 shadow-md"
              >
                <FiSave className="mr-2" />
                Save Changes
              </button>
              <button
                onClick={handleCancel}
                className="w-full flex items-center justify-center py-3 px-4 bg-gray-500 hover:bg-gray-600 rounded-lg text-white font-semibold transition-colors duration-300 shadow-md"
              >
                <FiXCircle className="mr-2" />
                Cancel
              </button>
            </div>
          ) : (
            // Button shown in View Mode
            <button
              onClick={handleEdit}
              className="w-full flex items-center justify-center py-3 px-4 bg-indigo-600 hover:bg-indigo-700 rounded-lg text-white font-semibold transition-colors duration-300 shadow-md"
            >
              <FiEdit className="mr-2" />
              Edit Profile
            </button>
          )}

          {/* Logout Button (always visible) */}
          <button
            onClick={() => {
              logoutUser()
                .then(() => {
                  window.location.reload();
                })
                .catch((err) => {
                  toast.error("Failed to logout: " + err.message);
                });
            }}
            className="w-full flex items-center justify-center py-3 px-4 bg-red-600 hover:bg-red-700 rounded-lg text-white font-semibold transition-colors duration-300 shadow-md"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
