import React, { useState, useEffect, useContext, createContext } from "react";
import { FormContext } from "../context/form.context";
import { submitForm } from "../utils/forms.utils";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
// Default structure for a new form field

const apiUrl = import.meta.env.VITE_SERVER_URL;

const defaultField = {
  // ID is now set sequentially
  label: "",
  type: "text",
  options: [],
  answerKey: [],
};

// Icon components for a cleaner UI
const PlusIcon = ({ className = "h-5 w-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M10 3a1 1 0 011 1v5h5a1 1 0 110 2h-5v5a1 1 0 11-2 0v-5H4a1 1 0 110-2h5V4a1 1 0 011-1z"
      clipRule="evenodd"
    />
  </svg>
);

const SaveIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-2"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M7.707 10.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 12.586V5a1 1 0 00-2 0v7.586l-1.293-1.293zM5 3a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2V5a2 2 0 00-2-2H5z" />
  </svg>
);

const TrashIcon = ({ className = "h-5 w-5" }) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className={className}
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M9 2a1 1 0 00-.894.553L7.382 4H4a1 1 0 000 2v10a2 2 0 002 2h8a2 2 0 002-2V6a1 1 0 100-2h-3.382l-.724-1.447A1 1 0 0011 2H9zM7 8a1 1 0 012 0v6a1 1 0 11-2 0V8zm4 0a1 1 0 012 0v6a1 1 0 11-2 0V8z"
      clipRule="evenodd"
    />
  </svg>
);

