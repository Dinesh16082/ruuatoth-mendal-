import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleLogout = async () => {
      try {
        const refresh = localStorage.getItem("refresh");
        if (refresh) {
          // Call Django logout API
          await axios.post(
            "http://127.0.0.1:8000/auth/logout/",
            { refresh },
            { headers: { "Content-Type": "application/json" } }
          );
        }
      } catch (error) {
        console.error("Logout error:", error);
      } finally {
        // Clear tokens from storage
        localStorage.removeItem("access");
        localStorage.removeItem("refresh");

        // Redirect to landing page and replace history
        navigate("/landingpage", { replace: true });

        // Prevent navigating back
        window.history.pushState(null, "", "/landingpage");
        window.onpopstate = () => {
          window.history.pushState(null, "", "/landingpage");
        };
      }
    };

    handleLogout();
  }, [navigate]);

  return (
    <div className="logout-page">
      <h2>Logging out...</h2>
    </div>
  );
};

export default Logout;
