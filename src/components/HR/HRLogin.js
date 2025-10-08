import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const HRLogin = () => {
  const [hrId, setHrId] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
  e.preventDefault();
  try {
    const response = await fetch("http://localhost:8000/api/hr-login/", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ hr_id: hrId, password }),
    });

    const data = await response.json();

    if (data.success) {
      navigate("/hr-dashboard"); // ✅ Redirect on success
    } else {
      setError("❌ " + data.message);
    }
  } catch (err) {
    setError("❌ Server error. Please try again later.");
  }
};

  return (
    <div style={styles.container}>
      <h2>HR Login</h2>
      <form onSubmit={handleLogin} style={styles.form}>
        <input
          type="text"
          placeholder="Enter HR ID"
          value={hrId}
          onChange={(e) => setHrId(e.target.value)}
          style={styles.input}
          required
        />
        <input
          type="password"
          placeholder="Enter Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          style={styles.input}
          required
        />
        {error && <p style={styles.error}>{error}</p>}
        <button type="submit" style={styles.button}>Login</button>
      </form>
    </div>
  );
};

// Simple inline styles
const styles = {
  container: { display: 'flex', flexDirection: 'column', alignItems: 'center', marginTop: '50px' },
  form: { display: 'flex', flexDirection: 'column', gap: '10px', width: '300px' },
  input: { padding: '10px', fontSize: '16px' },
  button: { padding: '10px', fontSize: '16px', background: '#185a9d', color: 'white', border: 'none', cursor: 'pointer' },
  error: { color: 'red', fontSize: '14px' }
};

export default HRLogin;
