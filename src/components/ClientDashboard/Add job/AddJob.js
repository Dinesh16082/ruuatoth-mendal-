import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Link } from "react-router-dom";
import "./AddJob.css";


const JobOpeningForm = ({ setActiveTab }) => {
  const { id } = useParams(); // If present → Edit mode
  const [formData, setFormData] = useState({
    company: "",
    position: "",
    job_description: "",
    requirements: "",
    salary_range: "",
    location: "",
    closing_date: "",
  });

  const navigate = useNavigate();

  // Pre-fill company id for creation
  useEffect(() => {
    if (!id) {
      const companyId = localStorage.getItem("company_id");
      if (companyId) {
        setFormData((prev) => ({ ...prev, company: companyId }));
        console.log("Pre-filled company id:", companyId);
      }
    }
  }, [id]);

  // Fetch job data if editing
  useEffect(() => {
    if (id) {
      fetch(`http://127.0.0.1:8000/api/openings/${id}/`)
        .then((res) => {
          if (!res.ok) throw new Error("Failed to fetch job data");
          return res.json();
        })
        .then((data) => {
          setFormData(data);
          console.log("Fetched job data for edit:", data);
        })
        .catch((err) => {
          console.error("Error fetching job:", err);
        });
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    // Restrict editable fields in edit mode
    if (id && name !== "salary_range" && name !== "closing_date") {
      return;
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log("Submitting form with data:", formData);

    try {
      let response;
      if (id) {
        // UPDATE only editable fields
        const updateData = {
          salary_range: formData.salary_range,
          closing_date: formData.closing_date,
        };
        response = await fetch(`http://127.0.0.1:8000/api/openings/${id}/`, {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(updateData),
        });

        if (response.ok) {
          navigate("/client-dashboard"); // Direct navigation after success
          alert("✅ Job updated successfully!");
          
          return;
        }
      } else {
        // CREATE all fields
        response = await fetch("http://127.0.0.1:8000/api/openings/", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(formData),
        });

        if (response.ok) {
          alert("🎉 Job created successfully!");
          <Link to="/client-dashboard" />;
          navigate(0);
          return;
        }
      }

      // If request failed
      const errorData = await response.json();
      console.error("Failed to save opening:", errorData);
      alert("❌ Failed to save job. See console for details.");
    } catch (error) {
      console.error("Error saving job opening:", error);
      alert("❌ Error saving job. See console for details.");
    }
  };

  return (
    <div className="AddJobContainer">
      <h2 className="AddJobHeading">
        {id ? "Edit Job Opening" : "Create Job Opening"}
      </h2>

      <form onSubmit={handleSubmit}>
        <input
          className="AddJobInput"
          type="text"
          name="position"
          placeholder="Position"
          value={formData.position}
          onChange={handleChange}
          disabled={!!id}
          required
        />
        <textarea
          className="AddJobTextarea"
          name="job_description"
          placeholder="Job Description"
          value={formData.job_description}
          onChange={handleChange}
          disabled={!!id}
          required
        />
        <textarea
          className="AddJobTextarea"
          name="requirements"
          placeholder="Requirements"
          value={formData.requirements}
          onChange={handleChange}
          disabled={!!id}
          required
        />
        <input
          className="AddJobInput"
          type="text"
          name="salary_range"
          placeholder="Salary Range"
          value={formData.salary_range}
          onChange={handleChange}
          required
        />
        <input
          className="AddJobInput"
          type="text"
          name="location"
          placeholder="Location"
          value={formData.location}
          onChange={handleChange}
          disabled={!!id}
        />
        <input
          className="AddJobInput"
          type="date"
          name="closing_date"
          value={formData.closing_date}
          onChange={handleChange}
          required
        />

        <button
          type="submit"
          className="AddJobButton"
        >
          {id ? "Update Job" : "Create Job"}
        </button>
      </form>
    </div>
  );
};

export default JobOpeningForm;
