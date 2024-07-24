import React from 'react';
// import { Link } from 'react-router-dom';
// import './Footer.css';

function Footer() {
  return (
    <footer className="footer" style={{transform:"translateY(70px)", display:"flex", alignItems:"center"}}>
      <div className="container">
        <div className="footer-content">
          <div className="footer-section about">
            <h3>EcoFIN India</h3>
            <p>
              EcoFIN India is dedicated to promoting environmental sustainability by encouraging individuals and organizations to reduce their carbon footprint through innovative green credit systems.
            </p>
          </div>
          <div className="footer-section contact">
            <h3>Contact Us</h3>
            <p>Email : ecofinindia2024@gmail.com </p>
            <p>Phone: +91 7088484478</p>
            <p>Address: 15A Golden Homes, Mohali, Punjab, India</p>
          </div>
        </div>
        <div className="footer-bottom"style={{display:"flex",justifyContent:"center", width:"100%"}}>
          &copy; 2024 EcoFIN India | Designed by EcoFIN India Team
        </div>
      </div>
    </footer>
  );
}

export default Footer;
