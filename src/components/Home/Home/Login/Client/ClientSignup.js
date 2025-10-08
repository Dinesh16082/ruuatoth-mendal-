import React, { useState, useEffect } from 'react';
import axios from 'axios';
import styles from './ClientSignup.css'; // Assuming you have a CSS module for styles
import { useNavigate } from 'react-router-dom';

const ClientSignup = () => {
  const [formData, setFormData] = useState({
    company_name: '',
    company_location: '',
    company_email: '',
    company_phone: '',
    company_social_media_Linkedin: [],
    company_social_media_Instagram: [],
    company_social_media_Facebook: [],
    company_social_media_Twitter: [],
    company_social_media_Whatsapp_group: [],
    company_department: '',
    company_employees: '',
    company_weblink: '',
    start_year: '',
    annual_income: '',
    net_profit: '',
    company_branch_no: '',
    company_certification: '',
    company_license: '',
    password: '',
    confirm_password: ''
  });

  // const [usertype, setUsertype] = useState('client'); // Assuming usertype is 'client'
  const navigate = useNavigate();
  const [message, setMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isLoaded, setIsLoaded] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [usertype, setUsertype] = useState('client'); // Default user type

  //Email validation regex
  const [otp, setOtp] = useState('');
  const [isEmailVerified, setIsEmailVerified] = useState(false);
  const [otpSent, setOtpSent] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [otpSuccess, setOtpSuccess] = useState('');
  const [resendTimer, setResendTimer] = useState(0);

//Number validation regex
const [phoneOtp, setPhoneOtp] = useState('');
const [isPhoneVerified, setIsPhoneVerified] = useState(false);
const [phoneOtpSent, setPhoneOtpSent] = useState(false);
const [phoneOtpMessage, setPhoneOtpMessage] = useState('');
const [sessionId, setSessionId] = useState(null);


const sendPhoneOtp = async () => {
  if (!formData.company_phone) {
    setPhoneOtpMessage("❌ Please enter a phone number first.");
    return;
  }

  try {
    const res = await fetch('http://localhost:8000/auth/send-phone-otp/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ phone: formData.company_phone }),
    });

    const data = await res.json();
    setSessionId(data.session_id);  // ✅ Save this

    if (res.ok) {
      setPhoneOtpSent(true);
      setPhoneOtpMessage('✅ OTP sent to your phone!');
      console.log("OTP sent successfully. Session ID:", data.session_id);
    } else {
      setPhoneOtpMessage(`❌ Failed: ${data.message}`);
    }
  } catch (error) {
    console.error(error);
    setPhoneOtpMessage('❌ Failed to send OTP.');
  }
};


//Verify phone OTP
const verifyPhoneOtp = async () => {
  if (!sessionId) {
    setPhoneOtpMessage("❌ Missing session ID.");
    return;
  }

  try {
    console.log("Verifying OTP with session_id:", sessionId, "OTP:", phoneOtp);

    const res = await fetch('http://localhost:8000/auth/verify-phone-otp/', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        session_id: sessionId,
        otp: phoneOtp,
      }),
    });

    const data = await res.json();

    if (res.ok && data.verified) {
      setIsPhoneVerified(true);
      setPhoneOtpMessage("✅ Phone number verified!");
    } else {
      setIsPhoneVerified(false);
      setPhoneOtpMessage(`❌ ${data.error || 'Invalid OTP. Try again.'}`);
    }
  } catch (error) {
    console.error("OTP verification failed:", error);
    setIsPhoneVerified(false);
    setPhoneOtpMessage("❌ Verification failed.");
  }
};




  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith('company_social_media_')) {
      setFormData((prev) => ({
        ...prev,
        [name]: value.split(',').map((v) => v.trim()),
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleSubmit = async (e) => {
  e.preventDefault();
  setIsLoading(true);
  setMessage('');

  // ✅ 0. Basic validation
  if (!isEmailVerified) {
  setMessage("❌ Please verify your email before submitting.");
  setIsLoading(false);
  return;
}


  // ✅ 1. Check if passwords match
  if (formData.password !== formData.confirm_password) {
    setMessage("❌ Passwords do not match.");
    setIsLoading(false);
    return;
  }

  // ✅ 2. Validate password strength
  const strongPasswordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&])[A-Za-z\d@$!%*?#&]{8,}$/;

  if (!strongPasswordRegex.test(formData.password)) {
    setMessage("❌ Password must be at least 8 characters long and include:\n- Uppercase letter\n- Lowercase letter\n- Number\n- Special character");
    setIsLoading(false);
    return;
  }

  // ✅ 3. Submit form if validation passes
  try {
    const res = await fetch('http://localhost:8000/api/company/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (res.ok) {
      const responseData = await res.json();
      setMessage('✅ Client created successfully!');
      navigate(`/login/${usertype}`);
      console.log('Created:', responseData);
    } else {
      const errorData = await res.json();
      setMessage(`❌ Registration failed: ${JSON.stringify(errorData)}`);
    }
  } catch (error) {
    setMessage('❌ Registration failed. Please try again.');
    console.error(error);
  } finally {
    setIsLoading(false);
  }
};

//Send OTP for email verification
useEffect(() => {
  let interval;
  if (resendTimer > 0) {
    interval = setInterval(() => {
      setResendTimer((prev) => prev - 1);
    }, 1000);
  }
  return () => clearInterval(interval);
}, [resendTimer]);

const sendOtpToEmail = async () => {
  if (!formData.company_email) {
    setMessage("❌ Please enter email first.");
    return;
  }

  try {
    const res = await fetch('http://localhost:8000/auth/send-otp/', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ email: formData.company_email }),
    });

    const data = await res.json();

    if (res.ok) {
      setOtpSent(true);
      setResendTimer(30); // cooldown in seconds
      setMessage('✅ OTP sent to your email!');
    } else {
      setMessage(`❌ Failed to send OTP: ${data.message}`);
    }
  } catch (error) {
    console.error(error);
    setMessage('❌ Failed to send OTP.');
  }
};

