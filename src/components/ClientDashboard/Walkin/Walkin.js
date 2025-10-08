import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Walkin.css"; // optional css
import { useNavigate } from "react-router-dom";

const HRWalkin = ({ setActiveTab }) => {
  const [candidates, setCandidates] = useState([]);
  const [loading, setLoading] = useState(true);
  const [joiningDates, setJoiningDates] = useState({}); // store joining date for each candidate
  const navigate = useNavigate();

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    try {
      const response = await axios.get("http://localhost:8000/auth/hr_walkin/");
      setCandidates(response.data);
    } catch (error) {
      console.error("Error fetching applied candidates:", error);
    } finally {
      setLoading(false);
    }
  };

  // track joining date input
  const handleJoiningDateChange = (candidateId, date) => {
    setJoiningDates((prev) => ({
      ...prev,
      [candidateId]: date,
    }));
  };

  const handleAccept = async (id, opening_id, company_id) => {
    const selectedDate = joiningDates[id];
    if (!selectedDate) {
      alert("⚠ Please select Joining Date before onboarding!");
      return;
    }

    try {
      await axios.post("http://localhost:8000/auth/client_onboard/", {
        candidate_id: id,
        opening_id: opening_id,
        company_id: company_id,
        joining_date: selectedDate, // ✅ send joining date
      });
      alert(`Candidate Onboarded ✅ (Joining Date: ${selectedDate})`);
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
      alert("Candidate Rejected ❌");
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
      <h2>Walk-In Candidates</h2>
      <table className="history-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Degrees</th>
            <th>Category</th>
            <th>Position</th>
            <th>Company</th>
            <th>Applied Date</th>
            <th>Interview Date</th>
            <th>Interview Time</th>
            <th>Joining Date</th>
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
                <td>{candidate.company_name || "N/A"}</td>
                <td>{candidate.applied_on || "N/A"}</td>
                <td>{candidate.interview_date || "N/A"}</td>
                <td>{candidate.interview_time || "N/A"}</td>

                {/* ✅ Joining Date input */}
                <td>
                  <input
                    type="date"
                    value={joiningDates[candidate.id] || ""}
                    onChange={(e) =>
                      handleJoiningDateChange(candidate.id, e.target.value)
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

export default HRWalkin;
