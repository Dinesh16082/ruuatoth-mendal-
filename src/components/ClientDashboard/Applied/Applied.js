import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Applied.css";
import { useNavigate } from "react-router-dom";

const Applied = ({ setActiveTab }) => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [interviewDetails, setInterviewDetails] = useState({}); // store type + date + time per candidate
  const navigate = useNavigate();

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await axios.get("http://localhost:8000/auth/client_applied/");
      setCandidates(response.data);
    } catch (error) {
      console.error("Error fetching applied candidates:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleDetailChange = (candidateId, field, value) => {
    setInterviewDetails((prev) => ({
      ...prev,
      [candidateId]: {
        ...prev[candidateId],
        [field]: value,
      },
    }));
  };

  const handleAccept = async (id, opening_id, company_id) => {
    const details = interviewDetails[id];
    if (!details?.type || !details?.date || !details?.time) {
      alert("⚠ Please select Interview Type, Date, and Time before accepting!");
      return;
    }

    try {
      await axios.post("http://localhost:8000/auth/client_accept_candidate/", {
        candidate_id: id,
        opening_id: opening_id,
        company_id: company_id,
        interview_type: details.type,
        interview_date: details.date,
        interview_time: details.time,
      });
      alert(`Candidate Accepted ✅ (${details.type} on ${details.date} at ${details.time})`);
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
    <div className="history-container">
      <h2 className="applied-title">Applied Candidates</h2>
      <table className="history-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Degrees</th>
            <th>Category</th>
            <th>Position</th>
            <th>Requirements</th>
            <th>Company</th>
            <th>Applied Date</th>
            <th>Interview Type</th>
            <th>Interview Date</th>
            <th>Interview Time</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {candidates.length > 0 ? (
            candidates.map((candidate) => (
              <tr key={candidate.id}>
                <td>{candidate.name || "N/A"}</td>
                <td>{candidate.ug_qualification || "N/A"}</td>
                <td>{candidate.ug_category || "N/A"}</td>
                <td>{candidate.position_applied || "N/A"}</td>
                <td>{candidate.requirements || "N/A"}</td>
                <td>{candidate.company_name || "N/A"}</td>
                <td>{candidate.applied_on || "N/A"}</td>
                <td>
                  <select
                    value={interviewDetails[candidate.id]?.type || ""}
                    onChange={(e) =>
                      handleDetailChange(candidate.id, "type", e.target.value)
                    }
                  >
                    <option value="">-- Select Type --</option>
                    <option value="Online">Online</option>
                    <option value="Offline">Offline</option>
                    <option value="Subfield">Subfield</option>
                  </select>
                  </td>
                  <td>
                  <input
                    type="date"
                    value={interviewDetails[candidate.id]?.date || ""}
                    onChange={(e) =>
                      handleDetailChange(candidate.id, "date", e.target.value)
                    }
                  />
                  </td>
                  <td>
                  <input
                    type="time"
                    value={interviewDetails[candidate.id]?.time || ""}
                    onChange={(e) =>
                      handleDetailChange(candidate.id, "time", e.target.value)
                    }
                  />
                </td>
                <td>
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
                    Accept
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
                    Delete
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

export default Applied;