const verifyOtp = async () => {
  setOtpError('');
  setOtpSuccess('');
  try {
    const res = await axios.post('http://localhost:8000/auth/verify-otp/', {
      email: formData.company_email,
      otp,
    });

    const data = res.data;

    if (res.status === 200 && data.verified) {
      setIsEmailVerified(true);
      setOtpSuccess('✅ Email verified successfully!');
      setOtpError('');
      
    } else {
      setIsEmailVerified(false);
      setOtpError('❌ Invalid OTP. Please try again.');
      
    }
  } catch (err) {
    console.error(err);
    setIsEmailVerified(false);
    setOtpError('❌ OTP verification failed.');
    
  }
};




  const nextStep = () => {
    if (currentStep < 3) setCurrentStep(currentStep + 1);
  };

  const prevStep = () => {
    if (currentStep > 1) setCurrentStep(currentStep - 1);
  };

  const renderStep1 = () => (
    <div>
      <div className="form-group">
        <label className="form-label">Company Name *</label>
        <div className="input-container">
          <input
            type="text"
            name="company_name"
            className="form-input"
            value={formData.company_name}
            onChange={handleChange}
            required
            placeholder="Enter company name"
          />
          <div className="input-icon">🏢</div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Company Location *</label>
        <div className="input-container">
          <input
            type="text"
            name="company_location"
            className="form-input"
            value={formData.company_location}
            onChange={handleChange}
            required
            placeholder="Enter location"
          />
          <div className="input-icon">📍</div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Company Email *</label>
        <div className="input-container">
          <input
            type="email"
            name="company_email"
            className="form-input"
            value={formData.company_email}
            onChange={handleChange}
            required
            placeholder="Enter email address"
          />
          {isEmailVerified && (
            <div style={{ color: 'green', marginTop: '5px', fontSize: '0.9rem' }}>
              {/* ✅ Email Verified */}
            </div>
          )}

          <div className="input-icon">📧</div>
        </div>
      </div>

      
      {!isEmailVerified && (
          <button type="button" onClick={sendOtpToEmail} disabled={otpSent} className='nav-btn next-btn'>
            {otpSent ? 'OTP Sent' : 'Send OTP'}
          </button>
        )}

          {otpSent && !isEmailVerified && (
          <div className="form-group">
            <label className="form-label">Enter OTP</label>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              className="form-input"
            />
            <button
              type="button"
              onClick={verifyOtp}
              className="nav-btn next-btn"
            >
              Verify OTP
            </button>
            
            <button
              type="button"
              onClick={sendOtpToEmail}
              disabled={resendTimer > 0}
              className="nav-btn next-btn"
              style={{ marginTop: '10px', backgroundColor: '#f39c12' }}
            >
              {resendTimer > 0 ? `Resend OTP (${resendTimer})` : 'Resend OTP'}
            </button>
          </div>
        )}

        {isEmailVerified && (
          <div style={{ color: 'green', marginTop: '10px', fontSize: '0.9rem' }}>
            ✅ Email Verified
          </div>
        )}



      <div className="form-group">
        <label className="form-label">Phone Number *</label>
        <div className="input-container">
          <input
            type="text"
            name="company_phone"
            className="form-input"
            value={formData.company_phone}
            onChange={handleChange}
            required
            placeholder="Enter phone number"
          />
          <div className="input-icon">📞</div>
        </div>
        
        

          {!isPhoneVerified && (
            <button onClick={sendPhoneOtp} disabled={phoneOtpSent} className='nav-btn next-btn'>
              {phoneOtpSent ? 'OTP Sent' : 'Send Phone OTP'}
            </button>
          )}

          {phoneOtpSent && !isPhoneVerified && (
            <>
              <input
                type="text"
                placeholder="Enter phone OTP"
                className="form-input"
                value={phoneOtp}
                onChange={(e) => setPhoneOtp(e.target.value)}
              />
              <button onClick={verifyPhoneOtp} className='nav-btn next-btn'>Verify OTP</button>

              {/* 🔁 Resend button only if OTP was sent but not verified */}
              <button onClick={sendPhoneOtp} className='nav-btn next-btn' style={{ marginTop: '10px' }}>
                Resend OTP
              </button>
            </>
          )}

          {phoneOtpMessage && <p>{phoneOtpMessage}</p>}

      </div>

      <div className="form-group">
        <label className="form-label">Number of Employees (Optional)</label>
        <div className="input-container">
          <input
            type="number"
            name="company_employees"
            className="form-input"
            value={formData.company_employees}
            onChange={handleChange}
            placeholder="Enter number of employees"
          />
          <div className="input-icon">👥</div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Start Year (Optional)</label>
        <div className="input-container">
          <input
            type="number"
            name="start_year"
            className="form-input"
            value={formData.start_year}
            onChange={handleChange}
            placeholder="Enter start year"
          />
          <div className="input-icon">📅</div>
        </div>
      </div>
    </div>
  );

  const renderStep2 = () => (
    <div>
      <div className="form-group">
        <label className="form-label">LinkedIn (Optional)</label>
        <div className="input-container">
          <input
            type="text"
            name="company_social_media_Linkedin"
            className="form-input"
            value={formData.company_social_media_Linkedin.join(', ')}
            onChange={handleChange}
            placeholder="LinkedIn profiles (comma-separated)"
          />
          <div className="input-icon">💼</div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Instagram (Optional)</label>
        <div className="input-container">
          <input
            type="text"
            name="company_social_media_Instagram"
            className="form-input"
            value={formData.company_social_media_Instagram.join(', ')}
            onChange={handleChange}
            placeholder="Instagram profiles (comma-separated)"
          />
          <div className="input-icon">📸</div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Facebook (Optional)</label>
        <div className="input-container">
          <input
            type="text"
            name="company_social_media_Facebook"
            className="form-input"
            value={formData.company_social_media_Facebook.join(', ')}
            onChange={handleChange}
            placeholder="Facebook profiles (comma-separated)"
          />
          <div className="input-icon">👥</div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Twitter (Optional)</label>
        <div className="input-container">
          <input
            type="text"
            name="company_social_media_Twitter"
            className="form-input"
            value={formData.company_social_media_Twitter.join(', ')}
            onChange={handleChange}
            placeholder="Twitter profiles (comma-separated)"
          />
          <div className="input-icon">🐦</div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">WhatsApp Group (Optional)</label>
        <div className="input-container">
          <input
            type="text"
            name="company_social_media_Whatsapp_group"
            className="form-input"
            value={formData.company_social_media_Whatsapp_group.join(', ')}
            onChange={handleChange}
            placeholder="WhatsApp groups (comma-separated)"
          />
          <div className="input-icon">💬</div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Website (Optional)</label>
        <div className="input-container">
          <input
            type="url"
            name="company_weblink"
            className="form-input"
            value={formData.company_weblink}
            onChange={handleChange}
            placeholder="Enter website URL"
          />
          <div className="input-icon">🌐</div>
        </div>
      </div>
    </div>
  );

  const renderStep3 = () => (
    <div>
      <div className="form-group">
        <label className="form-label">Department (Optional)</label>
        <div className="input-container">
          <input
            type="text"
            name="company_department"
            className="form-input"
            value={formData.company_department}
            onChange={handleChange}
            placeholder="Enter department"
          />
          <div className="input-icon">🏬</div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Annual Income (Optional)</label>
        <div className="input-container">
          <input
            type="number"
            name="annual_income"
            className="form-input"
            value={formData.annual_income}
            onChange={handleChange}
            step="0.01"
            placeholder="Enter annual income"
          />
          <div className="input-icon">💰</div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Net Profit (Optional)</label>
        <div className="input-container">
          <input
            type="number"
            name="net_profit"
            className="form-input"
            value={formData.net_profit}
            onChange={handleChange}
            step="0.01"
            placeholder="Enter net profit"
          />
          <div className="input-icon">📈</div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Branch Number (Optional)</label>
        <div className="input-container">
          <input
            type="text"
            name="company_branch_no"
            className="form-input"
            value={formData.company_branch_no}
            onChange={handleChange}
            placeholder="Enter branch number"
          />
          <div className="input-icon">🏪</div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">Certification (Optional)</label>
        <div className="input-container">
          <input
            type="text"
            name="company_certification"
            className="form-input"
            value={formData.company_certification}
            onChange={handleChange}
            placeholder="Enter certification details"
          />
          <div className="input-icon">🏆</div>
        </div>
      </div>

      <div className="form-group">
        <label className="form-label">License (Optional)</label>
        <div className="input-container">
          <input
            type="text"
            name="company_license"
            className="form-input"
            value={formData.company_license}
            onChange={handleChange}
            placeholder="Enter license details"
          />
          <div className="input-icon">📜</div>
        </div>
      </div>
      <div className="form-group">
        <label className="form-label">Password</label>
        <div className="input-container">
            <input
            type="password"
            name="password"
            className="form-input"
            value={formData.password}
            onChange={handleChange}
            required
            placeholder="Enter password"
            />
            <div className="input-icon">🔒</div>
        </div>
        </div>

        <div className="form-group">
        <label className="form-label">Confirm Password</label>
        <div className="input-container">
            <input
            type="password"
            name="confirm_password"
            className="form-input"
            value={formData.confirm_password}
            onChange={handleChange}
            required
            placeholder="Re-enter password"
            />
            <div className="input-icon">🔒</div>
        </div>
        </div>
    </div>
    
  );

  return (
    <div className="signup-container">
      <div className="background-shapes">
        <div className="shape shape-1"></div>
        <div className="shape shape-2"></div>
        <div className="shape shape-3"></div>
        <div className="shape shape-4"></div>
      </div>

      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`}></div>
        ))}
      </div>

      <div className={`signup-content ${isLoaded ? 'loaded' : ''}`}>
        <div className="signup-form-container">
          <div className="signup-header">
            <div className="company-avatar">
              <div className="avatar-inner">🏢</div>
            </div>
            <h2 className="signup-title">Company Registration</h2>
            <p className="signup-subtitle">Join our platform and grow your business</p>
            
            <div className="progress-container">
              <div className="progress-bar">
                <div 
                  className="progress-fill" 
                  style={{ width: `${(currentStep / 3) * 100}%` }}
                ></div>
              </div>
              <div className="progress-steps">
                {[1, 2, 3].map((step) => (
                  <div key={step} className={`progress-step ${currentStep >= step ? 'active' : ''}`}>
                    {step}
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="signup-form">
            <div className="form-step">
              {currentStep === 1 && renderStep1()}
              {currentStep === 2 && renderStep2()}
              {currentStep === 3 && renderStep3()}
            </div>

            {message && (
              <div className={`message ${message.includes('success') ? 'success-message' : 'error-message'}`}>
                <div className="message-icon">
                  {message.includes('success') ? '✅' : '❌'}
                </div>
                {message}
              </div>
            )}

            <div className="form-navigation">
              {currentStep > 1 && (
                <button type="button" onClick={prevStep} className="nav-btn prev-btn">
                  <span>← Previous</span>
                </button>
              )}
              
              {currentStep < 3 ? (
                <button type="button" onClick={nextStep} className="nav-btn next-btn">
                  <span>Next →</span>
                </button>
              ) : (
                <button
                  type="button"
                  onClick={handleSubmit}
                  className={`submit-btn ${isLoading ? 'loading' : ''}`}
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <div className="loading-spinner"></div>
                  ) : (
                    'Complete Registration'
                  )}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .signup-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 50%, #f093fb 100%);
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
          width: 300px;
          height: 300px;
          top: 5%;
          left: 5%;
          animation-delay: 0s;
        }

        .shape-2 {
          width: 200px;
          height: 200px;
          top: 70%;
          right: 10%;
          animation-delay: -2s;
        }

        .shape-3 {
          width: 150px;
          height: 150px;
          bottom: 10%;
          left: 70%;
          animation-delay: -4s;
        }

        .shape-4 {
          width: 100px;
          height: 100px;
          top: 40%;
          right: 80%;
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
          width: 4px;
          height: 4px;
          background: rgba(255, 255, 255, 0.8);
          border-radius: 50%;
          animation: twinkle 3s infinite ease-in-out;
        }

        .particle-1 { top: 10%; left: 15%; animation-delay: 0s; }
        .particle-2 { top: 20%; left: 85%; animation-delay: 0.5s; }
        .particle-3 { top: 30%; left: 75%; animation-delay: 1s; }
        .particle-4 { top: 40%; left: 25%; animation-delay: 1.5s; }
        .particle-5 { top: 50%; left: 90%; animation-delay: 2s; }
        .particle-6 { top: 60%; left: 10%; animation-delay: 2.5s; }
        .particle-7 { top: 70%; left: 65%; animation-delay: 3s; }
        .particle-8 { top: 80%; left: 35%; animation-delay: 0.3s; }
        .particle-9 { top: 15%; left: 55%; animation-delay: 0.8s; }
        .particle-10 { top: 35%; left: 5%; animation-delay: 1.3s; }
        .particle-11 { top: 55%; left: 95%; animation-delay: 1.8s; }
        .particle-12 { top: 75%; left: 20%; animation-delay: 2.3s; }
        .particle-13 { top: 25%; left: 70%; animation-delay: 0.6s; }
        .particle-14 { top: 45%; left: 40%; animation-delay: 1.1s; }
        .particle-15 { top: 65%; left: 60%; animation-delay: 1.6s; }
        .particle-16 { top: 85%; left: 80%; animation-delay: 2.1s; }
        .particle-17 { top: 5%; left: 45%; animation-delay: 0.4s; }
        .particle-18 { top: 95%; left: 50%; animation-delay: 1.4s; }
        .particle-19 { top: 35%; left: 85%; animation-delay: 2.4s; }
        .particle-20 { top: 75%; left: 45%; animation-delay: 0.7s; }

        .signup-content {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 550px;
          opacity: 0;
          transform: translateY(50px);
          transition: all 1s ease-out;
        }

        .signup-content.loaded {
          opacity: 1;
          transform: translateY(0);
        }

        .signup-form-container {
          background: rgba(255, 255, 255, 0.95);
          backdrop-filter: blur(30px);
          border-radius: 30px;
          padding: 50px;
          box-shadow: 0 30px 60px rgba(0, 0, 0, 0.3);
          border: 1px solid rgba(255, 255, 255, 0.3);
          animation: slideInUp 1s ease-out 0.3s both;
        }

        .signup-header {
          text-align: center;
          margin-bottom: 40px;
        }

        .company-avatar {
          width: 100px;
          height: 100px;
          margin: 0 auto 25px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.2);
          animation: pulse 2s infinite;
        }

        .avatar-inner {
          font-size: 2.5rem;
          animation: bounce 2s infinite;
        }

        .signup-title {
          font-size: 2.5rem;
          font-weight: 700;
          background: linear-gradient(135deg, #667eea, #764ba2);
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          margin: 0 0 15px 0;
          animation: fadeInUp 1s ease-out 0.5s both;
        }

        .signup-subtitle {
          color: #666;
          font-size: 1.1rem;
          margin: 0 0 30px 0;
          font-weight: 400;
          animation: fadeInUp 1s ease-out 0.7s both;
        }

        .progress-container {
          margin-bottom: 30px;
          animation: fadeInUp 1s ease-out 0.9s both;
        }

        .progress-bar {
          width: 100%;
          height: 6px;
          background: #e1e5e9;
          border-radius: 3px;
          overflow: hidden;
          margin-bottom: 15px;
        }

        .progress-fill {
          height: 100%;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border-radius: 3px;
          transition: width 0.5s ease;
        }

        .progress-steps {
          display: flex;
          justify-content: space-between;
          align-items: center;
        }

        .progress-step {
          width: 35px;
          height: 35px;
          border-radius: 50%;
          background: #e1e5e9;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: 600;
          color: #666;
          transition: all 0.3s ease;
        }

        .progress-step.active {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          transform: scale(1.1);
        }

        .signup-form {
          animation: fadeInUp 1s ease-out 1.1s both;
        }

        .form-step {
          min-height: 400px;
        }

        .form-group {
          margin-bottom: 25px;
          animation: slideInLeft 0.5s ease-out both;
        }

        .form-group:nth-child(even) {
          animation: slideInRight 0.5s ease-out both;
        }

        .form-label {
          display: block;
          margin-bottom: 8px;
          font-weight: 600;
          color: #333;
          font-size: 1rem;
        }

        .input-container {
          position: relative;
        }

        .form-input {
          width: 100%;
          padding: 18px 25px 18px 60px;
          border: 2px solid #e1e5e9;
          border-radius: 20px;
          font-size: 1rem;
          transition: all 0.3s ease;
          background: #fff;
          box-sizing: border-box;
        }

        .form-input:focus {
          outline: none;
          border-color: #667eea;
          box-shadow: 0 0 0 4px rgba(102, 126, 234, 0.1);
          transform: translateY(-2px);
        }

        .input-icon {
          position: absolute;
          left: 22px;
          top: 50%;
          transform: translateY(-50%);
          font-size: 1.2rem;
          transition: all 0.3s ease;
        }

        .form-input:focus + .input-icon {
          transform: translateY(-50%) scale(1.1);
        }

        .message {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 15px 20px;
          border-radius: 15px;
          font-size: 1rem;
          margin-bottom: 25px;
          animation: slideIn 0.5s ease-out;
        }

        .message-icon {
          font-size: 1.2rem;
        }

        .error-message {
          background: #fef2f2;
          color: #dc2626;
          border: 2px solid #fecaca;
        }

        .success-message {
          background: #f0fdf4;
          color: #16a34a;
          border: 2px solid #bbf7d0;
        }

        .form-navigation {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-top: 30px;
        }

        .nav-btn {
          padding: 15px 30px;
          border: none;
          border-radius: 20px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .prev-btn {
          background: rgba(102, 126, 234, 0.1);
          color: #667eea;
          border: 2px solid #667eea;
        }

        .prev-btn:hover {
          background: #667eea;
          color: white;
          transform: translateX(-5px);
        }

        .next-btn {
          background: linear-gradient(135deg, #667eea, #764ba2);
          color: white;
          margin-left: auto;
        }

        .next-btn:hover {
          transform: translateX(5px);
          box-shadow: 0 15px 30px rgba(0, 0, 0, 0.2);
        }

        .submit-btn {
          width: 100%;
          padding: 18px;
          background: linear-gradient(135deg, #667eea, #764ba2);
          border: none;
          border-radius: 20px;
          color: white;
          font-size: 1.2rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
        }

        .submit-btn:hover:not(:disabled) {
          transform: translateY(-3px);
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3);
        }

        .submit-btn:disabled {
          opacity: 0.7;
          cursor: not-allowed;
        }

        .submit-btn.loading {
          pointer-events: none;
        }

        .loading-spinner {
          width: 24px;
          height: 24px;
          border: 3px solid rgba(255, 255, 255, 0.3);
          border-top: 3px solid white;
          border-radius: 50%;
          animation: spin 1s linear infinite;
          margin: 0 auto;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-30px) rotate(180deg); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        @keyframes slideInUp {
          0% { opacity: 0; transform: translateY(60px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(40px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes slideInLeft {
          0% { opacity: 0; transform: translateX(-30px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideInRight {
          0% { opacity: 0; transform: translateX(30px); }
          100% { opacity: 1; transform: translateX(0); }
        }

        @keyframes slideIn {
          0% { opacity: 0; transform: translateY(-20px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes pulse {
          0%, 100% { transform: scale(1); }
          50% { transform: scale(1.05); }
        }

        @keyframes bounce {
          0%, 20%, 50%, 80%, 100% { transform: translateY(0); }
          40% { transform: translateY(-10px); }
          60% { transform: translateY(-5px); }
        }

        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }

        @media (max-width: 768px) {
          .signup-container {
            padding: 10px;
          }
          
          .signup-form-container {
            padding: 30px 25px;
          }
          
          .signup-title {
            font-size: 2rem;
          }
          
          .form-input {
            padding: 15px 20px 15px 50px;
          }
          
          .form-navigation {
            flex-direction: column;
            gap: 15px;
          }
          
          .nav-btn {
            width: 100%;
          }
        }
      `}</style>
    </div>
  );
};

export default ClientSignup;