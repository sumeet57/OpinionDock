import React from "react";
import { useNavigate } from "react-router-dom";
// Assuming your FormContext is in this path
import { FormContext } from "../context/form.context";

// --- Template Data ---
// No changes needed here, but included for completeness.
const formTemplates = [
  {
    icon: "contact",
    title: "Contact Us",
    description: "Collect names, emails, and messages from your visitors.",
    multipleSubmissions: false,
    fields: [
      { id: 1, label: "Full Name", type: "text", options: [], answerKey: [] },
      {
        id: 2,
        label: "Email Address",
        type: "email",
        options: [],
        answerKey: [],
      },
      {
        id: 3,
        label: "Your Message",
        type: "textarea",
        options: [],
        answerKey: [],
      },
    ],
  },
  {
    icon: "feedback",
    title: "Product Feedback",
    description: "Gather valuable feedback and ratings on your products.",
    multipleSubmissions: true,
    fields: [
      {
        id: 1,
        label: "How would you rate our product?",
        type: "radio",
        options: ["Excellent", "Good", "Average", "Poor"],
        answerKey: [],
      },
      {
        id: 2,
        label: "What can we improve?",
        type: "textarea",
        options: [],
        answerKey: [],
      },
      {
        id: 3,
        label: "Would you recommend this product?",
        type: "radio",
        options: ["Yes", "No"],
        answerKey: [],
      },
    ],
  },
  {
    icon: "event",
    title: "Event Registration",
    description: "Register attendees for your upcoming event or webinar.",
    multipleSubmissions: false,
    fields: [
      { id: 1, label: "Full Name", type: "text", options: [], answerKey: [] },
      { id: 2, label: "Email", type: "email", options: [], answerKey: [] },
      {
        id: 3,
        label: "How did you hear about us?",
        type: "select",
        options: ["Social Media", "Friend", "Advertisement"],
        answerKey: [],
      },
    ],
  },
  {
    icon: "survey",
    title: "Satisfaction Survey",
    description: "Measure customer satisfaction with a simple survey.",
    multipleSubmissions: true,
    fields: [
      {
        id: 1,
        label: "How satisfied are you with our service?",
        type: "radio",
        options: ["Very Satisfied", "Satisfied", "Neutral", "Unsatisfied"],
        answerKey: [],
      },
      {
        id: 2,
        label: "Any suggestions for us?",
        type: "textarea",
        options: [],
        answerKey: [],
      },
    ],
  },
];

// --- Simple Icon Component (Updated for Light Theme) ---
const TemplateIcon = ({ type }) => {
  const baseClasses =
    "w-12 h-12 flex items-center justify-center rounded-lg mb-6";
  const iconStyles = {
    contact: "bg-blue-100 text-blue-600",
    feedback: "bg-purple-100 text-purple-600",
    event: "bg-emerald-100 text-emerald-600",
    survey: "bg-amber-100 text-amber-600",
    custom: "bg-slate-200 text-slate-600",
  };
  const iconContent = {
    contact: "👤",
    feedback: "⭐",
    event: "📅",
    survey: "📊",
    custom: "✨",
  };

  return (
    <div className={`${baseClasses} ${iconStyles[type]}`}>
      <span className="text-2xl">{iconContent[type]}</span>
    </div>
  );
};

const Templates = () => {
  const { setFormDetails } = React.useContext(FormContext);
  const navigate = useNavigate();

  const handleSelectTemplate = (template = null) => {
    setFormDetails({
      title: template ? template.title : "Untitled Form",
      description: template
        ? template.description
        : "This is my new form. Please fill it out.",
      multipleSubmissions: template ? template.multipleSubmissions : true,
      fields: template ? template.fields : [],
    });
    navigate("/create");
  };

  return (
    <div className="bg-slate-50 text-slate-800 min-h-screen pt-20 pb-20 px-4 sm:px-6 lg:px-8 font-sans">
      <div className="max-w-7xl mx-auto">
        {/* --- Header --- */}
        <div className="text-center mb-16">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight text-slate-900 mb-3">
            Choose Your Starting Point
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Select a professionally designed template or start from a blank
            canvas.
          </p>
        </div>

        {/* --- Template Grid --- */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {/* Card 1: Create Custom Form */}
          <button
            onClick={() => handleSelectTemplate(null)}
            className="text-left p-8 bg-white border border-slate-200/80 rounded-2xl shadow-md hover:shadow-xl hover:border-purple-400/50 transition-all duration-300 transform hover:-translate-y-1 group flex flex-col"
          >
            <TemplateIcon type="custom" />
            <h2 className="text-xl font-bold text-slate-900 mb-2">
              Create from Scratch
            </h2>
            <p className="text-slate-600 flex-grow">
              Build a unique form with your own custom fields.
            </p>
            <span className="mt-6 inline-block text-purple-600 font-semibold transition-transform duration-300 group-hover:translate-x-1">
              Start Building →
            </span>
          </button>

          {/* Map through predefined templates */}
          {formTemplates.map((template) => (
            <button
              key={template.title}
              onClick={() => handleSelectTemplate(template)}
              className="text-left p-8 bg-white border border-slate-200/80 rounded-2xl shadow-md hover:shadow-xl hover:border-blue-400/50 transition-all duration-300 transform hover:-translate-y-1 group flex flex-col"
            >
              <TemplateIcon type={template.icon} />
              <h2 className="text-xl font-bold text-slate-900 mb-2">
                {template.title}
              </h2>
              <p className="text-slate-600 flex-grow">{template.description}</p>
              <span className="mt-6 inline-block text-blue-600 font-semibold transition-transform duration-300 group-hover:translate-x-1">
                Use Template →
              </span>
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Templates;
