// LandingPage.jsx
import React from "react";
import { Link, useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();
  return (
    <div className="bg-white text-gray-800">
      {/* Hero */}
      <section className="text-center py-20 px-4 bg-gradient-to-br from-indigo-50 to-white">
        <h2 className="text-4xl md:text-5xl font-bold mb-4">
          Collect Feedback with Ease
        </h2>
        <p className="text-lg md:text-xl text-gray-600 max-w-2xl mx-auto mb-8">
          OpinionDock helps you create simple, effective feedback forms and
          analyze user responses with zero hassle.
        </p>
        <button
          onClick={() => navigate("/create")}
          className="bg-indigo-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
        >
          Get Started Free
        </button>
      </section>

      {/* Features */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">
            Why Choose OpinionDock?
          </h3>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                title: "No Login Required",
                desc: "Start collecting feedback without forcing users to sign in or create an account.",
              },
              {
                title: "Simple Form Builder",
                desc: "Build your custom form with a clean and intuitive interface.",
              },
              {
                title: "Submission Insights",
                desc: "Get quick stats on how many responses your form received.",
              },
              {
                title: "Mobile Responsive",
                desc: "Access and fill forms from any device—seamlessly and comfortably.",
              },
              {
                title: "Fast & Lightweight",
                desc: "Minimalist design that works smoothly even on low-end devices.",
              },
              {
                title: "Privacy First",
                desc: "We don’t store unnecessary data—only what you need for feedback.",
              },
            ].map((feature, i) => (
              <div
                key={i}
                className="border rounded-xl p-6 hover:shadow-lg transition"
              >
                <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                <p className="text-gray-600">{feature.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section id="how-it-works" className="py-20 px-6 bg-gray-50">
        <div className="max-w-5xl mx-auto">
          <h3 className="text-3xl font-bold text-center mb-12">How It Works</h3>
          <div className="grid md:grid-cols-3 gap-6 text-center">
            {[
              {
                step: "1",
                title: "Create a Form",
                desc: "Add the fields you want—text, email, phone, message, and more.",
              },
              {
                step: "2",
                title: "Share the Link",
                desc: "Send your form’s unique link to your users or embed it later.",
              },
              {
                step: "3",
                title: "Get Submissions",
                desc: "Receive responses in real-time and view submission count per form.",
              },
            ].map((item, i) => (
              <div key={i} className="bg-white rounded-xl p-6 shadow-md">
                <div className="text-indigo-600 font-bold text-4xl mb-4">
                  {item.step}
                </div>
                <h4 className="text-xl font-semibold mb-2">{item.title}</h4>
                <p className="text-gray-600">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 bg-indigo-600 text-white text-center px-4">
        <h3 className="text-3xl md:text-4xl font-bold mb-4">
          Start Collecting Feedback Now
        </h3>
        <p className="mb-8 max-w-xl mx-auto text-lg">
          Create your first form in under a minute—no coding or login required.
        </p>
        <button className="bg-white text-indigo-600 px-6 py-3 rounded-lg font-semibold hover:bg-gray-100 transition">
          Get Started Free
        </button>
      </section>

      {/* Footer */}
      <footer
        id="contact"
        className="text-center py-8 bg-gray-100 text-sm text-gray-600"
      >
        © {new Date().getFullYear()} OpinionDock. Built for learning & demo
        purposes.
      </footer>
    </div>
  );
}
