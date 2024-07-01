import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
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

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path='/' element = { <> <Home/> <Footer/></> }></Route>
        <Route path="/service" element={ <><Service /> <Footer/> </> }></Route>
        <Route path="/about" element={<><About /> <Footer/></>} />
        <Route path="/contact" element={<ContactUs />} />
        <Route path='/tasks' element = {<> <Tasks/> <Footer/> </>}/>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default App;
