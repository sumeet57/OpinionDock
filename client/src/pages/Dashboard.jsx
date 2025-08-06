import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchForms } from "../utils/forms.utils";
import { toast } from "react-toastify";

const Dashboard = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState([]);

  useEffect(() => {
    fetchForms()
      .then((data) => {
        setFormData(data);
      })
      .catch((error) => {
        console.error("Error fetching forms:", error);
        toast.error("Failed to fetch forms");
      });
  }, []);

  const [filterType, setFilterType] = useState("none");

  const filteredData = [...formData].sort((a, b) => {
    if (filterType === "date")
      return new Date(b.createdAt) - new Date(a.createdAt);
    if (filterType === "submissions") return b.submissions - a.submissions;
    if (filterType === "formid") return a.id.localeCompare(b.id);
    return 0;
  });

  return (
    <div className="min-h-screen bg-gray-50 px-6 pt-20 text-gray-800">
      {/* HEADER */}
      <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-600">
            Manage your forms and view submissions
          </p>
        </div>
        <button
          onClick={() => navigate("/create")}
          className="rounded-xl bg-blue-600 px-5 py-3 text-white shadow-md transition hover:bg-blue-700"
        >
          + Create New Form
        </button>
      </header>

      {/* FILTER SECTION */}
      <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
        <h2 className="text-xl font-semibold">Your Forms</h2>
        <div className="flex flex-wrap items-center gap-2">
          <label className="text-sm font-medium text-gray-700">Sort by:</label>
          <select
            className="rounded-lg border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none"
            value={filterType}
            onChange={(e) => setFilterType(e.target.value)}
          >
            <option value="none">None</option>
            <option value="date">Date (Newest)</option>
            <option value="submissions">Submissions (High → Low)</option>
            <option value="formid">Form ID (A → Z)</option>
          </select>
        </div>
      </div>

      {/* FORM GRID */}
      <div className="max-h-[65vh] overflow-y-auto pr-1">
        {filteredData?.length > 0 ? (
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredData.map((form, i) => (
              <div
                key={i}
                className="rounded-2xl border border-gray-200 bg-white p-5 shadow-sm transition hover:shadow-md"
              >
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold">{form.title}</h3>
                  <span className="text-xs text-gray-400">#{form.id}</span>
                </div>
                <p className="mb-3 mt-2 text-sm text-gray-600">
                  {form.description}
                </p>
                <div className="flex items-center justify-between text-sm text-gray-500">
                  <span>{form.submissions} submissions</span>
                  <span>{form.createdAt}</span>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500">No forms available.</p>
        )}
      </div>
    </div>
  );
};

export default Dashboard;
