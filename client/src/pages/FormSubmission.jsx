import { useState, useEffect } from "react";
import { useLocation, useParams } from "react-router-dom";
import { fetchFormById } from "../utils/forms.utils";

// A simple loading spinner component
const Spinner = () => (
  <div className="flex justify-center items-center h-screen">
    <div className="animate-spin rounded-full h-32 w-32 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

// Component to render individual answer based on question type
const Answer = ({ field, submission, index }) => {
  const renderAnswerContent = () => {
    if (!submission) {
      return <p className="text-gray-500 italic">No answer submitted.</p>;
    }

    // Ensure answer is always an array for consistent mapping
    const answers = Array.isArray(submission.answer)
      ? submission.answer
      : [submission.answer];

    if (answers.length === 0 || answers[0] === "") {
      return <p className="text-gray-500 italic">No answer submitted.</p>;
    }

    switch (field.type) {
      case "text":
      case "textarea":
      case "email":
      case "tel":
      case "date":
      case "number":
        return <p className="text-gray-800">{answers.join(", ")}</p>;
      case "select":
      case "radio":
        return <p className="text-gray-800">{answers.join(", ")}</p>;
      case "checkbox":
        return (
          <ul className="list-disc list-inside">
            {answers.map((ans, i) => (
              <li key={i} className="text-gray-800">
                {ans}
              </li>
            ))}
          </ul>
        );
      default:
        return <p className="text-gray-800">{answers.join(", ")}</p>;
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h3 className="text-lg font-semibold text-gray-800 mb-4">
        <span className="text-blue-600 font-bold mr-2">{index + 1}.</span>
        {field.label}
      </h3>
      <div className="pl-6 border-l-2 border-blue-200">
        <p className="text-sm font-medium text-gray-500 mb-2">Answer:</p>
        {renderAnswerContent()}
      </div>
    </div>
  );
};

const FormSubmission = () => {
  const { formId } = useParams();
  const location = useLocation();
  // The submission data is expected to be in location.state.data
  const submissionData = location.state?.data;

  const [formData, setFormData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFormById(formId)
      .then((data) => {
        setFormData(data);
      })
      .catch((err) => {
        console.error("Error fetching form data:", err);
        setError("Failed to fetch form data");
      });
    setLoading(false);
  }, [formId]);

  // Create a map for quick lookup of answers by fieldId
  const answersMap = new Map(
    submissionData?.answers?.map((ans) => [ans.fieldId, ans])
  );

  // Safely create a date object
  const submittedDate = submissionData?.submitedAt
    ? new Date(submissionData.submitedAt)
    : null;

  if (loading) {
    return <Spinner />;
  }

  if (error) {
    return <div className="text-center py-20 text-red-500">Error: {error}</div>;
  }

  if (!formData || !submissionData) {
    return (
      <div className="text-center py-20 text-gray-500">
        No form or submission data available.
      </div>
    );
  }

  return (
    <div className="bg-gray-50 min-h-screen">
      <div className="container mx-auto px-4 py-8 sm:py-12 lg:py-16">
        <div className="max-w-3xl mx-auto">
          <div className="bg-white shadow-lg rounded-xl p-8 mb-8">
            <h1 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-2">
              {formData.title}
            </h1>
            <p className="text-gray-600 text-base sm:text-lg">
              {formData.description}
            </p>
            <hr className="my-6" />
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between text-sm text-gray-500">
              {submissionData.userInfo && (
                <div className="mb-2 sm:mb-0">
                  <span className="font-semibold">Submitted by: </span>
                  {submissionData.userInfo.name} (
                  {submissionData.userInfo.email})
                </div>
              )}
              <div>
                <span className="font-semibold">Submitted on: </span>
                {submittedDate && !isNaN(submittedDate)
                  ? submittedDate.toLocaleString()
                  : "N/A"}
              </div>
            </div>
          </div>

          <div className="space-y-6">
            {formData.fields.map((field, index) => (
              <Answer
                key={field.id}
                field={field}
                submission={answersMap.get(field.id)}
                index={index}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormSubmission;
