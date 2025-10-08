
import React, { useEffect, useState } from "react";
import axios from "axios";
import "./History.css"; // optional styling

const ClientHistory = ({ setActiveTab }) => {
  const [history, setHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8000/auth/client_history/"
        );
        setHistory(response.data);
      } catch (err) {
        setError("Failed to fetch client history.");
      } finally {
        setLoading(false);
      }
    };

    fetchHistory();
  }, []);

  if (loading) return <p>Loading history...</p>;
  if (error) return <p>{error}</p>;

  return (
    <div className="history-container">
      <h2>Client History</h2>
      {history.length === 0 ? (
        <p>No history available.</p>
      ) : (
        <table className="history-table">
          <thead>
            <tr>
              <th>Date</th>
              <th>Action</th>
              <th>Details</th>
              <th>Position</th>
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
                <td>{new Date(item.date).toLocaleDateString()}</td>
                <td>{item.action}</td>
                <td>{item.details}</td>
                <td>{item.position}</td>
                <td>{item.job_description}</td>
                <td>{item.requirements}</td>
                <td>{item.salary_range}</td>
                <td>{item.location}</td>
                <td>{item.opening_date}</td>
                <td>{item.closing_date}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default ClientHistory;
