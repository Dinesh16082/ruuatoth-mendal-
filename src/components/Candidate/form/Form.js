import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import styles from './Form.module.css';
import Logo from '../../../assets/images/Vien-Logo.png';



const isStrongPassword = (password) => {
  // Minimum 8 chars, at least 1 uppercase, 1 lowercase, 1 digit, 1 special char
  return /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(password);
};

const Form = () => {
  const [formData, setFormData] = useState({
    name: '', number: '', dob: '', gender: 'Male', marital_status: 'Single', nationality: '',
    blood_group: 'A+', position_applied: '', department: 'IT', ug_qualification: '',
    ug_category: '', year_of_graduation: '', current_employer: '', total_experience: '',
    relevant_experience: '', skills_certifications: '', pg_qualification: '', pg_category: '',
    year_of_pg_graduation: '', degrees: '', pg_degree_name: '', resume_upload: null,
    photo_upload: null, payslip_upload: null,
    gmail: '', // <-- Add this line
    password: '',
    confirm_password: '',
    is_experienced: false,
    sub_department: '',
  });

  const departmentOptions = {
  "IT Software": ["React", "Python", "Web Development", "MySQL"],
  "IT Hardware": ["Networking", "CCTV", "Router", "Server"],
  "HR & Admin": ["Recruitment", "Payroll", "Employee Relations"],
  "Accounts": ["Tax", "Auditing", "Bookkeeping"],
  "Digital Design": ["Photoshop", "Illustrator", "Canva"],
  "Digital Marketing": ["SEO", "Content Marketing", "Social Media"],
  "Other": [],
    };

  const navigate = useNavigate();
  const [focusedField, setFocusedField] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [gmailError, setGmailError] = useState(''); // <-- Add this line
  const [passwordError, setPasswordError] = useState('');

  const [otp, setOtp] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otpVerified, setOtpVerified] = useState(false);
  const [otpError, setOtpError] = useState('');
  const [otpSuccess, setOtpSuccess] = useState('');

  //Number Verification
  const [otpPhone, setOtpPhone] = useState('');
  const [otpPhoneSent, setOtpPhoneSent] = useState(false);
  const [otpPhoneVerified, setOtpPhoneVerified] = useState(false);
  const [otpPhoneError, setOtpPhoneError] = useState('');
  const [otpPhoneSuccess, setOtpPhoneSuccess] = useState('');
  const [sessionId, setSessionId] = useState('');
  const [resendPhoneTimer, setResendPhoneTimer] = useState(0);
  const [phoneResendIntervalId, setPhoneResendIntervalId] = useState(null);

  const startPhoneResendTimer = (seconds = 30) => {
      setResendPhoneTimer(seconds);
      const intervalId = setInterval(() => {
        setResendPhoneTimer(prev => {
          if (prev <= 1) {
            clearInterval(intervalId);
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
      setPhoneResendIntervalId(intervalId);
    };




  const handleFocus = (fieldName) => setFocusedField(fieldName);
  const handleBlur = () => setFocusedField('');

  

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    if (name === 'gmail') {
      setFormData({ ...formData, gmail: value });
      if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(value)) {
        setGmailError('Please enter a valid Gmail address');
      } else {
        setGmailError('');
      }
    } else if (name === 'password' || name === 'confirm_password') {
      setFormData({ ...formData, [name]: value });
      if (
        (name === 'password' && formData.confirm_password && value !== formData.confirm_password) ||
        (name === 'confirm_password' && formData.password && value !== formData.password)
      ) {
        setPasswordError('Passwords do not match');
      } else if (name === 'password' && value && !isStrongPassword(value)) {
        setPasswordError('Password must be at least 8 characters, include uppercase, lowercase, number, and special character');
      } else {
        setPasswordError('');
      }
    } else {
      setFormData({ ...formData, [name]: type === 'file' ? files[0] : value });
    }
  };

  // Send OTP handler
  const handleSendOtp = async () => {
    setOtpError('');
    setOtpSuccess('');
    if (!formData.gmail || !/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(formData.gmail)) {
      setGmailError('Please enter a valid Gmail address');
      return;
    }
    try {
      await axios.post('http://localhost:8000/auth/send-otp/', { email: formData.gmail });
      setOtpSent(true);
      setOtpSuccess('OTP sent to your email.');
    } catch (err) {
      setOtpError('Failed to send OTP. Try again.');
    }
  };

  // Verify OTP handler
  const handleVerifyOtp = async () => {
    setOtpError('');
    setOtpSuccess('');
    try {
      const res = await axios.post('http://localhost:8000/auth/verify-otp/', { email: formData.gmail, otp });
      if (res.data.verified) {
        setOtpVerified(true);
        setOtpSuccess('Email verified!');
      } else {
        setOtpError('Invalid OTP.');
      }
    } catch (err) {
      setOtpError('Invalid OTP.');
    }
  };

  //Send Phone OTP handler
  const handleSendPhoneOtp = async () => {
      setOtpPhoneError('');
      setOtpPhoneSuccess('');

      if (!formData.number || !/^[6-9]\d{9}$/.test(formData.number)) {
        setOtpPhoneError('Please enter a valid 10-digit Indian phone number');
        return;
      }

      try {
        const res = await axios.post('http://localhost:8000/auth/send-phone-otp/', { phone: formData.number });

        if (res.data.session_id) {
          setSessionId(res.data.session_id);
          setOtpPhoneSent(true);
          setOtpPhoneSuccess('OTP sent to your phone.');
          startPhoneResendTimer(); // ⏱ Start the resend timer
        } else {
          setOtpPhoneError('Failed to send OTP.');
        }
      } catch (err) {
        setOtpPhoneError('Failed to send OTP. Try again.');
      }
    };

  // Verify Phone OTP handler
  const handleVerifyPhoneOtp = async () => {
      setOtpPhoneError('');
      setOtpPhoneSuccess('');
      try {
        const res = await axios.post('http://localhost:8000/auth/verify-phone-otp/', {
          session_id: sessionId,
          otp: otpPhone
        });
        if (res.data.verified) {
          setOtpPhoneVerified(true);
          setOtpPhoneSuccess('Phone number verified!');
        } else {
          setOtpPhoneError('Invalid OTP.');
        }
      } catch (err) {
        setOtpPhoneError('Invalid OTP.');
      }
    };



  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!otpVerified) {
      setOtpError('Please verify your email before submitting.');
      return;
    }
    if (!otpPhoneVerified) {
      setOtpPhoneError('Please verify your phone number before submitting.');
      return;
    }

    if (!formData.gmail || !/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(formData.gmail)) {
      setGmailError('Please enter a valid Gmail address');
      return;
    }
    

    if (!formData.password || !formData.confirm_password || formData.password !== formData.confirm_password) {
      setPasswordError('Passwords do not match');
      return;
    }
    if (!isStrongPassword(formData.password)) {
      setPasswordError('Password must be at least 8 characters, include uppercase, lowercase, number, and special character');
      return;
    }
    setIsSubmitting(true);

    const data = new FormData();
    for (let key in formData) {
      if (formData[key] !== null) {
        data.append(key, formData[key]);
      }
    }

    // Convert has_pg to a boolean string if needed
    data.set('has_pg', formData.has_pg ? 'true' : 'false');

    try {
      const res = await fetch('http://localhost:8000/api/candidates/', {
        method: 'POST',
        body: data
      });

      if (res.ok) {
  alert('Employee created successfully!');  
  const userType = 'candidate'; // Assuming userType is 'candidate' for this form
  navigate(`/login/${userType}`);
} else {
  const contentType = res.headers.get('content-type');
  if (contentType && contentType.includes('application/json')) {
    const err = await res.json();
    console.error('JSON Error:', err);
  } else {
    const text = await res.text();
    console.error('Non-JSON Error:', text);
  }
  alert('Submission failed.');
}

    } catch (error) {
      console.error(error);
      alert('An error occurred.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className={styles.formContainer}>
      <div className={styles.formBox}>
        <form onSubmit={handleSubmit}>
          <div style={{ textAlign: 'center', marginBottom: '40px' }}>
            
            <h2 className={styles.formTitle}><img src={Logo} alt="Company Logo" className={styles.logoform} /> Candidate Information Form</h2>
            <p className={styles.formSubtitle}>
              Fields marked with <span style={{ color: '#ff5ca2', fontWeight: 'bold' }}>*</span> are mandatory
            </p>
          </div>

          {/* Personal Information Section */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Personal Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Full Name *</label>
                <input
                  name="name"
                  type="text"
                  onChange={handleChange}
                  onFocus={() => handleFocus('name')}
                  onBlur={handleBlur}
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Phone Number *</label>
                <input
                  name="number"
                  type="text"
                  onChange={handleChange}
                  onFocus={() => handleFocus('number')}
                  onBlur={handleBlur}
                  required
                  className={styles.input}
                />
                <button
                    type="button"
                    onClick={handleSendPhoneOtp}
                    disabled={otpPhoneVerified || resendPhoneTimer > 0}
                    className={styles.submitBtn}
                  >
                    {resendPhoneTimer > 0 ? `Resend OTP in ${resendPhoneTimer}s` : (otpPhoneSent ? 'Resend OTP' : 'Send OTP')}
                </button>


                    {otpPhoneSuccess && <div style={{ color: 'green', fontSize: '0.9rem', marginTop: '4px' }}>{otpPhoneSuccess}</div>}
                    {otpPhoneError && <div style={{ color: 'red', fontSize: '0.9rem', marginTop: '4px' }}>{otpPhoneError}</div>}

              </div>

              {otpPhoneSent && !otpPhoneVerified && (
            <div className={styles.formGroup}>
              <label className={styles.label}>Enter Phone OTP</label>
              <input
                type="text"
                value={otpPhone}
                onChange={(e) => setOtpPhone(e.target.value)}
                className={styles.input}
              />
              <button type="button" onClick={handleVerifyPhoneOtp} className={styles.submitBtn}>
                Verify Phone OTP
              </button>
            </div>
             )}


              <div className={styles.formGroup}>
                <label className={styles.label}>Gmail *</label>
                <input
                  name="gmail"
                  type="email"
                  value={formData.gmail}
                  onChange={handleChange}
                  onFocus={() => handleFocus('gmail')}
                  onBlur={handleBlur}
                  required
                  className={styles.input}
                  placeholder="example@gmail.com"
                  disabled={otpVerified}
                />
                <button type="button" onClick={handleSendOtp} disabled={otpSent || otpVerified} className={styles.submitBtn}  >
                  {otpSent ? 'OTP Sent' : 'Send OTP'}
                </button>
                {gmailError && <div style={{ color: 'red', fontSize: '0.9rem', marginTop: '4px' }}>{gmailError}</div>}
                {otpSuccess && <div style={{ color: 'green', fontSize: '0.9rem', marginTop: '4px' }}>{otpSuccess}</div>}
                {otpError && <div style={{ color: 'red', fontSize: '0.9rem', marginTop: '4px' }}>{otpError}</div>}
              </div>

              {otpSent && !otpVerified && (
                <div className={styles.formGroup}>
                  <label className={styles.label}>Enter OTP</label>
                  <input
                    type="text"
                    value={otp}
                    onChange={e => setOtp(e.target.value)}
                    className={styles.input}
                  />
                  <button type="button" onClick={handleVerifyOtp} className={styles.submitBtn}>Verify OTP</button>

                  {/* 🔁 Resend OTP button */}
                  <button
                    type="button"
                    onClick={handleSendOtp}
                    className={styles.submitBtn}
                    style={{ marginTop: '10px', backgroundColor: '#f39c12' }} // Optional different color
                  >
                    Resend OTP
                  </button>
                </div>
              )}
              
              <div className={styles.formGroup}>
                <label className={styles.label}>Date of Birth *</label>
                <input
                  name="dob"
                  type="date"
                  onChange={handleChange}
                  onFocus={() => handleFocus('dob')}
                  onBlur={handleBlur}
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Nationality *</label>
                <input
                  name="nationality"
                  type="text"
                  onChange={handleChange}
                  onFocus={() => handleFocus('nationality')}
                  onBlur={handleBlur}
                  required
                  className={styles.input}
                />
              </div>
            </div>
            <div style={{ marginTop: '20px' }}>
              <label className={styles.label}>Gender *</label>
              <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', marginTop: '8px' }}>
                {["Male", "Female", "Transgender"].map(g => (
                  <label key={g} style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '8px',
                    cursor: 'pointer',
                    padding: '8px 16px',
                    borderRadius: '25px',
                    background: formData.gender === g ? 'linear-gradient(135deg, #6a0dad, #ff5ca2)' : '#ffffff',
                    color: formData.gender === g ? '#ffffff' : '#2c3e50',
                    border: '2px solid',
                    borderColor: formData.gender === g ? 'transparent' : '#e0d4f7',
                    transition: 'all 0.3s ease',
                    fontSize: '0.9rem',
                    fontWeight: '500'
                  }}>
                    <input
                      type="radio"
                      name="gender"
                      value={g}
                      checked={formData.gender === g}
                      onChange={handleChange}
                      style={{ display: 'none' }}
                    />
                    {g}
                  </label>
                ))}
              </div>
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '20px', marginTop: '20px' }}>
              <div className={styles.formGroup}>
                <label className={styles.label}>Marital Status *</label>
                <select
                  name="marital_status"
                  value={formData.marital_status}
                  onChange={handleChange}
                  className={styles.select}
                >
                  <option>Single</option>
                  <option>Married</option>
                  <option>Other</option>
                </select>
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Blood Group *</label>
                <select
                  name="blood_group"
                  onChange={handleChange}
                  value={formData.blood_group}
                  className={styles.select}
                >
                  {["A+", "A-", "B+", "B-", "AB+", "AB-", "O+", "O-"].map(bg => (
                    <option key={bg}>{bg}</option>
                  ))}
                </select>
              </div>
            </div>
          </div>

          {/* Professional Information Section */}
      <div className={styles.section}>
        <h3 className={styles.sectionTitle}>Professional Information</h3>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>

          {/* New: Are you experienced? */}
          <div className={styles.formGroup} style={{ gridColumn: '1 / -1' }}> {/* Takes full width */}
            <label className={styles.label}>Are you experienced? *</label>
            <div style={{ display: 'flex', gap: '20px', marginTop: '8px', marginRight:'30px'}}>
              <label>
                <input
                  type="radio"
                  name="is_experienced"
                  value="true"
                  checked={formData.is_experienced === true}
                  onChange={() => setFormData({ ...formData, is_experienced: true })}
                  required // Make this question mandatory
                /> Yes
              </label>
              <label>
                <input
                  type="radio"
                  name="is_experienced"
                  value="false"
                  checked={formData.is_experienced === false}
                  onChange={() => setFormData({ ...formData, is_experienced: false })}
                  required // Make this question mandatory
                /> No
              </label>
            </div>
          </div>
          {/* End New: Are you experienced? */}

    <div className={styles.formGroup}>
      <label className={styles.label}>Position Applied *</label>
      <input
        name="position_applied"
        type="text"
        onChange={handleChange}
        onFocus={() => handleFocus('position_applied')}
        onBlur={handleBlur}
        required
        className={styles.input}
      />
    </div>
    {/* Department Select */}
          <div className={styles.formGroup}>
            <label className={styles.label}>Department *</label>
            <select
              name="department"
              value={formData.department}
              onChange={(e) => {
                setFormData({ ...formData, department: e.target.value, subDepartments: [] });
              }}
              className={styles.select}
              required
            >
              <option value="">Select Department</option>
              {Object.keys(departmentOptions).map((d) => (
                <option key={d} value={d}>
                  {d}
                </option>
              ))}
            </select>
          </div>

          {/* Multi-select Sub-departments */}
          {formData.department && departmentOptions[formData.department]?.length > 0 && (
  <div className={styles.formGroup}>
    <label className={styles.label}>Specializations (Select multiple)</label>
    <div className={styles.checkboxGroup}>
      {departmentOptions[formData.department]?.map((sub) => (
        <label key={sub} className={styles.checkboxItem}>
          <input
            type="checkbox"
            value={sub}
            checked={formData.subDepartments.includes(sub)}
            onChange={(e) => {
              let updatedSubs = [...formData.subDepartments];
              if (e.target.checked) {
                updatedSubs.push(sub);
              } else {
                updatedSubs = updatedSubs.filter((s) => s !== sub);
              }
              setFormData({ ...formData, subDepartments: updatedSubs });
            }}
            className={styles.checkbox}
          />
          {sub}
        </label>
      ))}
    </div>
  </div>
)}
            </div>
            <div className={styles.formGroup} style={{ marginTop: '20px' }}>
              <label className={styles.label}>Skills & Certifications</label>
              <textarea
                name="skills_certifications"
                onChange={handleChange}
                onFocus={() => handleFocus('skills_certifications')}
                onBlur={handleBlur}
                rows="4"
                className={styles.textarea}
              ></textarea>
            </div>
          </div>

          {/* Educational Information Section */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Educational Information</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              <div className={styles.formGroup}>
                <label className={styles.label}>UG Qualification *</label>
                <input
                  name="ug_qualification"
                  type="text"
                  onChange={handleChange}
                  onFocus={() => handleFocus('ug_qualification')}
                  onBlur={handleBlur}
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>UG Category</label>
                <input
                  name="ug_category"
                  type="text"
                  onChange={handleChange}
                  onFocus={() => handleFocus('ug_category')}
                  onBlur={handleBlur}
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Year of Graduation *</label>
                <input
                  name="year_of_graduation"
                  type="text"
                  onChange={handleChange}
                  onFocus={() => handleFocus('year_of_graduation')}
                  onBlur={handleBlur}
                  required
                  className={styles.input}
                />
              </div>
              <div className={styles.formGroup}>
                <label className={styles.label}>Have you completed Post Graduation (PG)?</label>
                <div style={{ display: 'flex', gap: '20px', marginTop: '8px' }}>
                  <label>
                    <input
                      type="radio"
                      name="has_pg"
                      value={true}
                      checked={formData.has_pg === true || formData.has_pg === 'true'}
                      onChange={() => setFormData({ ...formData, has_pg: true })}
                    /> Yes
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="has_pg"
                      value={false}
                      checked={formData.has_pg === false || formData.has_pg === 'false'}
                      onChange={() => setFormData({ ...formData, has_pg: false })}
                    /> No
                  </label>
                </div>
              </div>
              {formData.has_pg && (
                <>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>PG Degree Name *</label>
                    <input
                      name="pg_degree_name"
                      type="text"
                      onChange={handleChange}
                      onFocus={() => handleFocus('pg_degree_name')}
                      onBlur={handleBlur}
                      required={formData.has_pg}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>PG Category *</label>
                    <input
                      name="pg_category"
                      type="text"
                      onChange={handleChange}
                      onFocus={() => handleFocus('pg_category')}
                      onBlur={handleBlur}
                      required={formData.has_pg}
                      className={styles.input}
                    />
                  </div>
                  <div className={styles.formGroup}>
                    <label className={styles.label}>Year of PG Graduation *</label>
                    <input
                      name="year_of_pg_graduation"
                      type="text"
                      onChange={handleChange}
                      onFocus={() => handleFocus('year_of_pg_graduation')}
                      onBlur={handleBlur}
                      required={formData.has_pg}
                      className={styles.input}
                    />
                  </div>
                </>
              )}
            </div>
          </div>

          {/* File Upload Section */}
          <div className={styles.section}>
            <h3 className={styles.sectionTitle}>Document Uploads</h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '20px' }}>
              { [
                { name: 'resume_upload', label: 'Upload Resume' },
                { name: 'photo_upload', label: 'Upload Photo' },
                { name: 'payslip_upload', label: 'Upload Payslip' }
              ].map((field) => (
                <div key={field.name} className={styles.formGroup}>
                  <label className={styles.label}>{field.label}</label>
                  <input
                    type="file"
                    name={field.name}
                    onChange={handleChange}
                    className={styles.input}
                  />
                  <div style={{ color: '#6a0dad', fontSize: '0.9rem', marginTop: '8px' }}>
                    {formData[field.name] ? formData[field.name].name : 'No file chosen'}
                  </div>
                </div>
              )) }
            </div>
          </div>

          <div className={styles.formGroup}>
            <label className={styles.label}>Password *</label>
            <input
              name="password"
              type="password"
              value={formData.password}
              onChange={handleChange}
              required
              className={styles.input}
              placeholder="Enter password"
            />
          </div>
          <div className={styles.formGroup}>
            <label className={styles.label}>Confirm Password *</label>
            <input
              name="confirm_password"
              type="password"
              value={formData.confirm_password}
              onChange={handleChange}
              required
              className={styles.input}
              placeholder="Re-enter password"
            />
            {passwordError && (
              <div style={{ color: 'red', fontSize: '0.9rem', marginTop: '4px' }}>{passwordError}</div>
            )}
          </div>
          

          

          <div style={{ textAlign: 'center', marginTop: '40px' }}>
            <button
              type="submit"
              
              disabled={isSubmitting}
              className={styles.submitBtn}
            >
              {isSubmitting ? (
                <span>Submitting...</span>
              ) : (
                'Submit Application'
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Form;