const FormCreation = () => {
  const navigate = useNavigate();
  const { formDetails, setFormDetails } = useContext(FormContext);

  const [formType, setFormType] = useState("normal");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentFieldForAnswer, setCurrentFieldForAnswer] = useState(null);

  const handleAddField = () => {
    const isQuiz = formType === "quiz";
    const newFieldType = isQuiz ? "radio" : "text";
    const newFieldOptions =
      newFieldType === "radio" || newFieldType === "checkbox"
        ? ["Option 1"]
        : [];

    // ✅ ID GENERATION: Create a new ID that is one greater than the highest existing ID.
    const newId =
      formDetails.fields.length > 0
        ? Math.max(...formDetails.fields.map((f) => f.id)) + 1
        : 1;

    setFormDetails((prev) => ({
      ...prev,
      fields: [
        ...prev.fields,
        {
          ...defaultField,
          id: newId,
          label: `Question ${prev.fields.length + 1}`,
          type: newFieldType,
          options: newFieldOptions,
        },
      ],
    }));
  };

  const handleRemoveField = (id) => {
    setFormDetails((prev) => ({
      ...prev,
      fields:
        prev.fields.length > 1
          ? prev.fields.filter((field) => field.id !== id)
          : prev.fields,
    }));
  };

  const handleFieldChange = (id, key, value) => {
    const updatedFields = formDetails.fields.map((field) => {
      if (field.id === id) {
        const newField = { ...field, [key]: value };
        if (key === "type") {
          newField.answerKey = [];
          if (value === "radio" || value === "checkbox") {
            newField.options = ["Option 1"];
          } else {
            newField.options = [];
          }
        }
        return newField;
      }
      return field;
    });
    setFormDetails((prev) => ({ ...prev, fields: updatedFields }));
  };

  const handleOptionChange = (fieldId, optionIndex, value) => {
    const updatedFields = formDetails.fields.map((field) => {
      if (field.id === fieldId) {
        const newOptions = [...field.options];
        newOptions[optionIndex] = value;
        return { ...field, options: newOptions };
      }
      return field;
    });
    setFormDetails((prev) => ({ ...prev, fields: updatedFields }));
  };

  const handleAddOption = (fieldId) => {
    const updatedFields = formDetails.fields.map((field) => {
      if (field.id === fieldId) {
        const newOptions = [
          ...field.options,
          `Option ${field.options.length + 1}`,
        ];
        return { ...field, options: newOptions };
      }
      return field;
    });
    setFormDetails((prev) => ({ ...prev, fields: updatedFields }));
  };

  const handleRemoveOption = (fieldId, optionIndex) => {
    const updatedFields = formDetails.fields.map((field) => {
      if (field.id === fieldId) {
        const newOptions = field.options.filter((_, i) => i !== optionIndex);
        const newAnswerKey = field.answerKey.filter(
          (ans) => ans !== field.options[optionIndex]
        );
        return { ...field, options: newOptions, answerKey: newAnswerKey };
      }
      return field;
    });
    setFormDetails((prev) => ({ ...prev, fields: updatedFields }));
  };

  const openAnswerModal = (field) => {
    setCurrentFieldForAnswer(field);
    setIsModalOpen(true);
  };

  const handleSaveAnswerKey = (newAnswerKey) => {
    if (currentFieldForAnswer) {
      handleFieldChange(currentFieldForAnswer.id, "answerKey", newAnswerKey);
    }
    setIsModalOpen(false);
    setCurrentFieldForAnswer(null);
  };

  const handleSaveForm = () => {
    console.log("Form Data to be saved:", JSON.stringify(formDetails, null, 2));

    // Here you would typically send the formDetails to your backend API
    submitForm(formDetails)
      .then((Response) => {
        toast.success(Response.message);
        navigate("/dashboard");
      })
      .catch((error) => {
        console.error("Error submitting form:", error);
        toast.error("Failed to create form. Please try again.");
      });
  };

  const inputTypes =
    formType === "quiz"
      ? ["radio", "checkbox", "number"]
      : [
          "text",
          "textarea",
          "number",
          "date",
          "time",
          "datetime-local",
          "radio",
          "checkbox",
        ];

  return (
    <div className="min-h-screen bg-gray-50 font-sans pt-16">
      <div className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8">
        <div className="bg-white p-8 rounded-2xl shadow-lg mb-8">
          <h1 className="text-4xl font-bold mb-2 text-gray-800 text-center">
            Create Your Form
          </h1>
          <p className="text-center text-gray-500 mb-8">
            Build a normal form or an engaging quiz with ease.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <input
              type="text"
              placeholder="Form Title"
              className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm p-3 w-full transition"
              value={formDetails.title}
              onChange={(e) =>
                setFormDetails({ ...formDetails, title: e.target.value })
              }
            />
            <textarea
              placeholder="Form Description"
              className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm p-3 w-full transition md:col-span-2"
              rows="3"
              value={formDetails.description}
              onChange={(e) =>
                setFormDetails({ ...formDetails, description: e.target.value })
              }
            ></textarea>
          </div>
          <div className="flex flex-wrap gap-6 items-center justify-center">
            <div className="flex items-center gap-3">
              <span className="font-medium text-gray-700">Form Type:</span>
              <select
                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm p-2 transition"
                value={formType}
                onChange={(e) => setFormType(e.target.value)}
              >
                <option value="normal">Normal</option>
                <option value="quiz">Quiz</option>
              </select>
            </div>
            <label className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-500 transition"
                checked={formDetails.multipleSubmissions}
                onChange={(e) =>
                  setFormDetails({
                    ...formDetails,
                    multipleSubmissions: e.target.checked,
                  })
                }
              />
              <span className="text-gray-700">Allow Multiple Submissions</span>
            </label>
          </div>
        </div>

        {formDetails.fields.map((field, idx) => (
          <div
            key={field.id}
            className="bg-white border border-gray-200 p-6 rounded-2xl mb-6 shadow-md transition-shadow hover:shadow-lg relative"
          >
            <div className="flex flex-col gap-4">
              <div className="flex items-center gap-4">
                <span className="text-xl font-bold text-indigo-600">
                  {idx + 1}
                </span>
                <input
                  type="text"
                  placeholder={`Question Label`}
                  className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm p-3 w-full transition"
                  value={field.label}
                  onChange={(e) =>
                    handleFieldChange(field.id, "label", e.target.value)
                  }
                />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-500 mb-1">
                    Question Type
                  </label>
                  <select
                    className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm p-3 w-full transition"
                    value={field.type}
                    onChange={(e) =>
                      handleFieldChange(field.id, "type", e.target.value)
                    }
                  >
                    {inputTypes.map((type) => (
                      <option key={type} value={type} className="capitalize">
                        {type}
                      </option>
                    ))}
                  </select>
                </div>
              </div>

              {(field.type === "radio" || field.type === "checkbox") && (
                <div className="pl-10">
                  <label className="block text-sm font-medium text-gray-500 mb-2">
                    Options
                  </label>
                  <div className="space-y-2">
                    {field.options.map((option, optionIdx) => (
                      <div key={optionIdx} className="flex items-center gap-2">
                        <input
                          type={field.type === "radio" ? "radio" : "checkbox"}
                          className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                          disabled
                        />
                        <input
                          type="text"
                          value={option}
                          onChange={(e) =>
                            handleOptionChange(
                              field.id,
                              optionIdx,
                              e.target.value
                            )
                          }
                          className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm p-2 w-full transition"
                        />
                        <button
                          onClick={() =>
                            handleRemoveOption(field.id, optionIdx)
                          }
                          className="text-gray-400 hover:text-red-500 p-1 rounded-full hover:bg-red-100 transition"
                        >
                          <TrashIcon className="h-4 w-4" />
                        </button>
                      </div>
                    ))}
                    <button
                      onClick={() => handleAddOption(field.id)}
                      className="flex items-center gap-2 text-sm text-indigo-600 hover:text-indigo-800 font-medium py-2 px-3 rounded-lg hover:bg-indigo-50 transition"
                    >
                      <PlusIcon className="h-4 w-4" />
                      Add Option
                    </button>
                  </div>
                </div>
              )}

              {formType === "quiz" && (
                <div className="border-t border-gray-200 pt-4 mt-2 flex justify-end items-center gap-4">
                  <p className="text-sm text-gray-600 mr-auto">
                    Answer:{" "}
                    <span className="font-semibold text-green-700">
                      {field.answerKey.join(", ") || "Not set"}
                    </span>
                  </p>
                  <button
                    onClick={() => openAnswerModal(field)}
                    className="bg-green-100 text-green-800 px-4 py-2 rounded-lg hover:bg-green-200 transition-colors text-sm font-medium disabled:opacity-50 disabled:cursor-not-allowed"
                    disabled={
                      !["radio", "checkbox", "number"].includes(field.type) ||
                      (["radio", "checkbox"].includes(field.type) &&
                        field.options.length === 0)
                    }
                  >
                    Set Answer
                  </button>
                </div>
              )}
            </div>
            {formDetails.fields.length > 1 && (
              <button
                onClick={() => handleRemoveField(field.id)}
                className="absolute top-4 right-4 text-gray-400 hover:text-red-600 transition-colors"
                aria-label="Remove question"
              >
                <TrashIcon />
              </button>
            )}
          </div>
        ))}

        <div className="flex gap-4 mt-6">
          <button
            onClick={handleAddField}
            className="flex items-center justify-center bg-indigo-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-transform transform hover:scale-105"
          >
            <PlusIcon className="h-5 w-5 mr-2" /> Add Question
          </button>
          <button
            onClick={handleSaveForm}
            className="flex items-center justify-center bg-green-600 text-white px-6 py-3 rounded-lg shadow-md hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 transition-transform transform hover:scale-105"
          >
            <SaveIcon /> Save Form
          </button>
        </div>

        {isModalOpen && currentFieldForAnswer && (
          <AnswerKeyModal
            field={currentFieldForAnswer}
            onClose={() => setIsModalOpen(false)}
            onSave={handleSaveAnswerKey}
          />
        )}
      </div>
    </div>
  );
};

