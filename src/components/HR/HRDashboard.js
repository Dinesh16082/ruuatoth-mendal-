import React from "react";
import { motion } from "framer-motion";
import Navbar from "./Navbar";
import "./HRDashboard.css";

const HRDashboard = () => {
  // Emoji floating + glowing
  const emojiVariants = {
    hidden: { scale: 0, opacity: 0 },
    visible: { scale: 1, opacity: 1, transition: { type: "spring", stiffness: 500, damping: 20 } },
    floating: {
      y: [0, -8, 0],
      textShadow: [
        "0 0 5px rgba(233, 30, 99, 0.6)",
        "0 0 15px rgba(233, 30, 99, 0.9)",
        "0 0 5px rgba(233, 30, 99, 0.6)",
      ],
      transition: { repeat: Infinity, duration: 2, ease: "easeInOut" },
    },
  };

  // Sparkle stars ✨
  const sparkleVariants = {
    initial: { opacity: 0, scale: 0 },
    sparkle: {
      opacity: [0, 1, 0],
      scale: [0, 1.2, 0],
      transition: { duration: 0.8, repeat: Infinity, repeatDelay: 2 },
    },
  };

  // Pulse animation for cards
  const cardPulse = {
    rest: { scale: 1 },
    pulse: {
      scale: [1, 1.02, 1],
      transition: { duration: 1.8, repeat: Infinity, ease: "easeInOut" },
    },
  };

  return (
    <div className="hr-dashboard-container">
      <Navbar />
      {/* ======= MAIN CONTENT ======= */}
      <motion.main
        className="hr-main"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
      >
        {/* Lottie Animation
        <div className="hr-animation-container">
          <Lottie animationData={EmployeeSearch} loop={true} className="EmployeeSearch" />
        </div> */}

        <h2 className="hr-welcome">Welcome, HR Manager 👋</h2>
        <p className="hr-description">
          Manage candidates, clients, jobs, interviews, and onboarding easily from this dashboard.
        </p>

        {/* Feature Cards */}
        <div className="hr-grid">
          {[
            { icon: "📄", title: "Applied Candidates", desc: "View and manage applicants." },
            { icon: "👥", title: "Candidates", desc: "Browse and manage all candidates." },
            { icon: "🤝", title: "Clients", desc: "View and manage client companies." },
            { icon: "💼", title: "Added Jobs", desc: "See all job postings created." },
            { icon: "📅", title: "Walk-in Interviews", desc: "Schedule and manage interviews." },
            { icon: "📋", title: "Onboard List", desc: "Track and manage onboarding status." },
          ].map((card, index) => (
            <motion.div
              key={index}
              className="hr-card gradient-border"
              variants={cardPulse}
              initial="rest"
              animate="pulse"
              whileHover={{ scale: 1.08 }}
            >
              <motion.div
                className="hr-card-emoji"
                variants={emojiVariants}
                initial="hidden"
                animate={["visible", "floating"]}
                style={{ fontSize: "2.5rem", marginBottom: "0.5rem", position: "relative" }}
              >
                {card.icon}
                <motion.span
                  variants={sparkleVariants}
                  className="sparkle"
                  style={{
                    position: "absolute",
                    top: "-10px",
                    right: "-10px",
                    fontSize: "1rem",
                    color: "#fff176",
                  }}
                  animate="sparkle"
                >
                  ✨
                </motion.span>
              </motion.div>

              <h3 className="hr-card-title">{card.title}</h3>
              <p className="hr-card-desc">{card.desc}</p>
            </motion.div>
          ))}
        </div>
      </motion.main>
    </div>
  );
};

export default HRDashboard;
