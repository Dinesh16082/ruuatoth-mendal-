import { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate, useParams, Link } from 'react-router-dom';

const LoginPage = () => {
  const { userType } = useParams(); // Get user type from URL params
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMsg, setErrorMsg] = useState('');
  const [successMsg, setSuccessMsg] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
    console.log(userType);
  }, [userType]);

  const handleLogin = async (e) => {
  e.preventDefault();
  setErrorMsg('');
  setSuccessMsg('');
  setIsLoading(true);

  try {
    const response = await axios.post(
      "http://127.0.0.1:8000/auth/login/",
      {
        email,
        password,
        user_type: userType, // dynamic from URL
      },
      { withCredentials: true }
    );

    const data = response.data;
    console.log("Login response:", data);

    if (data.success === true) {
      // Save data for later use
      localStorage.setItem("company_id", data.company_id || "");
      localStorage.setItem("user_type", data.user_type || "");

      setSuccessMsg(data.message || "Login successful!");
      navigate(`/${userType}-dashboard`);
    } else {
      setErrorMsg(data.message || "Invalid credentials");
    }
  } catch (error) {
    console.error("Login error:", error);
    setErrorMsg("Server error. Please try again.");
  } finally {
    setIsLoading(false);
  }
};


  const handleBack = () => {
    navigate("/landingpage");
  };

  return (
    <div className="login-container">
      {/* Background Elements */}
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
      </div>

      {/* Floating Particles */}
      <div className="particles">
        {[...Array(15)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`}></div>
        ))}
      </div>

      {/* Main Content */}
      <div className={`login-content ${isLoaded ? 'loaded' : ''}`}>
        {/* Back Button */}
        <div className="back-button">
          <button className="back-btn" onClick={handleBack}>
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 12H5m7-7l-7 7 7 7" />
            </svg>
            Back to Portal
          </button>
        </div>

        {/* Login Form */}
        <div className="login-form-container">
          {/* Header */}
          <div className="login-header">
            <div className="user-avatar">
              {userType === 'candidate' ? '👤' : userType === 'client' ? '🏢' : userType === 'hr' ? '🧑‍💼' : '🔑'}
            </div>
            <h2 className="login-title">
              {userType.charAt(0).toUpperCase() + userType.slice(1)} Login
            </h2>
            <p className="login-subtitle">
              Welcome back! Please sign in to your account
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleLogin} className="login-form">
            <div className="form-group">
              <label className="form-label">Email Address</label>
              <div className="input-container">
                <input
                  type="email"
                  className="form-input"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="Enter your email"
                />
                <div className="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207" />
                  </svg>
                </div>
              </div>
            </div>

            <div className="form-group">
              <label className="form-label">Password</label>
              <div className="input-container">
                <input
                  type="password"
                  className="form-input"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="Enter your password"
                />
                <div className="input-icon">
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
                  </svg>
                </div>
              </div>
            </div>

            {/* Messages */}
            {errorMsg && (
              <div className="message error-message">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <circle cx="12" cy="12" r="10"/>
                  <line x1="15" y1="9" x2="9" y2="15"/>
                  <line x1="9" y1="9" x2="15" y2="15"/>
                </svg>
                {errorMsg}
              </div>
            )}

            {successMsg && (
              <div className="message success-message">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"/>
                </svg>
                {successMsg}
              </div>
            )}

            {/* Submit Button */}
            <button
              type="submit"
              className={`submit-btn ${isLoading ? 'loading' : ''}`}
              disabled={isLoading}
            >
              {isLoading ? (
                <div className="loading-spinner"></div>
              ) : (
                'Sign In'
              )}
            </button>
          </form>

          {/* Footer (hidden for HR login) */}
          {userType !== "hr" && (
            <>
              <div className="login-footer">
                <p>
                  Don't have an account?{' '}
                  <Link
                    to={userType === 'client' ? '/client-signup' : '/form'}
                    className="signup-link"
                  >
                    Sign up
                  </Link>
                </p>
              </div>
              <div className="login-footer">
                <p>
                  <Link to={`/forgotpassword/${userType}`} className="signup-link">
                    Forgot Password
                  </Link>
                </p>
              </div>
            </>
          )}
        </div>
      </div>

       <style jsx>{`
          .login-container {
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
            position: relative;
            overflow: hidden;
            font-family: 'Arial', sans-serif;
            padding: 20px;
          }

          .background-shapes {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 1;
          }

          .shape {
            position: absolute;
            border-radius: 50%;
            background: rgba(255, 255, 255, 0.1);
            backdrop-filter: blur(20px);
            animation: float 8s ease-in-out infinite;
          }

          .shape-1 {
            width: 200px;
            height: 200px;
            top: 10%;
            left: 10%;
            animation-delay: 0s;
          }

          .shape-2 {
            width: 150px;
            height: 150px;
            top: 60%;
            right: 15%;
            animation-delay: -3s;
          }

          .shape-3 {
            width: 100px;
            height: 100px;
            bottom: 20%;
            left: 60%;
            animation-delay: -6s;
          }

          .particles {
            position: absolute;
            width: 100%;
            height: 100%;
            top: 0;
            left: 0;
            z-index: 2;
          }

          .particle {
            position: absolute;
            width: 3px;
            height: 3px;
            background: rgba(255, 255, 255, 0.6);
            border-radius: 50%;
            animation: twinkle 3s infinite ease-in-out;
          }

          .particle-1 { top: 15%; left: 20%; animation-delay: 0s; }
          .particle-2 { top: 25%; left: 80%; animation-delay: 0.5s; }
          .particle-3 { top: 35%; left: 60%; animation-delay: 1s; }
          .particle-4 { top: 45%; left: 30%; animation-delay: 1.5s; }
          .particle-5 { top: 55%; left: 90%; animation-delay: 2s; }
          .particle-6 { top: 65%; left: 10%; animation-delay: 2.5s; }
          .particle-7 { top: 75%; left: 70%; animation-delay: 3s; }
          .particle-8 { top: 85%; left: 40%; animation-delay: 0.3s; }
          .particle-9 { top: 20%; left: 50%; animation-delay: 0.8s; }
          .particle-10 { top: 40%; left: 15%; animation-delay: 1.3s; }
          .particle-11 { top: 60%; left: 85%; animation-delay: 1.8s; }
          .particle-12 { top: 80%; left: 25%; animation-delay: 2.3s; }
          .particle-13 { top: 30%; left: 75%; animation-delay: 0.6s; }
          .particle-14 { top: 50%; left: 45%; animation-delay: 1.1s; }
          .particle-15 { top: 70%; left: 65%; animation-delay: 1.6s; }

          .login-content {
            position: relative;
            z-index: 10;
            width: 100%;
            max-width: 450px;
            opacity: 0;
            transform: translateY(30px);
            transition: all 0.8s ease-out;
          }

          .login-content.loaded {
            opacity: 1;
            transform: translateY(0);
          }

          .back-button {
            margin-bottom: 20px;
            opacity: 0;
            animation: fadeInUp 0.8s ease-out 0.2s forwards;
          }

          .back-btn {
            display: flex;
            align-items: center;
            gap: 8px;
            background: rgba(255, 255, 255, 0.1);
            border: none;
            color: white;
            padding: 10px 16px;
            border-radius: 25px;
            font-size: 0.9rem;
            cursor: pointer;
            transition: all 0.3s ease;
            backdrop-filter: blur(10px);
          }

          .back-btn:hover {
            background: rgba(255, 255, 255, 0.2);
            transform: translateX(-5px);
          }

          .login-form-container {
            background: rgba(255, 255, 255, 0.95);
            backdrop-filter: blur(20px);
            border-radius: 25px;
            padding: 40px;
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.2);
            border: 1px solid rgba(255, 255, 255, 0.2);
            opacity: 0;
            animation: fadeInUp 0.8s ease-out 0.4s forwards;
          }

          .login-header {
            text-align: center;
            margin-bottom: 35px;
          }

          .user-avatar {
            width: 80px;
            height: 80px;
            margin: 0 auto 20px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-size: 2rem;
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
          }

          .login-title {
            font-size: 2.2rem;
            font-weight: 700;
            background: linear-gradient(135deg, #667eea, #764ba2);
            background-clip: text;
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            margin: 0 0 10px 0;
          }

          .login-subtitle {
            color: #666;
            font-size: 1rem;
            margin: 0;
            font-weight: 400;
          }

          .login-form {
            margin-bottom: 25px;
          }

          .form-group {
            margin-bottom: 25px;
          }

          .form-label {
            display: block;
            margin-bottom: 8px;
            font-weight: 600;
            color: #333;
            font-size: 0.95rem;
          }

          .input-container {
            position: relative;
          }

          .form-input {
            width: 100%;
            padding: 15px 20px 15px 50px;
            border: 2px solid #e1e5e9;
            border-radius: 15px;
            font-size: 1rem;
            transition: all 0.3s ease;
            background: #fff;
            box-sizing: border-box;
          }

          .form-input:focus {
            outline: none;
            border-color: #667eea;
            box-shadow: 0 0 0 3px rgba(102, 126, 234, 0.1);
          }

          .input-icon {
            position: absolute;
            left: 18px;
            top: 50%;
            transform: translateY(-50%);
            color: #999;
            transition: color 0.3s ease;
          }

          .form-input:focus + .input-icon {
            color: #667eea;
          }

          .message {
            display: flex;
            align-items: center;
            gap: 10px;
            padding: 12px 16px;
            border-radius: 10px;
            font-size: 0.9rem;
            margin-bottom: 20px;
            animation: slideIn 0.3s ease-out;
          }

          .error-message {
            background: #fef2f2;
            color: #dc2626;
            border: 1px solid #fecaca;
          }

          .success-message {
            background: #f0fdf4;
            color: #16a34a;
            border: 1px solid #bbf7d0;
          }

          .submit-btn {
            width: 100%;
            padding: 16px;
            background: linear-gradient(135deg, #667eea, #764ba2);
            border: none;
            border-radius: 15px;
            color: white;
            font-size: 1.1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s ease;
            position: relative;
            overflow: hidden;
          }

          .submit-btn:hover:not(:disabled) {
            transform: translateY(-2px);
            box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
          }

          .submit-btn:disabled {
            opacity: 0.7;
            cursor: not-allowed;
          }

          .submit-btn.loading {
            pointer-events: none;
          }

          .loading-spinner {
            width: 20px;
            height: 20px;
            border: 2px solid rgba(255, 255, 255, 0.3);
            border-top: 2px solid white;
            border-radius: 50%;
            animation: spin 1s linear infinite;
            margin: 0 auto;
          }

          .login-footer {
            text-align: center;
            margin-top: 25px;
          }

          .login-footer p {
            color: #666;
            font-size: 0.9rem;
            margin: 0;
          }

          .signup-link {
            color: #667eea;
            text-decoration: none;
            font-weight: 600;
            transition: color 0.3s ease;
          }

          .signup-link:hover {
            color: #764ba2;
          }

          @keyframes float {
            0%, 100% { transform: translateY(0px); }
            50% { transform: translateY(-20px); }
          }

          @keyframes twinkle {
            0%, 100% { opacity: 0.3; }
            50% { opacity: 1; }
          }

          @keyframes fadeInUp {
            0% { opacity: 0; transform: translateY(30px); }
            100% { opacity: 1; transform: translateY(0); }
          }

          @keyframes slideIn {
            0% { opacity: 0; transform: translateX(-20px); }
            100% { opacity: 1; transform: translateX(0); }
          }

          @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
          }

          @media (max-width: 768px) {
            .login-container {
              padding: 15px;
            }
          
            .login-form-container {
              padding: 30px 25px;
            }
          
            .login-title {
              font-size: 1.8rem;
            }
          
           .form-input {
             padding: 12px 15px 12px 45px;
          }
         }
       `}</style>
    </div>
  );
};

export default LoginPage;
