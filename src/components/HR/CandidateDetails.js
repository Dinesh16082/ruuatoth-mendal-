// src/components/HR/CandidateDetailsPage.js
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./CandidateDetail.css";

const CandidateDetailsPage = () => {
  const { candidateId } = useParams();
  const navigate = useNavigate();

  const [candidate, setCandidate] = useState(null);

  // Fields to exclude
  const excludeKeys = [
    "updated_at",
    "skills",
    "experience",
    "qualification",
    "address",
    "email",
    "phone",
    "score",
    "topic",
    "tech_score",
    "count",
    "slug",
    "password",
    "confirm_password",
    "id"
  ];

  const getMediaUrl = (value, basePath) => {
    if (!value) return "";
    return value.startsWith("http") ? value : `${basePath}${value}`;
  };

  useEffect(() => {
    fetch(`http://127.0.0.1:8000/api/candidates/${candidateId}/`)
      .then((res) => res.json())
      .then((data) => setCandidate(data))
      .catch((error) => console.error("Error fetching candidate:", error));
  }, [candidateId]);

  if (!candidate) {
    return (
      <div className="candidates-container">
        <Navbar />
        <h1 className="title">Candidate Details</h1>
        <p>Loading...</p>
      </div>
    );
  }

  return (
    <div className="candidates-container">
      <Navbar />
      <h1 className="title">Candidate Details</h1>

      {/* Dynamic Candidate Details Table */}
      <table className="expanded-table" style={{ marginTop: "20px" }}>
        <tbody>
          {Object.entries(candidate)
            .filter(([key]) => !excludeKeys.includes(key))
            .map(([key, value]) => (
              <tr key={key}>
                <td><strong>{key.replace("_", " ").toUpperCase()}</strong></td>
                <td>
                  {key.includes("photo_upload") && value ? (
                    <img
                      src={getMediaUrl(value, "http://127.0.0.1:8000/media/images/")}
                      alt="Candidate"
                      className="candidate-photo"
                    />
                  ) : key.includes("resume_upload") && value ? (
                    <a
                      href={getMediaUrl(value, "http://127.0.0.1:8000/media/resumes/")}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Resume
                    </a>
                  ) : key.includes("payslip_upload") && value ? (
                    <a
                      href={getMediaUrl(value, "http://127.0.0.1:8000/media/")}
                      target="_blank"
                      rel="noreferrer"
                    >
                      View Payslip
                    </a>
                  ) : value !== null && value !== "" ? (
                    value.toString()
                  ) : (
                    "—"
                  )}
                </td>
              </tr>
            ))}
        </tbody>
      </table>

      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="view-button"
        style={{ marginTop: "20px" }}
      >
        ← Back
      </button>
    </div>
  );
};

export default CandidateDetailsPage;
