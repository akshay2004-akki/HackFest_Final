import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import axios from 'axios';
import './App.css';
import Navbar from './components/Navbar.js';
import Service from './components/Service.js';
import About from './components/About.js';
import ContactUs from './components/ContactUs.js';
import Login from './components/Login.js';
import Signup from './components/Signup.js';
import Home from './components/Home.js';
import Footer from './components/Footer.js';
import Tasks from './components/Tasks.js';
import GreenCreditCardForm from './components/GreenCreditCardForm.js';
import CreditScore from './components/CreditScore.js';
import Rewards from './components/Rewards.js';
import Profile from './components/Profile.js';
import GreenCard from './components/GreenCard.js';
import OrganizationCreditCardForm from './components/OrganizationCreditCardForm.js';
import OrganizationDetails from './components/OrganizationDetails.js';
import StudentCardDetails from './components/StudentCardDetails.js';
import Webinar from './components/Webinar.js';
import OrgRewards from './components/OrgRewards.js';

function App() {
  const [credit, setCredit] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState({});
  const [role, setRole] = useState("");
  const [studentId, setStudentId] = useState("")
  // const [checkedTasks, setCheckedTasks] = useState([]);

  const [organizationId, setOrganizationId] = useState('');

  useEffect(() => {
    async function checkAuth() {
      try {
        const response = await axios.get("http://localhost:8000/api/v3/users/user-details", {
          withCredentials: true,
        });
        const userData = response.data.data;
        setIsLoggedIn(true);
        setUser(userData);
        setRole(userData.role);
        setCredit(userData.creditScore || 0);
      } catch (error) {
        console.error("Error checking auth:", error);
        setIsLoggedIn(false);
      }
    }
    checkAuth();
  }, []);

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} user={user} />
      <Routes>
        <Route path='/' element={<> <Home /> <Footer /></>} />
        <Route path="/service" element={<><Service /> <Footer /></>} />
        <Route path="/about" element={<><About /> <Footer /></>} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path='/tasks' element={isLoggedIn ? <> <Tasks credit={credit} setCredit={setCredit} /> <Footer /> </> : <Navigate to="/login" />} />
        <Route path="/login" element={<Login setIsLoggedIn={setIsLoggedIn} setUser={setUser} setRole={setRole} />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/apply-green-credit" element={role === "student" ? <GreenCreditCardForm studentId = {studentId} setStudentId = {setStudentId} /> : <OrganizationCreditCardForm organizationId = {organizationId} setOrganizationId={setOrganizationId} />} />
        <Route path='/check-credit-score' element={isLoggedIn ? <CreditScore credit={credit} /> : <Navigate to="/login" />} />
        <Route path="/rewards" element={role==="student" ? <Rewards /> : <OrgRewards/> } />
        <Route path='/profile' element={isLoggedIn ? <Profile setIsLoggedIn={setIsLoggedIn} /> : <Navigate to="/login" />} />
        <Route path='/credit-card' element={isLoggedIn ? <GreenCard /> : <Navigate to="/login" />} />
        <Route path='/show-card-details/:organizationId' element = { <OrganizationDetails orgId = {organizationId} />} />
        <Route path='/student/:studentId' element = {<StudentCardDetails studentId = {studentId}/>} /> 
        <Route path='/webinarForm' element = { <Webinar/> }/>
      </Routes>
    </Router>
  );
}

export default App;
