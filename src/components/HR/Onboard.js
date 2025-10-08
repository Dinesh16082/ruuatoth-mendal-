import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Onboard.css"; // optional css
import { useNavigate } from "react-router-dom";
import Navbar from "./Navbar";

const Onboard = () => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [interviewTypes, setInterviewTypes] = useState({}); // store selected type for each candidate
  const navigate = useNavigate();

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await axios.get("http://localhost:8000/auth/client_onboard_display/");
      setCandidates(response.data);
    } catch (error) {
      console.error("Error fetching applied candidates:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleInterviewTypeChange = (candidateId, type) => {
    setInterviewTypes((prev) => ({
      ...prev,
      [candidateId]: type, // save choice per candidate
    }));
  };

  const handleAccept = async (id, opening_id, company_id) => {
    const selectedType = interviewTypes[id];
    if (!selectedType) {
      alert("⚠ Please select Interview Type before accepting!");
      return;
    }

    try {
      await axios.post("http://localhost:8000/auth/client_accept_candidate/", {
      candidate_id: id,
      opening_id: opening_id,
      company_id: company_id,
      interview_type: selectedType, // ✅ sending it here
    });
      alert(`Candidate Accepted ✅ (${selectedType})`);
      fetchCandidates();
    } catch (error) {
      console.error("Error accepting candidate:", error);
    }
  };

  const handleDelete = async (id, opening_id, company_id) => {
    try {
      await axios.post("http://localhost:8000/auth/client_delete_candidate/", {
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
      <h1>OnBoard Candidates</h1>
      <div className="table-wrapper">
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
            <th>Joining Date</th>
          </tr>
        </thead>
        <tbody>
          {candidates.length > 0 ? (
            candidates.map((candidate) => (
              <tr key={candidate.id}>
                {/* <td>{candidate.id || "N/A"}</td> */}
                <td>{candidate.id || "N/A"}</td>
                <td>{candidate.name || "N/A"}</td>
                <td>{candidate.number || "N/A"}</td>
                <td>{candidate.gmail || "N/A"}</td>
                <td>{candidate.ug_qualification || "N/A"}</td>
                <td>{candidate.ug_category || "N/A"}</td>
                <td>{candidate.position_applied || "N/A"}</td>
                <td>{candidate.company_name || "N/A"}</td>
                <td>{candidate.applied_on || "N/A"}</td>
                <td>{candidate.joining_date || "N/A"}</td>
                
                {/* <td>
                  <select
                    value={interviewTypes[candidate.id] || ""}
                    onChange={(e) =>
                      handleInterviewTypeChange(candidate.id, e.target.value)
                    }
                  >
                    <option value="">-- Select --</option>
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                    <option value="Subfield">Subfield</option>
                  </select>
                </td> */}
                {/* <td>
                  <button
                    className="accept-button"
                    onClick={() =>
                      handleAccept(
                        candidate.id,
                        candidate.opening_id,
                        candidate.company_id
                      )
                    }
                  >
                    OnBoard
                  </button>
                  <button
                    className="delete-button"
                    onClick={() =>
                      handleDelete(
                        candidate.id,
                        candidate.opening_id,
                        candidate.company_id
                      )
                    }
                  >
                    Rejected
                  </button>
                  <button
                    className="result-button"
                    onClick={() => {
                      navigate(
                        `/test-result/${candidate.id}/${candidate.opening_id}/${candidate.company_id}`
                      );
                    }}
                  >
                    View Result
                  </button>
                </td> */}
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
    </div>
  );
};

export default Onboard;