// Modal Component for Setting the Answer Key
const AnswerKeyModal = ({ field, onClose, onSave }) => {
  const [currentAnswer, setCurrentAnswer] = useState(field.answerKey || []);

  const handleCheckboxChange = (option) => {
    setCurrentAnswer((prev) =>
      prev.includes(option)
        ? prev.filter((item) => item !== option)
        : [...prev, option]
    );
  };

  const handleSave = () => {
    onSave(currentAnswer);
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md transform transition-all">
        <h2 className="text-2xl font-bold text-gray-800 mb-4">
          Set Answer for "{field.label}"
        </h2>

        <div className="space-y-4">
          {field.type === "radio" &&
            field.options.map((option, idx) => (
              <label
                key={idx}
                className="flex items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition"
              >
                <input
                  type="radio"
                  name="answerKey"
                  value={option}
                  checked={currentAnswer[0] === option}
                  onChange={() => setCurrentAnswer([option])}
                  className="h-5 w-5 text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <span className="ml-3 text-gray-700">{option}</span>
              </label>
            ))}

          {field.type === "checkbox" &&
            field.options.map((option, idx) => (
              <label
                key={idx}
                className="flex items-center p-3 rounded-lg hover:bg-gray-100 cursor-pointer transition"
              >
                <input
                  type="checkbox"
                  value={option}
                  checked={currentAnswer.includes(option)}
                  onChange={() => handleCheckboxChange(option)}
                  className="h-5 w-5 rounded text-indigo-600 focus:ring-indigo-500 border-gray-300"
                />
                <span className="ml-3 text-gray-700">{option}</span>
              </label>
            ))}

          {field.type === "number" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">
                Correct Number
              </label>
              <input
                type="number"
                className="border-gray-300 focus:border-indigo-500 focus:ring-indigo-500 rounded-lg shadow-sm p-3 w-full transition"
                value={currentAnswer[0] || ""}
                onChange={(e) => setCurrentAnswer([e.target.value])}
              />
            </div>
          )}
        </div>

        <div className="mt-8 flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition"
          >
            Cancel
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition"
          >
            Save Answer
          </button>
        </div>
      </div>
    </div>
  );
};

export default FormCreation;
