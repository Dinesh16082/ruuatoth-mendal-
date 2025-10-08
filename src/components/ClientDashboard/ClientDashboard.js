import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import Navbar from "./Navbar/Navbar";
import Welcome from "./Welcome/Welcome";
import History from "./History/History";
import JobOpeningForm from "./Add job/AddJob";
import Applied from "./Applied/Applied";
import Walkin from "./Walkin/Walkin";
import Profile from "./Profile/Profile";
import Onboard from "./Onboard/Onboard";
import Logout from "./Logout/Logout";
import "./ClientDashboard.css"; // Import the new CSS file

const ClientDashboard = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState("welcome");

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  const renderTab = () => {
    switch (activeTab) {
      case "welcome":
        return <Welcome setActiveTab={setActiveTab} />;
      case "history":
        return <History setActiveTab={setActiveTab} />;
      case "addJob":
        return <JobOpeningForm setActiveTab={setActiveTab} />;
      case "applied":
        return <Applied setActiveTab={setActiveTab} />;
      case "walkin":
        return <Walkin setActiveTab={setActiveTab} />;
      case "onboard":
        return <Onboard setActiveTab={setActiveTab} />;
      case "profile":
        return <Profile setActiveTab={setActiveTab} />;
      case "logout":
        return <Logout setActiveTab={setActiveTab} />;
      default:
        return <Welcome setActiveTab={setActiveTab} />;
    }
  };

  return (
    <div className="client-dashboard">
      <Navbar setActiveTab={setActiveTab} />
      <div className="dashboard-content">{renderTab()}</div>
    </div>
  );
};

export default ClientDashboard;
