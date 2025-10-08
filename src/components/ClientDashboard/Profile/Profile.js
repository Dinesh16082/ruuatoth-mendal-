// CompanyProfile.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import "./Profile.css";
import "./ProfileGradient.css";

const CompanyProfile = ({ setActiveTab }) => {
  const [company, setCompany] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [animateCards, setAnimateCards] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    fetchCompany();
    // Trigger animations after component mounts
    setTimeout(() => setAnimateCards(true), 100);
  }, []);

  const fetchCompany = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/auth/client_profile/`
      );
      setCompany(response.data);
    } catch (err) {
      setError("Failed to fetch company profile.");
    } finally {
      setLoading(false);
    }
  };

   const handleEdit = () => {
    navigate("/client/edit-profile", { state: { company } }); 
    // ✅ Pass company data to edit page (or just ID if you want to refetch)
  };

  const formatCurrency = (value) => {
    if (!value) return "N/A";
    const num = parseFloat(value);
    if (num >= 10000000) return `₹${(num / 10000000).toFixed(1)}Cr`;
    if (num >= 100000) return `₹${(num / 100000).toFixed(1)}L`;
    return `₹${num.toLocaleString('en-IN')}`;
  };

  const getSocialMediaValue = (socialArray) => {
    if (!socialArray || socialArray.length === 0) return "Not Connected";
    return socialArray.join(", ");
  };

  if (loading) {
    return (
      <div className="loading-container">
        <div className="loading-spinner"></div>
        <p className="loading-text">Loading profile...</p>
      </div>
    );
  }

  

  if (error) {
    return (
      <div className="error-container">
        <div className="error-icon">⚠️</div>
        <p className="error-text">{error}</p>
        <button onClick={fetchCompany} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  if (!company) {
    return (
      <div className="empty-container">
        <div className="empty-icon">📋</div>
        <p className="empty-text">No company profile found.</p>
      </div>
    );
  }

  return (
    <div className={`company-profile ${animateCards ? 'animate' : ''}`}>
      <div className="profile-actions">
        <button onClick={handleEdit} className="edit-button">
          ✏️ Edit Profile
        </button>
      </div>
      <div className="profile-header">
        <div className="header-decoration"></div>
        <h1 className="company-name">{company.company_name}</h1>
        <p className="company-tagline">
          Excellence Since {company.start_year || "N/A"}
        </p>
      </div>

      <div className="content-grid">
        {/* Basic Information Card */}
        <div className="info-card fade-in-1">
          <div className="card-title">
            <div className="card-icon">📍</div>
            <span>Basic Information</span>
          </div>
          <div className="info-items">
            <div className="info-item">
              <span className="info-label">Location</span>
              <span className="info-value">{company.company_location || "N/A"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Email</span>
              <span className="info-value">
                {company.company_email ? (
                  <a href={`mailto:${company.company_email}`} className="link">
                    {company.company_email}
                  </a>
                ) : "N/A"}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Phone</span>
              <span className="info-value">{company.company_phone || "N/A"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Website</span>
              <span className="info-value">
                {company.company_weblink ? (
                  <a 
                    href={company.company_weblink} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="link"
                  >
                    {company.company_weblink}
                  </a>
                ) : "N/A"}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Department</span>
              <span className="info-value">{company.company_department || "N/A"}</span>
            </div>
          </div>
        </div>

        {/* Company Details Card */}
        <div className="info-card fade-in-2">
          <div className="card-title">
            <div className="card-icon">🏢</div>
            <span>Company Details</span>
          </div>
          <div className="info-items">
            <div className="info-item">
              <span className="info-label">Employees</span>
              <span className="info-value">
                <span className="highlight-badge">
                  {company.company_employees || "N/A"}
                </span>
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Start Year</span>
              <span className="info-value">{company.start_year || "N/A"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Branches</span>
              <span className="info-value">
                {company.company_branch_no ? (
                  <span className="badge">{company.company_branch_no} Locations</span>
                ) : "N/A"}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">Type</span>
              <span className="info-value">{company.type_of || "N/A"}</span>
            </div>
            <div className="info-item">
              <span className="info-label">Branch</span>
              <span className="info-value">{company.branch || "N/A"}</span>
            </div>
          </div>
        </div>

        {/* Financial Information Card */}
        <div className="info-card fade-in-3">
          <div className="card-title">
            <div className="card-icon">💰</div>
            <span>Financial Overview</span>
          </div>
          <div className="stats-grid">
            <div className="stat-item">
              <div className="stat-value">
                {formatCurrency(company.annual_income)}
              </div>
              <div className="stat-label">Annual Income</div>
            </div>
            <div className="stat-item">
              <div className="stat-value">
                {formatCurrency(company.net_profit)}
              </div>
              <div className="stat-label">Net Profit</div>
            </div>
          </div>
        </div>

        {/* Compliance & Certification Card */}
        <div className="info-card fade-in-4">
          <div className="card-title">
            <div className="card-icon">📋</div>
            <span>Compliance & Certification</span>
          </div>
          <div className="info-items">
            <div className="info-item">
              <span className="info-label">Certification</span>
              <span className="info-value">
                {company.company_certification || "N/A"}
              </span>
            </div>
            <div className="info-item">
              <span className="info-label">License</span>
              <span className="info-value">
                {company.company_license || "N/A"}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Social Media Section */}
      <div className="info-card social-card fade-in-5">
        <div className="card-title">
          <div className="card-icon">🌐</div>
          <span>Social Media Presence</span>
        </div>
        <div className="social-media-grid">
          <div className="social-item linkedin">
            <div className="social-icon">in</div>
            <div className="social-content">
              <div className="social-name">LinkedIn</div>
              <div className="social-value">
                {getSocialMediaValue(company.company_social_media_Linkedin)}
              </div>
            </div>
          </div>
          <div className="social-item instagram">
            <div className="social-icon">
              <FaInstagram />
            </div>
            <div className="social-content">
              <div className="social-name">Instagram</div>
              <div className="social-value">
                {getSocialMediaValue(company.company_social_media_Instagram)}
              </div>
            </div>
          </div>
          <div className="social-item facebook">
            <div className="social-icon">f</div>
            <div className="social-content">
              <div className="social-name">Facebook</div>
              <div className="social-value">
                {getSocialMediaValue(company.company_social_media_Facebook)}
              </div>
            </div>
          </div>
          <div className="social-item twitter">
            <div className="social-icon">𝕏</div>
            <div className="social-content">
              <div className="social-name">Twitter</div>
              <div className="social-value">
                {getSocialMediaValue(company.company_social_media_Twitter)}
              </div>
            </div>
          </div>
          <div className="social-item whatsapp">
            <div className="social-icon">
              <FaWhatsapp />
            </div>
            <div className="social-content">
              <div className="social-name">WhatsApp Group</div>
              <div className="social-value">
                {getSocialMediaValue(company.company_social_media_Whatsapp_group)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CompanyProfile;
