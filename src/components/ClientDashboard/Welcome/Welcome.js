import React from "react";
import Lottie from "react-lottie";
import { useNavigate } from "react-router-dom";
import userProfileAnimation from "../../../assets/lottie/User Profile.json";
import "./Welcome.css";

export default function ClientWelcome() {
  const navigate = useNavigate();

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: userProfileAnimation,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  const features = [
    {
      title: "📢 Quick Job Posting",
      desc: "Post your openings in seconds and instantly connect with qualified candidates.",
      
    },
    {
      title: "⏳ Smart Deadline Tracking",
      desc: "Stay on top of hiring timelines with automated reminders before deadlines hit.",
      
    },
    {
      title: "📊 Insightful Analytics",
      desc: "View real-time hiring trends and performance metrics to make smarter decisions.",
     
    },
    {
      title: "🤝 Complete HR Support",
      desc: "Let us handle applicant screening while you focus on growing your business.",
      
    },
  ];

  return (
    <div
      style={{
        background: "linear-gradient(to right, #ec407a, #641b9a)",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        padding: "40px 20px",
      }}
    >
      <div
        style={{
          maxWidth: "1100px",
          width: "100%",
          textAlign: "center",
        }}
      >
        <div className="back-button-container">
          <button className="welcome-back-btn" onClick={() => navigate("/landingpage")}>
            <span className="welcome-arrow">←</span>
          </button>
        </div>
        {/* Heading */}
        <h1
          className="welcome-heading"
          style={{
            fontSize: "44px",
            fontWeight: "bold",
            marginBottom: "10px",
          }}
        >
          Welcome to Your Smart Hiring Hub 🚀
        </h1>
        <p
          style={{
            color: "#fff",
            fontSize: "18px",
            maxWidth: "900px",
            margin: "0 auto 40px",
            lineHeight: "1.6",
          }}
      >
          Experience the future of recruitment with our intuitive platform designed
          to streamline your hiring process. From quick job postings to insightful
          analytics, we provide all the tools you need to attract and retain top talent.
          Let's get started on building your dream team!
        </p>

        {/* Animation */}
        <div style={{ width: "300px", margin: "0 auto 50px" }}>
          <Lottie options={defaultOptions} height={300} width={300} />
        </div>

        {/* Feature Grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(auto-fit, minmax(250px, 1fr))",
            gap: "20px",
          }}
        >
          {features.map((item, index) => (
            <div
              key={index}
              style={{
                background: "rgba(255, 255, 255, 0.15)",
                backdropFilter: "blur(10px)",
                padding: "20px",
                borderRadius: "15px",
                color: "#fff",
                cursor: "pointer",
                boxShadow: "0px 4px 15px rgba(0,0,0,0.1)",
                transition: "transform 0.3s ease, background 0.3s ease",
              }}
              onClick={() => navigate(item.path)}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = "translateY(-5px)";
                e.currentTarget.style.background =
                  "rgba(255, 255, 255, 0.25)";
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "translateY(0px)";
                e.currentTarget.style.background =
                  "rgba(255, 255, 255, 0.15)";
              }}
            >
              <h3 style={{ fontSize: "20px", marginBottom: "10px" }}>
                {item.title}
              </h3>
              <p style={{  opacity: "0.9" }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
