import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import {
  FiArrowRight,
  FiCheckCircle,
  FiClipboard,
  FiLink,
  FiTrendingUp,
} from "react-icons/fi";

// Animation variants
const fadeIn = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.6 } },
};

const staggerChildren = {
  visible: {
    transition: {
      staggerChildren: 0.1,
    },
  },
};

export default function Landing() {
  const navigate = useNavigate();
  const [hoveredFeature, setHoveredFeature] = useState(null);

  return (
    <div className="bg-gradient-to-br from-slate-50 to-white text-slate-800 min-h-screen">
      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4 text-center">
        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeIn}
          className="max-w-3xl mx-auto"
        >
          <motion.h1
            className="text-4xl md:text-5xl lg:text-6xl font-bold mb-6"
            variants={fadeIn}
          >
            Collect Feedback <br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600">
              with Ease
            </span>
          </motion.h1>

          <motion.p
            className="text-lg md:text-xl text-slate-600 mb-10 max-w-2xl mx-auto"
            variants={fadeIn}
          >
            OpinionDock helps you create simple, effective feedback forms and
            analyze user responses with zero hassle.
          </motion.p>

          <motion.button
            onClick={() => navigate("/create")}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 text-white px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            variants={fadeIn}
          >
            Get Started Free <FiArrowRight />
          </motion.button>
        </motion.div>
      </section>

      {/* Features Section */}
      <section id="features" className="py-20 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <motion.h3
            className="text-3xl font-bold text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            Why Choose OpinionDock?
          </motion.h3>

          <motion.p
            className="text-lg text-slate-600 text-center mb-16 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Everything you need to collect valuable feedback, without the
            complexity.
          </motion.p>

          <motion.div
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.3 }}
          >
            {[
              {
                title: "No Login Required",
                desc: "Start collecting feedback without forcing users to sign in or create an account.",
                icon: <FiCheckCircle className="text-blue-600" size={24} />,
              },
              {
                title: "Simple Form Builder",
                desc: "Build your custom form with a clean and intuitive interface.",
                icon: <FiClipboard className="text-indigo-600" size={24} />,
              },
              {
                title: "Submission Insights",
                desc: "Get quick stats on how many responses your form received.",
                icon: <FiTrendingUp className="text-purple-600" size={24} />,
              },
              {
                title: "Mobile Responsive",
                desc: "Access and fill forms from any device—seamlessly and comfortably.",
                icon: <FiCheckCircle className="text-blue-600" size={24} />,
              },
              {
                title: "Fast & Lightweight",
                desc: "Minimalist design that works smoothly even on low-end devices.",
                icon: <FiCheckCircle className="text-indigo-600" size={24} />,
              },
              {
                title: "Privacy First",
                desc: "We don't store unnecessary data—only what you need for feedback.",
                icon: <FiCheckCircle className="text-purple-600" size={24} />,
              },
            ].map((feature, i) => (
              <motion.div
                key={i}
                className="bg-slate-50 rounded-2xl p-6 border border-slate-200 hover:border-blue-300 transition-colors duration-300"
                variants={fadeIn}
                whileHover={{ y: -5 }}
                onHoverStart={() => setHoveredFeature(i)}
                onHoverEnd={() => setHoveredFeature(null)}
              >
                <motion.div
                  className="mb-4"
                  animate={{
                    scale: hoveredFeature === i ? 1.1 : 1,
                    rotate: hoveredFeature === i ? 5 : 0,
                  }}
                >
                  {feature.icon}
                </motion.div>
                <h4 className="text-xl font-semibold mb-2">{feature.title}</h4>
                <p className="text-slate-600">{feature.desc}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-6 bg-gradient-to-br from-slate-50 to-slate-100">
        <div className="max-w-5xl mx-auto">
          <motion.h3
            className="text-3xl font-bold text-center mb-4"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
          >
            How It Works
          </motion.h3>

          <motion.p
            className="text-lg text-slate-600 text-center mb-16 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
          >
            Get started with OpinionDock in three simple steps
          </motion.p>

          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                step: "1",
                title: "Create a Form",
                desc: "Add the fields you want—text, email, phone, message, and more.",
                icon: <FiClipboard size={32} className="text-blue-600" />,
              },
              {
                step: "2",
                title: "Share the Link",
                desc: "Send your form's unique link to your users or embed it later.",
                icon: <FiLink size={32} className="text-indigo-600" />,
              },
              {
                step: "3",
                title: "Get Submissions",
                desc: "Receive responses in real-time and view submission count per form.",
                icon: <FiTrendingUp size={32} className="text-purple-600" />,
              },
            ].map((item, i) => (
              <motion.div
                key={i}
                className="bg-white rounded-2xl p-8 shadow-sm text-center"
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.2 }}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <motion.div
                  className="w-16 h-16 rounded-full bg-blue-50 flex items-center justify-center mx-auto mb-6"
                  whileHover={{ rotate: 360 }}
                  transition={{ duration: 0.5 }}
                >
                  {item.icon}
                </motion.div>
                <div className="text-blue-600 font-bold text-2xl mb-2">
                  {item.step}
                </div>
                <h4 className="text-xl font-semibold mb-4">{item.title}</h4>
                <p className="text-slate-600">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-20 px-4 bg-gradient-to-r from-blue-600 to-indigo-700 text-white text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <h3 className="text-3xl md:text-4xl font-bold mb-6">
            Start Collecting Feedback Now
          </h3>
          <p className="mb-10 max-w-xl mx-auto text-lg text-blue-100">
            Create your first form in under a minute—no coding or login
            required.
          </p>
          <motion.button
            onClick={() => navigate("/create")}
            className="bg-white text-blue-600 px-8 py-4 rounded-xl font-semibold hover:shadow-lg transition-all duration-300 flex items-center justify-center gap-2 mx-auto"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Get Started Free <FiArrowRight />
          </motion.button>
        </motion.div>
      </section>

      {/* Footer */}
      <footer className="py-12 bg-slate-100 text-center text-sm text-slate-600">
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
        >
          © {new Date().getFullYear()} OpinionDock. Built for learning by{" "}
          <a
            className="text-blue-600 hover:underline"
            href="https://sumeet.codes"
          >
            Sumeet
          </a>
        </motion.div>
      </footer>
    </div>
  );
}
