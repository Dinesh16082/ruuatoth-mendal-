// src/components/HR/ClientAppliedPage.js
import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";
import "./CandidatesList.css";

const ClientAppliedPage = () => {
  const [candidates, setCandidates] = useState([]);

  useEffect(() => {
    fetchCandidates();
  }, []);

  const fetchCandidates = async () => {
    const res = await fetch("http://localhost:8000/api/client-applied/");
    const data = await res.json();
    setCandidates(data);
  };

  return (
    <div className="candidates-container">
      <Navbar />
      <h2 style={{ color: "white", textAlign: "center", marginBottom: "2rem" }}>Client Applied Candidates</h2>
      <table className="candidates-table">
        <thead>
          <tr>
            <th>Name</th>
            <th>Degree</th>
            <th>Category</th>
            <th>Aptitude</th>
            <th>Technical</th>
            <th>Created At</th>
          </tr>
        </thead>
        <tbody>
          {candidates.map((c) => (
            <tr key={c.id}>
              <td>{c.name}</td>
              <td>{c.degree}</td>
              <td>{c.category}</td>
              <td>{c.aptitude}</td>
              <td>{c.technical}</td>
              <td>{c.created_at}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default ClientAppliedPage;
