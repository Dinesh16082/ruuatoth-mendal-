import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Profile.css";
import Navbar from "../Navbar/Navbar";

const Profile = () => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [profileData, setProfileData] = useState(null);
  const [formData, setFormData] = useState(new FormData());
  const [notification, setNotification] = useState(null);

  const API_BASE = "http://127.0.0.1:8000/auth"; // change if needed

  // Fetch candidate profile
  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const res = await axios.get(`${API_BASE}/candidate/profile/`, { withCredentials: true });
        setProfileData(res.data);

        // prepare FormData with initial values
        const fd = new FormData();
        Object.keys(res.data).forEach((key) => {
          fd.append(key, res.data[key] ?? "");
        });
        setFormData(fd);
      } catch (err) {
        console.error("Error fetching profile:", err);
        showNotification("Failed to load profile", "error");
      }
    };
    fetchProfile();
  }, []);

  // Handle input changes
const handleInputChange = (field, value) => {
  setProfileData((prev) => ({ ...prev, [field]: value }));
};


  // Handle file uploads (photo, resume, payslip)
  const handleFileChange = (field, file) => {
    if (file && file.size > 0) {
      formData.set(field, file);
      setFormData(formData);

      // Preview photo
      if (field === "photo_upload") {
        const reader = new FileReader();
        reader.onload = (e) => {
          setProfileData((prev) => ({
            ...prev,
            photo_upload: e.target.result,
          }));
        };
        reader.readAsDataURL(file);
      }
    } else {
      // If no file selected, remove from FormData
      formData.delete(field);
      setFormData(formData);
    }
  };

  // Handle multi-select for sub_departments
  const handleSubDepartmentsChange = (event) => {
    const options = event.target.options;
    const selected = [];
    for (let i = 0; i < options.length; i++) {
      if (options[i].selected) {
        selected.push(options[i].value);
      }
    }
    setProfileData((prev) => ({ ...prev, sub_departments: selected }));
    formData.set("sub_departments", JSON.stringify(selected));
    setFormData(formData);
  };

  // Save changes
  const saveChanges = async () => {
  const fd = new FormData();

  // Normal fields
  Object.keys(profileData).forEach((key) => {
    if (
      key !== "resume_upload" &&
      key !== "photo_upload" &&
      key !== "payslip_upload" &&
      key !== "sub_departments"
    ) {
      fd.append(key, profileData[key] ?? "");
    }
  });

  // Sub-departments
  fd.append("sub_departments", JSON.stringify(profileData.sub_departments || []));

  // Files
  if (profileData.resume_upload instanceof File) {
    fd.append("resume_upload", profileData.resume_upload);
  }
  if (profileData.photo_upload instanceof File) {
    fd.append("photo_upload", profileData.photo_upload);
  }
  if (profileData.payslip_upload instanceof File) {
    fd.append("payslip_upload", profileData.payslip_upload);
  }

  try {
    const res = await axios.put(`${API_BASE}/candidate/profile/update/`, fd, {
      headers: { "Content-Type": "multipart/form-data" },
    });
    setProfileData(res.data);
    setIsEditMode(false);
    showNotification("Profile updated successfully!", "success");
  } catch (err) {
    console.error("Error updating profile:", err.response?.data || err);
    showNotification("Failed to update profile", "error");
  }
};

  // Cancel changes
  const cancelChanges = () => {
    setIsEditMode(false);
    showNotification("Changes cancelled", "info");
  };

  // Show notification
  const showNotification = (message, type) => {
    setNotification({ message, type });
    setTimeout(() => setNotification(null), 3000);
  };

  if (!profileData) return <p>Loading profile...</p>;

  // === OPTIONS for select fields ===
  const genderOptions = ["Male", "Female", "Other", "Prefer not to say"];
  const maritalOptions = ["Single", "Married", "Other"];
  const bloodOptions = ["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"];
  const departmentOptions = [
    "IT Software",
    "IT Hardware",
    "HR & Admin",
    "Accounts",
    "Digital Design",
    "Digital Marketing",
    "Other",
  ];

  // Add sub_departments options (example options, adjust as needed)
  const subDepartmentOptions = [
    "Development",
    "Testing",
    "Support",
    "Design",
    "Marketing",
    "Sales",
  ];

  // Reusable InfoItem component
  const InfoItem = ({ label, field, type = "text", options }) => (
    <div className="info-item">
      <label>{label}</label>
      {!isEditMode ? (
        <span className="view-mode">
          {field === "sub_departments"
            ? profileData[field]?.join(", ") || "-"
            : profileData[field] || "-"}
        </span>
      ) : type === "select" ? (
        <select
          className="edit-mode"
          value={profileData[field] || ""}
          onChange={(e) => handleInputChange(field, e.target.value)}
        >
          <option value="">Select</option>
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : type === "multiselect" ? (
        <select
          multiple
          className="edit-mode"
          value={profileData[field] || []}
          onChange={handleSubDepartmentsChange}
        >
          {options.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          className="edit-mode"
          value={profileData[field] || ""}
          onChange={(e) => handleInputChange(field, e.target.value)}
        />
      )}
    </div>
  );

  return (
    <>
      <Navbar />
      <div className="container">
        {notification && (
          <div className={`notification ${notification.type}`}>
            {notification.message}
          </div>
        )}

        <div className="profile-header">
          <div className="profile-photo-section">
            <div className="profile-photo">
              <img
                src={
                  profileData.photo_upload
                    ? profileData.photo_upload.startsWith("http")
                      ? profileData.photo_upload
                      : `${API_BASE}${profileData.photo_upload}`
                    : "https://via.placeholder.com/150x150/F43F5E/FFFFFF?text=No+Photo"
                }
                alt="Profile"
              />
              {isEditMode && (
                <div
                  className="photo-upload-overlay"
                  onClick={() => document.getElementById("photoInput").click()}
                >
                  <i className="fas fa-camera"></i>
                  <input
                    type="file"
                    id="photoInput"
                    accept="image/*"
                    style={{ display: "none" }}
                    onChange={(e) =>
                      handleFileChange("photo_upload", e.target.files[0])
                    }
                  />
                </div>
              )}
            </div>
          </div>

          <div className="profile-info">
            <h1>{profileData.name || "-"}</h1>
            <p>{profileData.position_applied || "-"}</p>
            <p>{profileData.department || "-"}</p>
            <p>{profileData.id || "-"}</p>
          </div>

          <div className="profile-actions">
            {!isEditMode ? (
              <button
                className="btn btn-edit"
                onClick={() => setIsEditMode(true)}
              >
                <i className="fas fa-edit"></i> Edit Profile
              </button>
            ) : (
              <>
                <button className="btn btn-save" onClick={saveChanges}>
                  <i className="fas fa-save"></i> Save
                </button>
                <button className="btn btn-cancel" onClick={cancelChanges}>
                  <i className="fas fa-times"></i> Cancel
                </button>
              </>
            )}
          </div>
        </div>

        <div className="profile-content">
          <div className="profile-section">
            <h2>Personal Information</h2>
            <div className="info-grid">
              <InfoItem label="Full Name" field="name" />
              <InfoItem label="Gmail" field="gmail" type="email" />
              <InfoItem label="Phone" field="number" type="tel" />
              <InfoItem label="DOB" field="dob" type="date" />
              <InfoItem
                label="Gender"
                field="gender"
                type="select"
                options={genderOptions}
              />
              <InfoItem
                label="Marital Status"
                field="marital_status"
                type="select"
                options={maritalOptions}
              />
              <InfoItem label="Nationality" field="nationality" />
              <InfoItem
                label="Blood Group"
                field="blood_group"
                type="select"
                options={bloodOptions}
              />
            </div>
          </div>

          <div className="profile-section">
            <h2>Professional Information</h2>
            <div className="info-grid">
              <InfoItem label="Position Applied" field="position_applied" />
              <InfoItem
                label="Department"
                field="department"
                type="select"
                options={departmentOptions}
              />
              <InfoItem label="Sub Departments" field="sub_departments" type="multiselect" options={subDepartmentOptions} />
              <InfoItem label="Employer" field="current_employer" />
              <InfoItem label="Total Experience" field="total_experience" />
              <InfoItem label="Relevant Experience" field="relevant_experience" />
              <InfoItem label="Branch" field="branch" />
            </div>
          </div>

          <div className="profile-section">
            <h2>Educational Information</h2>
            <div className="info-grid">
              <InfoItem label="UG Qualification" field="ug_qualification" />
              <InfoItem label="UG Category" field="ug_category" />
              <InfoItem label="Graduation Year" field="year_of_graduation" />
              <InfoItem label="PG Qualification" field="pg_qualification" />
              <InfoItem label="PG Category" field="pg_category" />
              <InfoItem label="PG Graduation Year" field="year_of_pg_graduation" />
            </div>
          </div>

          <div className="profile-section">
            <h2>Skills & Certifications</h2>
            {isEditMode ? (
              <textarea
                rows="4"
                value={profileData.skills_certifications || ""}
                onChange={(e) => handleInputChange("skills_certifications", e.target.value)}
              />
            ) : (
              <p>{profileData.skills_certifications || "No skills added"}</p>
            )}
          </div>

          <div className="profile-section">
            <h2>Documents</h2>
            <div className="document-grid">
              <div className="document-item">
                <span>Resume</span>
                {profileData.resume_upload ? (
                  <a
                    href={`${API_BASE}${profileData.resume_upload}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-small btn-download"
                  >
                    Download
                  </a>
                ) : (
                  <button className="btn-small btn-download" disabled>No File</button>
                )}
                {isEditMode && (
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx"
                    onChange={(e) => handleFileChange("resume_upload", e.target.files[0])}
                  />
                )}
              </div>

              <div className="document-item">
                <span>Payslip</span>
                {profileData.payslip_upload ? (
                  <a
                    href={`${API_BASE}${profileData.payslip_upload}`}
                    target="_blank"
                    rel="noreferrer"
                    className="btn-small btn-download"
                  >
                    Download
                  </a>
                ) : (
                  <button className="btn-small btn-download" disabled>No File</button>
                )}
                {isEditMode && (
                  <input
                    type="file"
                    accept=".pdf,.doc,.docx,.jpg,.png"
                    onChange={(e) => handleFileChange("payslip_upload", e.target.files[0])}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
