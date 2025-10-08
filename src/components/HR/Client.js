// src/components/HR/ClientsPage.js
import React, { useEffect, useState } from "react";
import axios from "axios";
import Navbar from "./Navbar";
import "./Client.css";

const ClientsPage = () => {
  const [clients, setClients] = useState([]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:8000/auth/hr_clients/") // Adjust if API path differs
      .then((response) => {
        setClients(response.data);
      })
      .catch((error) => {
        console.error("Error fetching clients:", error);
      });
  }, []);

  return (
    <div className="all-jobs-container">
      <Navbar />
      <h1 style={{ color: "white", textAlign: "center", marginBottom: "2rem" }}>All Clients</h1>
      <table className="jobs-table">
        <thead>
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Phone</th>
            <th>Location</th>
            <th>Company Website</th>
          </tr>
        </thead>
        <tbody>
          {clients.length > 0 ? (
            clients.map((client) => (
              <tr key={client.id}>
                <td>{client.id}</td>
                <td>{client.company_name}</td>
                <td>{client.company_email}</td>
                <td>{client.company_phone}</td>
                <td>{client.company_location}</td>
                <td>{client.company_weblink}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6">No clients found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ClientsPage;
