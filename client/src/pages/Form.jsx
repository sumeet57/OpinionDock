import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

// const apiUrl = import.meta.env.VITE_SERVER_URL;
const apiUrl = import.meta.env.VITE_SERVER_URL;

// --- Helper Components ---

const Spinner = () => (
  <div className="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-white"></div>
);

const FieldLabel = ({ children, required }) => (
  <label className="block text-sm font-medium text-gray-700 mb-2 capitalize">
    {children}
    {required && <span className="text-red-500 ml-1">*</span>}
  </label>
);

// --- Dynamic Input Renderer ---

const FormField = ({ field, value, handleChange }) => {
  const commonClasses =
    "block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm";

  switch (field.type) {
    case "text":
    case "email":
    case "tel":
    case "number":
    case "date":
      return (
        <div>
          <FieldLabel required={field.required}>{field.label}</FieldLabel>
          <input
            type={field.type}
            name={field.id}
            id={field.id}
            required={field.required}
            value={value || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            className={commonClasses}
          />
        </div>
      );
    case "textarea":
      return (
        <div>
          <FieldLabel required={field.required}>{field.label}</FieldLabel>
          <textarea
            name={field.id}
            id={field.id}
            rows="4"
            required={field.required}
            value={value || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            className={commonClasses}
          ></textarea>
        </div>
      );
    case "select":
      return (
        <div>
          <FieldLabel required={field.required}>{field.label}</FieldLabel>
          <select
            name={field.id}
            id={field.id}
            required={field.required}
            value={value || ""}
            onChange={(e) => handleChange(field.id, e.target.value)}
            className={commonClasses}
          >
            <option value="" disabled>
              Select an option
            </option>
            {field.options.map((option) => (
              <option key={option} value={option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      );
    case "radio":
      return (
        <div>
          <FieldLabel required={field.required} className="capitalize">
            {field.label}
          </FieldLabel>
          <div className="space-y-3">
            {field.options.map((option) => (
              <label
                key={option}
                className="flex items-center p-3 border border-gray-200 rounded-md has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-400 transition-colors"
              >
                <input
                  type="radio"
                  name={field.id}
                  value={option}
                  checked={value === option}
                  onChange={(e) => handleChange(field.id, e.target.value)}
                  className="h-4 w-4 text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <span className="ml-3 text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>
      );
    case "checkbox":
      return (
        <div>
          <FieldLabel required={field.required}>{field.label}</FieldLabel>
          <div className="space-y-3">
            {field.options.map((option) => (
              <label
                key={option}
                className="flex items-center p-3 border border-gray-200 rounded-md has-[:checked]:bg-indigo-50 has-[:checked]:border-indigo-400 transition-colors"
              >
                <input
                  type="checkbox"
                  name={field.id}
                  value={option}
                  checked={value?.includes(option) || false}
                  onChange={(e) => {
                    const currentValues = value || [];
                    const newValue = e.target.checked
                      ? [...currentValues, option]
                      : currentValues.filter((v) => v !== option);
                    handleChange(field.id, newValue);
                  }}
                  className="h-4 w-4 rounded text-indigo-600 border-gray-300 focus:ring-indigo-500"
                />
                <span className="ml-3 text-sm text-gray-700">{option}</span>
              </label>
            ))}
          </div>
        </div>
      );
    default:
      return null;
  }
};

// --- Main Form Component ---

const Form = () => {
  const { formId } = useParams();
  const navigate = useNavigate();

  const [formStructure, setFormStructure] = useState(null);
  const [userInfo, setUserInfo] = useState({ name: "", email: "", phone: "" });
  const [answers, setAnswers] = useState({});

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    const fetchForm = async () => {
      try {
        const response = await fetch(`${apiUrl}/api/forms/${formId}`);
        if (!response.ok)
          throw new Error("Could not fetch the form. The link may be invalid.");
        const data = await response.json();
        setFormStructure(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };
    fetchForm();
  }, [formId]);

  const handleUserInfoChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  const handleAnswerChange = (fieldId, value) => {
    setAnswers((prev) => ({ ...prev, [fieldId]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);

    const submissionData = {
      userInfo,
      answers: Object.entries(answers).map(([fieldId, answer]) => ({
        fieldId: parseInt(fieldId, 10), // Ensure fieldId is a number if required by backend
        answer,
      })),
    };

    try {
      const response = await fetch(`${apiUrl}/api/submissions/${formId}`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(submissionData),
        credentials: "include",
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Failed to submit the form.");
      }

      setSuccess(true);
      setTimeout(() => navigate("/"), 3000); // Redirect to homepage or a thank you page after 3s
    } catch (err) {
      setError(err.message);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <Spinner />
      </div>
    );
  }

  if (error && !formStructure) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-center text-red-500 px-4">
        {error}
      </div>
    );
  }

  if (success) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 text-center px-4">
        <div className="bg-white p-10 rounded-xl shadow-lg">
          <h2 className="text-2xl font-bold text-green-600">Thank You!</h2>
          <p className="text-gray-700 mt-2">
            Your submission has been received.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center pt-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-2xl w-full">
        {formStructure && (
          <div className="text-center mb-8">
            <h1 className="text-4xl font-extrabold text-gray-900">
              {formStructure.title}
            </h1>
            <p className="mt-2 text-lg text-gray-600">
              {formStructure.description}
            </p>
          </div>
        )}

        <form
          onSubmit={handleSubmit}
          className="bg-white p-8 rounded-2xl shadow-lg space-y-8"
        >
          {/* User Info Section */}
          <div className="space-y-6 border-b border-gray-200 pb-8">
            <h2 className="text-xl font-semibold text-gray-800">
              Your Information
            </h2>
            <div>
              <FieldLabel required>Full Name</FieldLabel>
              <input
                type="text"
                name="name"
                value={userInfo.name}
                onChange={handleUserInfoChange}
                required
                className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <FieldLabel required>Email Address</FieldLabel>
              <input
                type="email"
                name="email"
                value={userInfo.email}
                onChange={handleUserInfoChange}
                required
                className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
              />
            </div>
            <div>
              <FieldLabel required>Phone Number</FieldLabel>
              <input
                type="tel"
                name="phone"
                value={userInfo.phone}
                onChange={handleUserInfoChange}
                required
                className="block w-full px-3 py-2 bg-white border border-gray-300 rounded-md shadow-sm"
              />
            </div>
          </div>

          {/* Dynamic Fields Section */}
          <div className="space-y-6">
            {formStructure?.fields.map((field) => (
              <FormField
                key={field.id}
                field={field}
                value={answers[field.id]}
                handleChange={handleAnswerChange}
              />
            ))}
          </div>

          {/* Submission Button & Messages */}
          <div>
            {error && (
              <p className="text-sm text-red-600 text-center mb-4">{error}</p>
            )}
            <button
              type="submit"
              disabled={submitting}
              className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400"
            >
              {submitting ? <Spinner /> : "Submit Response"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;
