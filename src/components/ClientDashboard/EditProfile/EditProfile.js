// src/components/ClientDashboard/Profile/EditCompanyProfile.js

import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./EditProfile.css";

const EditCompanyProfile = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const company = location.state?.company;

  const [formData, setFormData] = useState({
    id: company?.id || "", // keep company_id
    company_name: company?.company_name || "",
    company_location: company?.company_location || "",
    company_email: company?.company_email || "",
    company_phone: company?.company_phone || "",
    company_weblink: company?.company_weblink || "",
    company_department: company?.company_department || "",
    company_employees: company?.company_employees || "",
    start_year: company?.start_year || "",
    company_branch_no: company?.company_branch_no || "",
    type_of: company?.type_of || "",
    branch: company?.branch || "",
    annual_income: company?.annual_income || "",
    net_profit: company?.net_profit || "",
    company_certification: company?.company_certification || "",
    company_license: company?.company_license || "",
  });

  // If refreshed and no company in state, fetch from API
  useEffect(() => {
    if (!company) {
      axios
        .get("http://localhost:8000/auth/client_profile/")
        .then((res) => {
          setFormData(res.data);
        })
        .catch((err) => {
          console.error("Failed to fetch company profile", err);
        });
    }
  }, [company]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // If API requires id in URL
      await axios.put(
        `http://localhost:8000/auth/client_profile/`,
        formData
      );

      alert("Profile updated successfully!");
      navigate("/client-dashboard");
    } catch (err) {
      console.error(err);
      alert("Failed to update profile.");
    }
  };

  return (
    <div className="edit-profile-background">
      <div className="edit-profile-container">
          <button
            type="button"
            className="back-button-edit"
            onClick={() => navigate("/client-dashboard", { state: { activeTab: "profile" } })}
        >
          &#x2190;
        </button>
        <h2>Edit Company Profile</h2>
        <form onSubmit={handleSubmit} className="edit-form">
        <label>
          Company Name
          <input
            type="text"
            name="company_name"
            value={formData.company_name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Location
          <input
            type="text"
            name="company_location"
            value={formData.company_location}
            onChange={handleChange}
          />
        </label>
        <label>
          Email
          <input
            type="email"
            name="company_email"
            value={formData.company_email}
            onChange={handleChange}
          />
        </label>
        <label>
          Phone
          <input
            type="text"
            name="company_phone"
            value={formData.company_phone}
            onChange={handleChange}
          />
        </label>
        <label>
          Website
          <input
            type="text"
            name="company_weblink"
            value={formData.company_weblink}
            onChange={handleChange}
          />
        </label>
        <label>
          Department
          <input
            type="text"
            name="company_department"
            value={formData.company_department}
            onChange={handleChange}
          />
        </label>
        <label>
          Employees
          <input
            type="number"
            name="company_employees"
            value={formData.company_employees}
            onChange={handleChange}
          />
        </label>
        <label>
          Start Year
          <input
            type="number"
            name="start_year"
            value={formData.start_year}
            onChange={handleChange}
          />
        </label>
        <label>
          Branches
          <input
            type="number"
            name="company_branch_no"
            value={formData.company_branch_no}
            onChange={handleChange}
          />
        </label>
        <label>
          Type
          <input
            type="text"
            name="type_of"
            value={formData.type_of}
            onChange={handleChange}
          />
        </label>
        <label>
          Branch
          <input
            type="text"
            name="branch"
            value={formData.branch}
            onChange={handleChange}
          />
        </label>
        <label>
          Annual Income
          <input
            type="number"
            name="annual_income"
            value={formData.annual_income}
            onChange={handleChange}
          />
        </label>
        <label>
          Net Profit
          <input
            type="number"
            name="net_profit"
            value={formData.net_profit}
            onChange={handleChange}
          />
        </label>
        <label>
          Certification
          <input
            type="text"
            name="company_certification"
            value={formData.company_certification}
            onChange={handleChange}
          />
        </label>
        <label>
          License
          <input
            type="text"
            name="company_license"
            value={formData.company_license}
            onChange={handleChange}
          />
        </label>
        <div className="form-actions">
          <button type="submit" className="save-button">
            💾 Save Changes
          </button>
          <button
            type="button"
            className="cancel-button"
            onClick={() => navigate("/client-dashboard", { state: { activeTab: "profile" } })}
          >
            ❌ Cancel
          </button>
        </div>
        </form>
      </div>
    </div>
  );
};

export default EditCompanyProfile;
