import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "./AppliedCandidates.css"; // optional css
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";

const AppliedCandidates = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
  try {
    const response = await axios.get("http://localhost:8000/auth/hr_applied/");
    const filtered = response.data.filter(c => !c.rejected); // ✅ remove rejected
    setCandidates(filtered);
  } catch (error) {
    console.error("Error fetching applied candidates:", error);
  } finally {
    setLoading(false);
  }
};


  const handleAccept = async (id,opening_id,company_id) => {
  try {
    await axios.post("http://localhost:8000/auth/accept-candidate/", {
      candidate_id: id,
      opening_id: opening_id,
      company_id: company_id   // send in body
    });
    alert("Candidate Accepted ✅");
    fetchCandidates(); // refresh list
  } catch (error) {
    console.error("Error accepting candidate:", error);
  }
};

 const handleDelete = async (id, opening_id, company_id) => {
  try {
    await axios.post("http://localhost:8000/auth/delete-candidate/", {
      candidate_id: id,
      opening_id: opening_id,
      company_id: company_id,
    });
    alert("Candidate Deleted ❌");
    fetchCandidates();
  } catch (error) {
    console.error("Error deleting candidate:", error);
  }
};

  if (loading) {
    return <p>Loading candidates...</p>;
  }

  return (
    <div className="all-jobs-container">
      <Navbar />
      <h1 style={{ color: "white", textAlign: "center", marginBottom: "2rem" }}>Applied Candidates</h1>
      <table className="jobs-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Number</th>
            <th>Email</th>
            <th>Degrees</th>
            <th>Category</th>
            <th>Position</th>
            <th>Company</th>
            <th>Applied Date</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates.length > 0 ? (
            candidates.map((candidate) => (
              <tr key={candidate.id}>
                <td>{candidate.id}</td>
                <td>{candidate.name || "N/A"}</td>
                <td>{candidate.number || "N/A"}</td>
                <td>{candidate.gmail || "N/A"}</td>
                <td>{candidate.ug_qualification || "N/A"}</td>
                <td>{candidate.ug_category || "N/A"}</td>
                <td>{candidate.position_applied || "N/A"}</td>
                <td>{candidate.company_name || "N/A"}</td>
                <td>{candidate.applied_on || "N/A"}</td>
                <td>
                  <button
                    className="accept-button"
                    onClick={() => handleAccept(candidate.id, candidate.opening_id, candidate.company_id)}
                  >
                    Accept
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDelete(candidate.id, candidate.opening_id, candidate.company_id)}
                  >
                    Delete
                  </button>
                  <button
                  className="result-button"
                  onClick={() => {
                    navigate(`/test-result/${candidate.id}/${candidate.opening_id}/${candidate.company_id}`);
                  }}
                >
                  View Result
                </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="10">No candidates have applied yet.</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default AppliedCandidates;
