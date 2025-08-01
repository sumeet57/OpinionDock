import { useState } from "react";

const Dashboard = () => {
  const [formData, setFormData] = useState([
    {
      id: "001",
      title: "Feedback Form",
      description: "Collect user feedback for product improvement.",
      createdAt: "2025-07-25",
      submissions: 24,
    },
    {
      id: "002",
      title: "Registration Form",
      description: "Capture user registration details.",
      createdAt: "2025-07-27",
      submissions: 10,
    },
    {
      id: "003",
      title: "Survey Form",
      description: "Survey for product research and evaluation.",
      createdAt: "2025-07-28",
      submissions: 42,
    },
    {
      id: "004",
      title: "Contact Form",
      description: "Allow users to get in touch with us.",
      createdAt: "2025-07-29",
      submissions: 15,
    },
    {
      id: "005",
      title: "Feedback Form 2",
      description: "Another feedback form for different product.",
      createdAt: "2025-07-30",
      submissions: 30,
    },
    {
      id: "006",
      title: "Event Registration",
      description: "Register users for upcoming events.",
      createdAt: "2025-07-31",
      submissions: 5,
    },
    {
      id: "007",
      title: "Newsletter Signup",
      description: "Sign up users for our newsletter.",
      createdAt: "2025-08-01",
      submissions: 20,
    },
    {
      id: "008",
      title: "Product Feedback",
      description: "Feedback on the latest product release.",
      createdAt: "2025-08-02",
      submissions: 18,
    },
    {
      id: "009",
      title: "Service Feedback",
      description: "Feedback on our customer service experience.",
      createdAt: "2025-08-03",
      submissions: 12,
    },
    {
      id: "010",
      title: "Feature Request",
      description: "Collect user requests for new features.",
      createdAt: "2025-08-04",
      submissions: 8,
    },
    {
      id: "011",
      title: "Bug Report",
      description: "Allow users to report bugs in the application.",
      createdAt: "2025-08-05",
      submissions: 22,
    },
    {
      id: "012",
      title: "General Inquiry",
      description: "General inquiries from users.",
      createdAt: "2025-08-06",
      submissions: 14,
    },
    {
      id: "013",
      title: "Product Review",
      description: "Collect reviews for our products.",
      createdAt: "2025-08-07",
      submissions: 16,
    },
    {
      id: "014",
      title: "Service Satisfaction",
      description: "Measure satisfaction with our services.",
      createdAt: "2025-08-08",
      submissions: 9,
    },
    {
      id: "015",
      title: "Event Feedback",
      description: "Feedback on recent events we hosted.",
      createdAt: "2025-08-09",
      submissions: 11,
    },
    {
      id: "016",
      title: "User Experience Survey",
      description: "Survey to improve user experience on our platform.",
      createdAt: "2025-08-10",
      submissions: 27,
    },
    {
      id: "017",
      title: "Content Feedback",
      description: "Feedback on our content and articles.",
      createdAt: "2025-08-11",
      submissions: 19,
    },
    {
      id: "018",
      title: "Feature Usage",
      description: "Understand how users are using our features.",
      createdAt: "2025-08-12",
      submissions: 13,
    },
    {
      id: "019",
      title: "Customer Satisfaction",
      description: "Measure overall customer satisfaction.",
      createdAt: "2025-08-13",
      submissions: 21,
    },
    {
      id: "020",
      title: "Product Improvement Ideas",
      description: "Collect ideas for improving our products.",
      createdAt: "2025-08-14",
      submissions: 17,
    },
  ]);

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
        <button className="rounded-xl bg-blue-600 px-5 py-3 text-white shadow-md transition hover:bg-blue-700">
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
            {filteredData.map((form) => (
              <div
                key={form.id}
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
