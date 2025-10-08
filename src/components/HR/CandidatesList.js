import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";
import "./CandidatesList.css";

const CandidatesPage = () => {
  const [candidates, setCandidates] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetch("http://127.0.0.1:8000/auth/hr_candidates/")
      .then((res) => res.json())
      .then((data) => {
        console.log("Fetched candidates:", data);
        setCandidates(data);
      })
      .catch((err) => console.error("Error fetching candidates:", err));
  }, []);

  return (
    <div className="all-jobs-container">
      <Navbar />
      <h1 style={{ color: "white", textAlign: "center", marginBottom: "2rem" }}>Candidates</h1>
      <table className="jobs-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Number</th>
            <th>Gmail</th>
            <th>DOB</th>
            <th>Gender</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {candidates.length > 0 ? (
            candidates.map((candidate) => (
              <tr key={candidate.id}>
                <td>{candidate.name}</td>
                <td>{candidate.number}</td>
                <td>{candidate.gmail}</td>
                <td>{candidate.dob}</td>
                <td>{candidate.gender}</td>
                <td>
                  <button
                    className="details-button"
                    onClick={() => navigate(`/hr-dashboard/candidates/${candidate.id}`)}
                  >
                    All Details
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No candidates found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default CandidatesPage;
