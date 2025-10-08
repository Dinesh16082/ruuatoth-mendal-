import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const [isLoaded, setIsLoaded] = useState(false);
    const navigate = useNavigate();

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const handleNavigation = (userType) => {
      navigate(`/login/${userType}`);
  };

  return (
    <div className="landing-container">
      {/* Animated Background Elements */}
      <div className="background-orbs">
        <div className="orb orb-1"></div>
        <div className="orb orb-2"></div>
        <div className="orb orb-3"></div>
        <div className="orb orb-4"></div>
      </div>

      {/* Particle Field */}
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div key={i} className={`particle particle-${i + 1}`}></div>
        ))}
      </div>

      {/* Main Content */}
      <div className={`main-content ${isLoaded ? 'loaded' : ''}`}>
        {/* Header */}
        <div className="header">
          <div className="logo">
            <svg width="60" height="60" viewBox="0 0 24 24" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
            </svg>
          </div>
          <h1 className="title">
            <span className="title-line">Welcome to the</span>
            <span className="title-main">Login Page</span>
          </h1>
          <p className="subtitle">
            Please select your user type to proceed with the login process.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="button-container">
          <button
            onClick={() => handleNavigation('candidate')}
            className="btn btn-candidate"
          >
            <span className="btn-icon">👤</span>
            <span className="btn-text">Candidate</span>
            <div className="btn-shine"></div>
          </button>
          
          <button
            onClick={() => handleNavigation('client')}
            className="btn btn-client"
          >
            <span className="btn-icon">🏢</span>
            <span className="btn-text">Client</span>
            <div className="btn-shine"></div>
          </button>

          {/* ✅ Added HR Button */}
          <button
            onClick={() => handleNavigation('hr')}
            className="btn btn-hr"
          >
            <span className="btn-icon">👨‍💼</span>
            <span className="btn-text">HR</span>
            <div className="btn-shine"></div>
          </button>
        </div>

        {/* Features */}
        <div className="features">
          <div className="feature">
            <div className="feature-icon">⚡</div>
            <div className="feature-text">Fast & Secure</div>
          </div>
          <div className="feature">
            <div className="feature-icon">🌐</div>
            <div className="feature-text">Global Reach</div>
          </div>
          <div className="feature">
            <div className="feature-icon">🎯</div>
            <div className="feature-text">Perfect Match</div>
          </div>
        </div>
      </div>

      <style jsx>{`
        .landing-container {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(180deg, #aa326f, #9b3780);
          position: relative;
          overflow: hidden;
          font-family: 'Arial', sans-serif;
          padding: 20px;
        }

        .background-orbs {
          position: absolute;
          width: 100%;
          height: 100%;
          top: 0;
          left: 0;
          z-index: 1;
        }

        .orb {
          position: absolute;
          border-radius: 50%;
          background: linear-gradient(45deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
          backdrop-filter: blur(20px);
          animation: float 6s ease-in-out infinite;
        }

        .orb-1 {
          width: 300px;
          height: 300px;
          top: 10%;
          left: 10%;
          animation-delay: 0s;
        }

        .orb-2 {
          width: 200px;
          height: 200px;
          top: 20%;
          right: 15%;
          animation-delay: -2s;
        }

        .orb-3 {
          width: 150px;
          height: 150px;
          bottom: 20%;
          left: 20%;
          animation-delay: -4s;
        }

        .orb-4 {
          width: 100px;
          height: 100px;
          bottom: 10%;
          right: 10%;
          animation-delay: -1s;
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
          background: rgba(255,255,255,0.6);
          border-radius: 50%;
          animation: twinkle 3s infinite ease-in-out;
        }

        .particle-1 { top: 10%; left: 20%; animation-delay: 0s; }
        .particle-2 { top: 15%; left: 80%; animation-delay: 0.5s; }
        .particle-3 { top: 25%; left: 60%; animation-delay: 1s; }
        .particle-4 { top: 35%; left: 30%; animation-delay: 1.5s; }
        .particle-5 { top: 45%; left: 90%; animation-delay: 2s; }
        .particle-6 { top: 55%; left: 10%; animation-delay: 2.5s; }
        .particle-7 { top: 65%; left: 70%; animation-delay: 3s; }
        .particle-8 { top: 75%; left: 40%; animation-delay: 0.3s; }
        .particle-9 { top: 85%; left: 85%; animation-delay: 0.8s; }
        .particle-10 { top: 20%; left: 50%; animation-delay: 1.3s; }
        .particle-11 { top: 40%; left: 15%; animation-delay: 1.8s; }
        .particle-12 { top: 60%; left: 95%; animation-delay: 2.3s; }
        .particle-13 { top: 30%; left: 75%; animation-delay: 0.6s; }
        .particle-14 { top: 50%; left: 25%; animation-delay: 1.1s; }
        .particle-15 { top: 70%; left: 55%; animation-delay: 1.6s; }
        .particle-16 { top: 80%; left: 5%; animation-delay: 2.1s; }
        .particle-17 { top: 5%; left: 45%; animation-delay: 2.6s; }
        .particle-18 { top: 90%; left: 65%; animation-delay: 0.4s; }
        .particle-19 { top: 12%; left: 35%; animation-delay: 0.9s; }
        .particle-20 { top: 68%; left: 80%; animation-delay: 1.4s; }

        .main-content {
          position: relative;
          z-index: 10;
          text-align: center;
          max-width: 800px;
          width: 100%;
          opacity: 0;
          transform: translateY(30px);
          transition: all 1s ease-out;
        }

        .main-content.loaded {
          opacity: 1;
          transform: translateY(0);
        }

        .header {
          margin-bottom: 50px;
        }

        .logo {
          width: 80px;
          height: 80px;
          margin: 0 auto 30px;
          background: 'rgba(255, 255, 255, 0.2)';

          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          box-shadow: 0 20px 40px rgba(0,0,0,0.2);
          animation: pulse 2s infinite;
        }

        .title {
          margin: 0 0 20px 0;
          color: white;
        }

        .title-line {
          display: block;
          font-size: 2.5rem;
          font-weight: 300;
          margin-bottom: 10px;
          opacity: 0;
          animation: fadeInUp 1s ease-out 0.5s forwards;
        }

        .title-main {
          display: block;
          font-size: 4rem;
          font-weight: 800;
         background: linear-gradient(135deg, #ffb6c1, #d66d9b, #aa326f);

          background-size: 300% 300%;
          background-clip: text;
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          animation: gradient-animation 3s ease infinite, fadeInUp 1s ease-out 0.7s forwards;
          opacity: 0;
          text-shadow: 0 0 30px rgba(255,255,255,0.5);
        }

        .subtitle {
          font-size: 1.3rem;
          color: black;
          margin: 0 0 40px 0;
          font-weight: 300;
          line-height: 1.6;
          opacity: 0;
          animation: fadeInUp 1s ease-out 0.9s forwards;
        }

        .button-container {
          display: flex;
          gap: 30px;
          justify-content: center;
          margin-bottom: 60px;
          flex-wrap: wrap;
        }

        .btn {
          position: relative;
          padding: 18px 40px;
          border: none;
          border-radius: 15px;
          font-size: 1.1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          overflow: hidden;
          display: flex;
          align-items: center;
          gap: 12px;
          min-width: 180px;
          justify-content: center;
          box-shadow: 0 15px 35px rgba(0,0,0,0.2);
          opacity: 0;
          animation: fadeInUp 1s ease-out 1.1s forwards;
        }

        .btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 20px 40px rgba(0,0,0,0.3);
        }

        .btn-candidate {
          background: linear-gradient(135deg, #f093fb, #f5576c);
          color: white;
        }

        .btn-client {
          background: linear-gradient(135deg, #f093fb, #f5576c);
          color: white;
        }

        .btn-hr {
          background: linear-gradient(135deg, #f093fb, #f5576c);
          color: white;
        }

        .btn-icon {
          font-size: 1.5rem;
        }

        .btn-text {
          position: relative;
          z-index: 2;
        }

        .btn-shine {
          position: absolute;
          top: 0;
          left: -100%;
          width: 100%;
          height: 100%;
          background: linear-gradient(90deg, transparent, rgba(255,255,255,0.3), transparent);
          transition: left 0.5s ease;
        }

        .btn:hover .btn-shine {
          left: 100%;
        }

        .features {
          display: flex;
          justify-content: center;
          gap: 40px;
          flex-wrap: wrap;
          opacity: 0;
          animation: fadeInUp 1s ease-out 1.3s forwards;
        }

        .feature {
          text-align: center;
          color: rgba(255,255,255,0.9);
          padding: 20px;
          border-radius: 15px;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(10px);
          transition: transform 0.3s ease;
        }

        .feature:hover {
          transform: translateY(-5px);
        }

        .feature-icon {
          font-size: 2rem;
          margin-bottom: 10px;
        }

        .feature-text {
          font-size: 1rem;
          font-weight: 500;
        }

        @keyframes float {
          0%, 100% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(180deg); }
        }

        @keyframes twinkle {
          0%, 100% { opacity: 0.3; transform: scale(1); }
          50% { opacity: 1; transform: scale(1.2); }
        }

        @keyframes pulse {
          0%, 100% { box-shadow: 0 20px 40px rgba(0,0,0,0.2); }
          50% { box-shadow: 0 25px 50px rgba(0,0,0,0.3); }
        }

        @keyframes fadeInUp {
          0% { opacity: 0; transform: translateY(30px); }
          100% { opacity: 1; transform: translateY(0); }
        }

        @keyframes gradient-animation {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }

        @media (max-width: 768px) {
          .title-line { font-size: 2rem; }
          .title-main { font-size: 3rem; }
          .subtitle { font-size: 1.1rem; }
          .button-container { flex-direction: column; align-items: center; }
          .btn { min-width: 200px; }
          .features { flex-direction: column; align-items: center; }
          .orb-1, .orb-2, .orb-3, .orb-4 { display: none; }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;
