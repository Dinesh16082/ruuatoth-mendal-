import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import "./TestResult.css"; // optional css for styling

const TestResult = () => {
  const { candidateId, openingId, companyId } = useParams();
  const [aptitudeResults, setAptitudeResults] = useState([]);
  const [technicalResults, setTechnicalResults] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchResults();
  }, [candidateId, openingId, companyId]);

  const fetchResults = async () => {
    try {
      const response = await axios.get(
        `http://localhost:8000/auth/test-result/${candidateId}/${openingId}/${companyId}/`
      );

      const results = response.data.results || [];

      // Separate by test_type
      setAptitudeResults(results.filter((r) => r.test_type === "Aptitude"));
      setTechnicalResults(results.filter((r) => r.test_type === "Technical"));
    } catch (error) {
      console.error("Error fetching test results:", error);
    } finally {
      setLoading(false);
    }
  };

  const renderTable = (title, results) => (
    <div className="test-section">
      <h3>{title}</h3>
      {results.length > 0 ? (
        <table className="test-result-table">
          <thead>
            <tr>
              <th>Question</th>
              <th>Options</th>
              <th>Selected Answer</th>
              <th>Correct Answer</th>
              <th>Score</th>
            </tr>
          </thead>
          <tbody>
            {results.map((res, index) => (
              <tr key={index}>
                <td>{res.question}</td>
                <td>
                  {Object.entries(res.options).map(([key, value]) => (
                    <div key={key}>
                      <strong>{key}:</strong> {value}
                    </div>
                  ))}
                </td>
                <td
                  className={
                    res.selected_answer === res.correct_answer
                      ? "correct"
                      : "wrong"
                  }
                >
                  {res.selected_answer || "Not Answered"}
                </td>
                <td>{res.correct_answer}</td>
                <td>{res.score}</td>
              </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No {title.toLowerCase()} found for this candidate.</p>
      )}
    </div>
  );

  if (loading) {
    return <p>Loading test results...</p>;
  }

  return (
    <div className="test-result-container">
      <h2>Test Results</h2>
      {renderTable("Aptitude Test", aptitudeResults)}
      {renderTable("Technical Test", technicalResults)}
    </div>
  );
};

export default TestResult;


// import React, { useEffect, useState } from "react";
// import { useParams } from "react-router-dom";
// import axios from "axios";

// const TestResult = () => {
//   const { candidateId, openingId, companyId } = useParams();
//   console.log("Candidate ID:", candidateId);
//   console.log("Opening ID:", openingId);  
//   console.log("Company ID:", companyId);
//   const [results, setResults] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchResults();
//   }, []);

//   const fetchResults = async () => {
//     try {
//       const response = await axios.get(
//         `http://localhost:8000/auth/test-result/${candidateId}/${openingId}/${companyId}/`
//       );
//       console.log("Test Result API:", response.data);
//       setResults(response.data || []);
//     } catch (error) {
//       console.error("Error fetching test results:", error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const normalizeOptions = (options) => {
//     if (Array.isArray(options)) return options;
//     if (typeof options === "string") return options.split(","); // if backend sends as string
//     return [];
//   };

//   if (loading) {
//     return <p>Loading results...</p>;
//   }

//   return (
//     <div className="test-result-container">
//       <h2>Test Results</h2>
//       {results.length > 0 ? (
//         results.map((res, index) => (
//           <div key={index} className="question-card">
//             <p>
//               <strong>Q{index + 1}:</strong> {res.question}
//             </p>
//             <ul>
//               {normalizeOptions(res.options).map((opt, i) => (
//                 <li key={i}>{opt}</li>
//               ))}
//             </ul>
//             <p>
//               <strong>Correct Answer:</strong> {res.answer}
//             </p>
//             <p>
//               <strong>Your Answer:</strong> {res.user_answer || "Not answered"}
//             </p>
//           </div>
//         ))
//       ) : (
//         <p>No test results available for this candidate.</p>
//       )}
//     </div>
//   );
// };

// export default TestResult;
