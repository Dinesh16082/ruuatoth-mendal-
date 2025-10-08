import React, { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import Lottie from 'lottie-react';
import animationData from '../../../assets/lottie/Business team.json';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Navbar/Navbar';
import { Briefcase, Send, Mic, CheckCircle } from 'lucide-react';

const CandidateWelcome = () => {
  const navigate = useNavigate();
  const lottieRef = useRef();

  useEffect(() => {
    if (lottieRef.current) {
      lottieRef.current.setSpeed(1.3);
    }
  }, []);

  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(to bottom right, #f3e5f5, #f8bbd0)',
      position: 'relative',
      overflow: 'hidden',
      fontFamily: "'Segoe UI', sans-serif"
    }}>
      {/* Bubble Background */}
      <div style={{
        position: 'absolute',
        width: '100%',
        height: '100%',
        overflow: 'hidden',
        zIndex: 0,
      }}>
        {[...Array(25)].map((_, i) => (
          <div key={i} style={{
            position: 'absolute',
            width: `${20 + Math.random() * 30}px`,
            height: `${20 + Math.random() * 30}px`,
            background: `rgba(255, 182, 193, ${0.2 + Math.random() * 0.3})`,
            borderRadius: '50%',
            top: `${Math.random() * 100}%`,
            left: `${Math.random() * 100}%`,
            animation: `floatUp ${6 + Math.random() * 6}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 4}s`
          }} />
        ))}
        <style>{`
          @keyframes floatUp {
            0% { transform: translateY(0) scale(1); opacity: 1; }
            100% { transform: translateY(-100vh) scale(0.5); opacity: 0; }
          }
        `}</style>
      </div>

      <Navbar />

      {/* Welcome Section */}
      <motion.div
        style={{
          zIndex: 1,
          position: 'relative',
          marginTop: '70px',
          textAlign: 'center',
          maxWidth: '660px',
          marginLeft: 'auto',
          marginRight: 'auto',
          padding: '0 20px',
        }}
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
      >
        <div style={{ maxWidth: '380px', margin: '0 auto' }}>
          <Lottie animationData={animationData} lottieRef={lottieRef} loop autoplay />
        </div>
        <h1 style={{
          fontSize: '2.3rem',
          color: '#880e4f',
          fontWeight: 'bold',
          marginTop: '-20px',
        }}>
          Welcome to Your Career Portal!
        </h1>
        <p style={{
          fontSize: '1.1rem',
          color: '#6a1b9a',
          margin: '15px auto 25px',
        }}>
          Navigate your career journey with ease — find your dream job, apply seamlessly, prepare confidently, and get hired efficiently.
        </p>

        <div style={{ marginTop: '10px' }}>
          <button
            onClick={() => navigate('/jobs')}
            style={{
              padding: '10px 20px',
              fontSize: '1rem',
              marginRight: '10px',
              border: 'none',
              borderRadius: '8px',
              backgroundColor: '#d81b60',
              color: '#fff',
              cursor: 'pointer',
              boxShadow: '0 4px 10px rgba(0,0,0,0.1)'
            }}
          >
            Get Started
          </button>
          <button
            onClick={() => navigate('/about')}
            style={{
              padding: '10px 20px',
              fontSize: '1rem',
              border: '1px solid #d81b60',
              borderRadius: '8px',
              backgroundColor: 'transparent',
              color: '#d81b60',
              cursor: 'pointer'
            }}
          >
            Learn More
          </button>
        </div>
      </motion.div>

      {/* Steps Section */}
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        flexWrap: 'wrap',
        gap: '25px',
        margin: '40px auto',
        maxWidth: '880px',
        padding: '0 20px',
        zIndex: 1,
        position: 'relative',
      }}>
        {[
          { icon: <Briefcase size={44} color="#8e44ad" />, title: 'View Jobs', desc: 'Discover roles tailored to your skills and preferences.' },
          { icon: <Send size={44} color="#d63384" />, title: 'Apply', desc: 'Apply easily with your resume and portfolio.' },
          { icon: <Mic size={44} color="#a29bfe" />, title: 'Mock Interview', desc: 'Prepare confidently with mock interview sessions.' },
          { icon: <CheckCircle size={44} color="#6c5ce7" />, title: 'Hired', desc: 'Track applications and land your dream job!' },
        ].map((step, i) => (
          <motion.div
            key={i}
            whileHover={{ scale: 1.07, rotate: [0, 1, -1, 0] }}
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            ransition={{
  delay: 0.2 * i,
  duration: 0.6,
  ease: 'easeInOut', // or use 'linear' if you prefer
  type: 'tween'
}}
            style={{
              minWidth: '180px',
              maxWidth: '200px',
              background: 'rgba(255, 255, 255, 0.95)',
              padding: '20px',
              borderRadius: '18px',
              boxShadow: '0 8px 18px rgba(0,0,0,0.1)',
              textAlign: 'center',
              backdropFilter: 'blur(5px)',
              flex: '1 1 180px',
            }}
          >
            <div style={{ marginBottom: '15px' }}>{step.icon}</div>
            <h3 style={{ fontSize: '1.1rem', color: '#6a1b9a', fontWeight: '600' }}>{step.title}</h3>
            <p style={{ fontSize: '0.9rem', color: '#4a148c' }}>{step.desc}</p>
          </motion.div>
        ))}
      </div>

      {/* Benefits Section */}
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        style={{
          background: '#fff0f6',
          padding: '40px 20px',
          margin: '40px auto',
          borderRadius: '12px',
          maxWidth: '850px',
          textAlign: 'center',
        }}
      >
        <h2 style={{ color: '#ad1457', fontSize: '1.8rem', marginBottom: '20px' }}>Why Choose Us?</h2>
        <ul style={{ listStyle: 'none', padding: 0, color: '#6a1b9a', fontSize: '1.05rem' }}>
          <li>✅ Personalized Job Recommendations</li>
          <li>✅ Smart Dashboard to Track Applications</li>
          <li>✅ Resume Builder & Portfolio Tools</li>
          <li>✅ Access to Skill Assessments & AI-Powered Interview Prep</li>
        </ul>
      </motion.div>

      
    </div>
  );
};

export default CandidateWelcome;
