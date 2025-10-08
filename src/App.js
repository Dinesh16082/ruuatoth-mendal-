import React from 'react';
import './App.css';
// import Welcome from './components/Candidate/candidatewelcome/Welcom';
import Headers from './components/Candidate/candidateheader/Header';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';  
import AllJobs from './components/Candidate/alljobs/AllJobs';
import AppliedJobs from './components/Candidate/appliedjobs/AppliedJobs';
import Form from './components/Candidate/form/Form';
import Navbar from './components/Candidate/Navbar/Navbar';
// import History from './components/Candidate/appliedjobs/AppliedJobs';
//Home page
import Home from './components/Home/Home/HomePage/Home';
import Aboutus from './components/Home/Home/About/AboutUs';
import Careers from './components/Home/Home/Careers/Careers';
import Product from './components/Home/Home/Product/Product';
import ContactUs from './components/Home/Home/Contact/contact';
import LandingPage from './components/Home/Home/Login/LandingPage';
import { Login } from '@mui/icons-material';
import LoginPage from './components/Home/Home/Login/LoginPage';
import ForgotPassword from './components/Home/Home/Login/ForgotPassword';
import ClientSignup from './components/Home/Home/Login/Client/ClientSignup';
import CandidateWelcome from './components/Candidate/candidatewelcome/CandidateWelcom';
import ClientDashboard from './components/ClientDashboard/ClientDashboard';
import ClientWelcome from './components/ClientDashboard/Welcome/Welcome';
import AptitudeTest from './components/Candidate/Exam/AptitudeTest';
import Technical from './components/Candidate/Exam/Technical';
import History from './components/Candidate/History/History';
import CompanyProfile from './components/Candidate/Profile/Profile';

//HR Dashboard
import HRLogin from './components/HR/HRLogin';
import HRDashboard from './components/HR/HRDashboard';
import HRNavbar from './components/HR/Navbar';
import HRWalkin from './components/HR/HRWalkin';
import CandidatesList from "./components/HR/CandidatesList";
import Client from "./components/HR/Client";
import CandidateDetailsPage from './components/HR/CandidateDetails';
import AppliedCandidatesPage from './components/HR/AppliedCandidatesPage';
import TestResult from './components/HR/TestResult';
import Onboard from './components/HR/Onboard';
import Logout from './components/ClientDashboard/Logout/Logout';
import EditCompanyProfile from './components/ClientDashboard/EditProfile/EditProfile';
import Jobs from './components/HR/Jobs';
import RelatedJobs from './components/Candidate/relatedjobs/RelatedJobs';
import PrivateRoute from './components/PrivateRoute';


// import ClientHome from './components/Client/Welcom/ClientHome';
// import Login from './components/Home/Home/Login';
// import Signup from './components/Home/Signup/Signup';

function App() {
  return (
    <>
  
    <div className="App">
      <Router>
        
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<Aboutus />} />
          <Route path="/product" element={<Product />} />
          <Route path="/careers" element={<Careers/>} />
          <Route path="/contact" element={<ContactUs/>} />
          <Route path="/landingpage" element={<LandingPage/>} />
          <Route path="/login/:userType" element={<LoginPage />} />
          <Route path="/form" element={<Form />} />
          <Route path="/forgotpassword/:userType" element={<ForgotPassword />} />
          <Route path="/client-signup" element={<ClientSignup />} />
          {/* <Route path="/client-dashboard" element={<ClientDashboard />} /> */}
          <Route path="/candidate-dashboard" element={<CandidateWelcome />} />
          <Route path="/candidate-dashboard" element={<Navbar />} />
          <Route path="/navbar" element={<Navbar />} />
          <Route path="/candidate_history" element={<History />} />
          <Route path="/jobs/all" element={<AllJobs />} />
          <Route path="/jobs/related" element={<RelatedJobs />} />
          <Route path="/aptitude/:companyid/:opening" element={<AptitudeTest />} />
          <Route path="/technical-test/:companyid/:opening" element={<Technical/>} />
          <Route path="/candidate-profile" element={<CompanyProfile />} />

          {/* HR Dashboard */}

          <Route path="/hr-login" element={<HRLogin />} />
          <Route path="/hr-dashboard" element={<HRDashboard />} />
          <Route path="/hr-navbar" element={<HRNavbar />} />
          <Route path="/" element={<HRDashboard />} />
          <Route path="/hr-dashboard/candidates" element={<CandidatesList />} />
          <Route path="/hr-dashboard/candidates/:candidateId" element={<CandidateDetailsPage />} />
          <Route path="/client" element={<Client />} />
          <Route path="/hr-dashboard/clients" element={<Client />} />
          <Route path="/hr-dashboard/applied" element={<AppliedCandidatesPage />} />
          <Route path="/test-result/:candidateId/:openingId/:companyId" element={<TestResult />} />
          <Route path="/hr-dashboard/hr-walkin" element={<HRWalkin />} />
          <Route path="/hr-dashboard/onboard" element={<Onboard/>}/>
          <Route path="/hr-dashboard/jobs" element={<Jobs />} />

          {/* Client Function */}
          <Route path="/client-signup" element={<ClientSignup />} />
          {/* <Route
          path="/client-dashboard"
          element={
            <PrivateRoute>
              <ClientDashboard />
            </PrivateRoute>
          }
          /> */}
          <Route path="/client-dashboard" element={<ClientDashboard />} />
          <Route path="/client-welcome" element={<ClientWelcome />} />
          <Route path="/client/edit-profile" element={<EditCompanyProfile />} />
          
          <Route path="/logout" element={<Logout />} />




          {/* <Route path="/login" element={<Login/>} /> */}
          {/* <Route path="/signup" element={<Signup />} />  */}
          {/* <Route path="/home" element={<Welcome />} /> */}
          {/* <Route path="/alljobs" element={<AllJobs />} /> */}
          {/* <Route path="/relatedjob" element={<AllJobs />} />  */}
          {/* <Route path="/appliedjobs" element={<AppliedJobs />} /> */}
        </Routes>
      </Router>
    </div>
    </>
    
  );
}

export default App;
