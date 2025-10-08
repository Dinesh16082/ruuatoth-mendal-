import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,useParams } from 'react-router-dom';


const ForgotPassword = () => {
  const { userType } = useParams(); // This would come from useParams() in your actapp
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [step, setStep] = useState(1);
  const [msg, setMsg] = useState('');
  const navigate = useNavigate();

  const sendOtp = async () => {
  try {
    await axios.post('http://localhost:8000/auth/send-reset-otp/', { email , userType });
    setMsg('OTP sent to your email');
    setStep(2);
  } catch (error) {
    setMsg(error.response?.data?.error || 'Error sending OTP');
  }
};

  const verifyOtp = async () => {
  try {
    const res = await axios.post('http://localhost:8000/auth/verify-reset-otp/', { email, otp });
    if (res.data.verified) {
      setMsg('OTP verified. Now reset your password.');
      setStep(3);
    } else {
      setMsg('Invalid OTP');
    }
  } catch (error) {
    setMsg(error.response?.data?.error || 'OTP verification failed');
  }
};

const resetPassword = async () => {
  try {
    await axios.post('http://localhost:8000/auth/reset-password/', {
      email,
      new_password: newPassword,
      userType
    });
    setMsg('Password reset successful');
    setStep(4);
    setTimeout(() => {
    navigate(`/login/${userType}`); // Redirect to login page after 2 seconds
    }, 2000);
  } catch (error) {
    setMsg(error.response?.data?.error || 'Failed to reset password');
  }
};

  const styles = {
    container: {
      maxWidth: '400px',
      margin: '50px auto',
      padding: '30px',
      backgroundColor: '#ffffff',
      borderRadius: '15px',
      boxShadow: '0 10px 30px rgba(0, 0, 0, 0.1)',
      fontFamily: 'Arial, sans-serif',
      animation: 'slideIn 0.5s ease-out'
    },
    title: {
      textAlign: 'center',
      color: '#333',
      marginBottom: '30px',
      fontSize: '24px',
      fontWeight: 'bold'
    },
    stepContainer: {
      animation: 'fadeIn 0.6s ease-in-out',
      marginBottom: '20px'
    },
    input: {
      width: '100%',
      padding: '15px',
      margin: '10px 0',
      border: '2px solid #e0e0e0',
      borderRadius: '8px',
      fontSize: '16px',
      transition: 'all 0.3s ease',
      boxSizing: 'border-box',
      outline: 'none'
    },
    inputFocus: {
      borderColor: '#4CAF50',
      boxShadow: '0 0 10px rgba(76, 175, 80, 0.3)',
      transform: 'scale(1.02)'
    },
    button: {
      width: '100%',
      padding: '15px',
      backgroundColor: '#4CAF50',
      color: 'white',
      border: 'none',
      borderRadius: '8px',
      fontSize: '16px',
      fontWeight: 'bold',
      cursor: 'pointer',
      transition: 'all 0.3s ease',
      marginTop: '10px',
      position: 'relative',
      overflow: 'hidden'
    },
    buttonHover: {
      backgroundColor: '#45a049',
      transform: 'translateY(-2px)',
      boxShadow: '0 5px 15px rgba(76, 175, 80, 0.4)'
    },
    message: {
      padding: '15px',
      borderRadius: '8px',
      margin: '15px 0',
      textAlign: 'center',
      fontSize: '14px',
      animation: 'messageSlide 0.5s ease-out'
    },
    successMessage: {
      backgroundColor: '#d4edda',
      color: '#155724',
      border: '1px solid #c3e6cb'
    },
    errorMessage: {
      backgroundColor: '#f8d7da',
      color: '#721c24',
      border: '1px solid #f5c6cb'
    },
    progressBar: {
      width: '100%',
      height: '4px',
      backgroundColor: '#e0e0e0',
      borderRadius: '2px',
      marginBottom: '20px',
      overflow: 'hidden'
    },
    progressFill: {
      height: '100%',
      backgroundColor: '#4CAF50',
      borderRadius: '2px',
      transition: 'width 0.5s ease',
      width: `${(step / 4) * 100}%`
    },
    stepIndicator: {
      display: 'flex',
      justifyContent: 'space-between',
      marginBottom: '20px'
    },
    stepDot: {
      width: '30px',
      height: '30px',
      borderRadius: '50%',
      backgroundColor: '#e0e0e0',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      fontSize: '12px',
      fontWeight: 'bold',
      transition: 'all 0.3s ease'
    },
    stepDotActive: {
      backgroundColor: '#4CAF50',
      color: 'white',
      transform: 'scale(1.2)'
    },
    stepDotCompleted: {
      backgroundColor: '#4CAF50',
      color: 'white'
    }
  };

  const cssAnimation = `
    @keyframes slideIn {
      from {
        opacity: 0;
        transform: translateY(-30px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes fadeIn {
      from {
        opacity: 0;
        transform: translateX(-20px);
      }
      to {
        opacity: 1;
        transform: translateX(0);
      }
    }
    
    @keyframes messageSlide {
      from {
        opacity: 0;
        transform: translateY(-10px);
      }
      to {
        opacity: 1;
        transform: translateY(0);
      }
    }
    
    @keyframes pulse {
      0% {
        transform: scale(1);
      }
      50% {
        transform: scale(1.05);
      }
      100% {
        transform: scale(1);
      }
    }
    
    @keyframes ripple {
      0% {
        transform: scale(0);
        opacity: 1;
      }
      100% {
        transform: scale(4);
        opacity: 0;
      }
    }
  `;

  const [focusedInput, setFocusedInput] = useState(null);
  const [hoveredButton, setHoveredButton] = useState(false);

  const handleInputFocus = (inputName) => {
    setFocusedInput(inputName);
  };

  const handleInputBlur = () => {
    setFocusedInput(null);
  };

  const getStepDotStyle = (stepNum) => {
    if (step > stepNum) return { ...styles.stepDot, ...styles.stepDotCompleted };
    if (step === stepNum) return { ...styles.stepDot, ...styles.stepDotActive };
    return styles.stepDot;
  };

  return (
    <>
      <style>{cssAnimation}</style>
      <div style={styles.container}>
        <h3 style={styles.title}>Forgot Password</h3>
        
        <div style={styles.progressBar}>
          <div style={styles.progressFill}></div>
        </div>
        
        <div style={styles.stepIndicator}>
          <div style={getStepDotStyle(1)}>1</div>
          <div style={getStepDotStyle(2)}>2</div>
          <div style={getStepDotStyle(3)}>3</div>
          <div style={getStepDotStyle(4)}>✓</div>
        </div>

        {step === 1 && (
          <div style={styles.stepContainer}>
            <input
              placeholder="Enter Gmail"
              value={email}
              onChange={e => setEmail(e.target.value)}
              onFocus={() => handleInputFocus('email')}
              onBlur={handleInputBlur}
              style={{
                ...styles.input,
                ...(focusedInput === 'email' ? styles.inputFocus : {})
              }}
            />
            <button
              onClick={sendOtp}
              onMouseEnter={() => setHoveredButton(true)}
              onMouseLeave={() => setHoveredButton(false)}
              style={{
                ...styles.button,
                ...(hoveredButton ? styles.buttonHover : {})
              }}
            >
              Send OTP
            </button>
          </div>
        )}

        {step === 2 && (
          <div style={styles.stepContainer}>
            <input
              placeholder="Enter OTP (try: 1234)"
              value={otp}
              onChange={e => setOtp(e.target.value)}
              onFocus={() => handleInputFocus('otp')}
              onBlur={handleInputBlur}
              style={{
                ...styles.input,
                ...(focusedInput === 'otp' ? styles.inputFocus : {})
              }}
            />
            <button
              onClick={verifyOtp}
              onMouseEnter={() => setHoveredButton(true)}
              onMouseLeave={() => setHoveredButton(false)}
              style={{
                ...styles.button,
                ...(hoveredButton ? styles.buttonHover : {})
              }}
            >
              Verify OTP
            </button>
          </div>
        )}

        {step === 3 && (
          <div style={styles.stepContainer}>
            <input
              type="password"
              placeholder="New Password"
              value={newPassword}
              onChange={e => setNewPassword(e.target.value)}
              onFocus={() => handleInputFocus('password')}
              onBlur={handleInputBlur}
              style={{
                ...styles.input,
                ...(focusedInput === 'password' ? styles.inputFocus : {})
              }}
            />
            <button
              onClick={resetPassword}
              onMouseEnter={() => setHoveredButton(true)}
              onMouseLeave={() => setHoveredButton(false)}
              style={{
                ...styles.button,
                ...(hoveredButton ? styles.buttonHover : {})
              }}
            >
              Reset Password
            </button>
          </div>
        )}

        {step === 4 && (
          <div style={styles.stepContainer}>
            <div style={{ ...styles.message, ...styles.successMessage }}>
              🎉 Password reset successful! You can now login with your new password.
            </div>
          </div>
        )}

        {msg && step !== 4 && (
          <div style={{
            ...styles.message,
            ...(msg.includes('successful') || msg.includes('sent') || msg.includes('verified') 
              ? styles.successMessage 
              : styles.errorMessage)
          }}>
            {msg}
          </div>
        )}
      </div>
    </>
  );
};

export default ForgotPassword;



