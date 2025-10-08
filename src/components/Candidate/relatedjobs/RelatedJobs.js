import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './RelatedJob.css'; // Assuming you have a CSS file for styling
import Navbar from '../Navbar/Navbar';

const RelatedJobs = () => {
    const [jobs, setJobs] = useState([]);
    const navigate = useNavigate();
    

    const fetchJobs = async () => {
    try {
        const response = await axios.get('http://localhost:8000/auth/relatedjobs/');
        const currentDate = new Date();

        // Filter out expired jobs
        const validJobs = response.data.filter(job => {
            if (!job.closing_date) return true; // Keep jobs with no closing date
            const closingDate = new Date(job.closing_date);
            return closingDate >= currentDate; // Keep only if still open
        });

        setJobs(validJobs);
    } catch (error) {
        console.error('Error fetching jobs:', error);
    }
};


    useEffect(() => {
        fetchJobs();
    }, []);

    const formatDate = (dateString) => {
        if (!dateString) return '';
        const date = new Date(dateString);
        const day = String(date.getDate()).padStart(2, '0');
        const month = date.toLocaleString('default', { month: 'short' });
        const year = date.getFullYear();
        return `${day}/${month}/${year}`;
    };

    const formatSalary = (salaryRange) => {
        if (!salaryRange) return '';
        return salaryRange.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    };

    return (
        <>
        <Navbar />
        <div className="all-jobs-container">
            <h1 className="all-jobs-title">Related Jobs</h1>
            <div className="w-full max-w-6xl mx-auto">
                {jobs.length > 0 ? (
                    <table className="jobs-table">
                        <thead>
                            <tr>
                                <th>Position</th>
                                <th>Location</th>
                                <th>Salary Range</th>
                                <th>Opening Date</th>
                                <th>Closing Date</th>
                                <th>Description</th>
                                <th>Requirements</th>
                                <th>Action</th>
                            </tr>
                        </thead>
                        <tbody>
                            {jobs.map((job) => (
                                <tr key={job.id}>
                                    <td>{job.position}</td>
                                    <td>{job.location}</td>
                                    <td>{formatSalary(job.salary_range)}</td>
                                    <td>{formatDate(job.opening_date)}</td>
                                    <td>{formatDate(job.closing_date)}</td>
                                    <td className="job-description">{job.job_description}</td>
                                    <td className="job-requirements">{job.requirements}</td>
                                    <td>
                                        <button
                                            className="mock-button"
                                            disabled={job.applied}
                                            onClick={() => !job.applied && navigate(`/aptitude/${job.com}/${job.id}`)}
                                        >
                                            {job.applied ? "Applied" : "Apply"}
                                        </button>

                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                ) : (
                    <p className="no-jobs-message">No jobs available at the moment.</p>
                )}
            </div>
        </div>
        </>
        
    );
};

export default RelatedJobs;
