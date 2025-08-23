import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getFormSubmissions } from "../utils/submission.utils";
import { deleteForm } from "../utils/forms.utils";
import { toast } from "react-toastify";

const apiUrl = import.meta.env.VITE_SERVER_URL;

// --- SVG Icon Components ---
const EyeIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
    <path
      fillRule="evenodd"
      d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.022 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
      clipRule="evenodd"
    />
  </svg>
);

const PencilIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-1.5"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M17.414 2.586a2 2 0 00-2.828 0L7 10.172V13h2.828l7.586-7.586a2 2 0 000-2.828z" />
    <path
      fillRule="evenodd"
      d="M2 6a2 2 0 012-2h4a1 1 0 010 2H4v10h10v-4a1 1 0 112 0v4a2 2 0 01-2 2H4a2 2 0 01-2-2V6z"
      clipRule="evenodd"
    />
  </svg>
);

const TrashIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    className="h-5 w-5 mr-1.5"
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

// --- Loading Spinner ---
const Spinner = () => (
  <div className="flex justify-center items-center py-20">
    <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
  </div>
);

// --- Main FormManage Component ---
const FormManage = () => {
  const params = useParams();
  const navigate = useNavigate();
  const [submissions, setSubmissions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isCopied, setIsCopied] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      getFormSubmissions(params.formId)
        .then((data) => {
          setSubmissions(data);
        })
        .catch((err) => {
          console.error("Error fetching submissions:", err);
          setError("Failed to fetch submissions");
        });
      setLoading(false);
    };
    fetchData();
  }, [params.formId]);

  const handleViewSubmission = (submission) => {
    navigate(`/dashboard/${params.formId}/submission`, {
      state: { data: submission },
    });
  };

  const handleDeleteForm = async () => {
    if (
      window.confirm(
        "Are you sure you want to delete this entire form and all its submissions? This action cannot be undone."
      )
    ) {
      deleteForm(params.formId)
        .then(() => {
          toast.success("Form deleted successfully!");
          navigate("/dashboard");
        })
        .catch((err) => {
          console.error("Error deleting form:", err);
          setError("Failed to delete form");
          toast.error(err);
        });
    }
  };

  const handleCopyLink = () => {
    const formUrl = `${window.location.origin}/form/${params.formId}`;
    navigator.clipboard
      .writeText(formUrl)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000);
      })
      .catch((err) => console.error("Failed to copy: ", err));
  };

  if (loading) {
    return (
      <div className="min-h-screen w-full bg-gray-50 px-4 sm:px-6 pt-20">
        <Spinner />
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen w-full bg-gray-50 px-4 sm:px-6 pt-20 text-center">
        <p className="text-red-500">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen w-full bg-gray-50 pt-20 px-4 sm:px-6 py-12">
      <div className="max-w-7xl mx-auto">
        <header className="mb-8">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Submissions</h1>
              <p className="text-lg text-gray-600 mt-1">
                You have{" "}
                <span className="font-semibold text-blue-600">
                  {submissions.length}
                </span>{" "}
                total submissions.
              </p>
            </div>
            <div className="flex items-center gap-2 flex-wrap">
              <button
                onClick={handleCopyLink}
                className={`px-4 py-2 text-sm font-medium rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 ${
                  isCopied
                    ? "bg-green-500 text-white"
                    : "bg-blue-600 text-white hover:bg-blue-700 focus:ring-blue-500"
                }`}
              >
                {isCopied ? "Copied!" : "Copy Public Link"}
              </button>

              <button
                onClick={handleDeleteForm}
                className="flex items-center px-4 py-2 text-sm font-medium bg-red-600 border border-transparent rounded-md text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
              >
                <TrashIcon /> Delete Form
              </button>
            </div>
          </div>
        </header>

        <div className="bg-white shadow-lg rounded-xl overflow-hidden">
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Name
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Email
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Phone
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Submitted At
                  </th>
                  <th
                    scope="col"
                    className="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                  >
                    Actions
                  </th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {submissions.length > 0 ? (
                  submissions.map((submission) => (
                    <tr key={submission._id}>
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">
                        {submission.userInfo?.name || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {submission.userInfo?.email || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {submission.userInfo?.phone || "N/A"}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600">
                        {new Date(submission.submitedAt).toLocaleString()}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                        <button
                          onClick={() => handleViewSubmission(submission)}
                          className="flex items-center gap-2 px-3 py-2 rounded-md text-indigo-600 hover:text-indigo-900 hover:bg-indigo-50 transition-colors"
                        >
                          <EyeIcon /> View
                        </button>
                      </td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td
                      colSpan="5"
                      className="px-6 py-12 text-center text-gray-500"
                    >
                      <h2 className="text-2xl font-semibold text-gray-800">
                        No Submissions Yet
                      </h2>
                      <p className="text-gray-500 mt-2">
                        Share the form link to start collecting responses!
                      </p>
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FormManage;
