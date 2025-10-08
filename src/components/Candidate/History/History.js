import React, { useEffect, useState } from "react";
import axios from "axios";
import "./CandidateHistory.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../Navbar/Navbar";

const History = () => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const token = localStorage.getItem("access"); // JWT stored in localStorage
        const response = await axios.get(
          "http://localhost:8000/auth/candidate_history/",
          {
            headers: token ? { Authorization: `Bearer ${token}` } : {},
          }
        );
        setHistory(response.data);
      } catch (err) {
        console.error(err);
        setError("Failed to fetch history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) {
    return (
      
      <div className="loader-container">
        <div className="spinner"></div>
        <p>Loading history...</p>
      </div>
    );
  }

  if (error) return <p className="error">{error}</p>;

  return (
    <>
    <Navbar />
    <div className="history-container">
      

      
      <h2>Candidate History</h2>

      {history.length === 0 ? (
        <p>No history available.</p>
      ) : (
        <div className="table-wrapper">
          <table className="history-table">
            <thead>
              <tr>
              <th>Date</th>
              <th>Action</th>
              <th>Details</th>
              <th>Position</th>
              <th>Company</th>
              <th>Job Description</th>
              <th>Requirements</th>
              <th>Salary Range</th>
              <th>Location</th>
              <th>Opening Date</th>
              <th>Closing Date</th>
            </tr>
          </thead>
          <tbody>
            {history.map((item, index) => (
              <tr key={index}>
                <td>{item.date ? new Date(item.date).toLocaleDateString() : "N/A"}</td>
                <td>{item.action || "N/A"}</td>
                <td>{item.details || "N/A"}</td>
                <td>{item.position || "N/A"}</td>
                <td>{item.company_name || "N/A"}</td>
                <td>{item.job_description || "N/A"}</td>
                <td>{item.requirements || "N/A"}</td>
                <td>{item.salary_range || "N/A"}</td>
                <td>{item.location || "N/A"}</td>
                <td>
                  {item.opening_date
                    ? new Date(item.opening_date).toLocaleDateString()
                    : "N/A"}
                </td>
                <td>
                  {item.closing_date
                    ? new Date(item.closing_date).toLocaleDateString()
                    : "N/A"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        </div>
      )}
    </div>
    </>
    
  );
};

export default History;
